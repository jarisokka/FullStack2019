import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
  return (
    axios
    .get(baseUrl)
    .catch(error => {
      console.log('fail to load')
    })
    )
  }
  
  const create = newObject => {
    return (
      axios
      .post(baseUrl, newObject)    
      .catch(error => {
        console.log('fail to create')
      })
      )
    }
    
  const poista = (id) => {
      return (
        axios
        .delete(`${baseUrl}/${id}`)
        .catch(error => {
          console.log('fail to remove')
        })
        )
      }
      
  const update = (id, newObject, setErrorMessage) => {
    return (
      axios
        .patch(`${baseUrl}/${id}`, newObject)
        .catch(error => {
          setErrorMessage(`Information of ${newObject.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)         
          }, 4000)
      })
    )
  }

export default {
    getAll: getAll,
    create: create,
    poista: poista,
    update: update
}