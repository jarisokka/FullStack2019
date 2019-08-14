import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Result from './Result'
import Weather from './Weather'
    
  const App = () => {
      const [ countries, setCountries ] = useState([]) 
      const [ showAll, setShowAll ] = useState('')
      const [ searchRows, setSearchRows ] = useState(countries)
      const [ showOne, setShowOne ] = useState(null)
      const [ weather, setWeather ] = useState([])
      const [ city, setCity ] = useState(null)
      
    useEffect(() => {
      console.log('effect')
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          console.log('promise fulfilled')
          setCountries(response.data)
        })
      }, [])
      console.log('render', countries.length, 'notes')     
    

    useEffect(() => {
      console.log('arvo on' + city)
        axios
          .get(`http://api.apixu.com/v1/current.json?key=dd1b1585098646328c2123231191308&q=${city}`)
          .then(response => {
            console.log('weather promise fulfilled')
            setWeather(response.data.current)
          })
          .catch(error => {
              console.log('country is missing')
          })
    }, [city])

    
    const showCountry = (event) => {
      let search2 = searchRows.filter(x => x.name.includes(event.target.value))
      setShowOne(search2)
      }
      
    const setSearch = (props) => {
      let search = countries.filter(x => x.name.toLowerCase().includes(props.toLowerCase()))
      setSearchRows(search)
      } 
      
    const handleSearch = (event) => {
      setSearch(event.target.value)
      setShowAll(event.target.value)
      setShowOne(null)
      }
      
    const filter = () =>
      searchRows.map(x => <p key={x.name}>{x.name}{<button value={x.name} onClick={showCountry}> show </button>}</p>)
      
      
    const country = (props) => props.map(x =>
    <div key={x.name}>
      <div>{setCity(x.capital)}</div>
      <h1>{x.name}</h1>
      <p> capital {x.capital}</p> 
      <p> population {x.population}</p>
      <h3>languages</h3>
      <div>
      {x.languages.map(lang => (
        <li key = {lang.name}>
          {lang.name}
        </li>))}
      </div>
      <p></p>
      <img
        src={x.flag}
        alt={`${x.flag}'s flag`}
        style={{ width: '200px', height: '100px' }}
        />
        <div>
        <Weather weather={weather} city={city}/>  
        </div>
      </div>)
  
  return (
    <div>
      <h2>Country search</h2>
        <div>
        <Filter showAll={showAll} handleSearch={handleSearch} />
        <Result searchRows={searchRows} filter={filter} country={country} showOne={showOne}/>
        </div>
    </div>
  )
  
}

export default App 