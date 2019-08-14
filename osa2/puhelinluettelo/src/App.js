import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import noteService from './services/notes'
import Notification from './Notification'
import './index.css'



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState('')
  const [ searchRows, setSearchRows ] = useState(persons)
  const [ alertMessage, setAlertMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)


  //haku palvelimelta
  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
       })
  }, [])
  console.log('render', persons.length, 'notes')
  

  const setSearch = (props) => {
    let search = persons.filter(person => person.name.toLowerCase().includes(props.toLowerCase()))
    setSearchRows(search)
  } 

  const filter = () => searchRows.map(x => <p key={x.name}>{x.name} {x.number}
   {<button onClick={() =>buttonAction(x.id, x.name)}>detele</button>}</p>)
  

  const buttonAction = (id, name) => {
    console.log(name)
    if (window.confirm('Delete ' + name + '?') === false) {
      return console.log('peruttu')
    }
     noteService
      .poista(id)
      .then(() => {
        setAlertMessage('Removed ' + name)
        setTimeout(() => {
          setAlertMessage(null)         
        }, 4000)
      })      
  }
    
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
    setSearch(event.target.value)
    setShowAll(event.target.value)
  }
  
  //lisäys tietokantaan
  const addNote = (event) => {
    event.preventDefault()  
    const noteObject = {
      name: newName,
      number: newNumber
    } 
    const containsValue = () => {
      for (let i = 0; i < persons.length; i++) {
        if(persons[i].name === noteObject.name) {
          if (window.confirm(`${newName} is alredy added to phonebook. Replace the old number with a new one?`) === true) {
            return (
              noteService
                .update(persons[i].id, noteObject, setErrorMessage) 
                .then(() => {
                  setAlertMessage(`Changed ${newName}`)
                  setTimeout(() => {
                    setAlertMessage(null)         
                  }, 4000)
                })                              
              )
            }
            else {
              return (
                console.log('peruttu')
              )
            }
        }
      }
      noteService
      .create(noteObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setAlertMessage(`Added ${newName}`)
        setTimeout(() => {
          setAlertMessage(null)         
        }, 4000)        
      })

    }
    containsValue()
  }

 
  return (
    <div>
      <h2>Phonebook</h2>
        <div>
         <Notification message1={alertMessage}/>
         <Notification message2={errorMessage}/>
         <Filter showAll={showAll} handleSearch={handleSearch} />
         <PersonForm addNote={addNote} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
        </div>
      <h2>Numbers</h2>
      <div>
      <Persons filter={filter} />
      </div>
    </div>
  )

}

export default App 