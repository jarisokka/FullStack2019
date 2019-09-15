import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('response datan haku' + response.data)
  return response.data
}

const createNew = async (content) => {
    const object = { content }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

const updateVote = async (id, content) => {
    console.log('ääni annettu ja tallennetaan tietokantaan' + id, content)
    const response = await axios.put(`${baseUrl}/${id}`, content)
    return response.data
  }  

export default { getAll, createNew, updateVote }