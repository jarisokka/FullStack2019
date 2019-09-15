import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return[...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data  
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(x => x.id === id)
      const newVotes = anecdoteToChange.votes + 1
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: newVotes
      }
      anecdoteService.updateVote(id, changedAnecdote)
      return state.map(x => x.id !== id ? x : changedAnecdote)
  default:
  return state
  }
}

export const giveVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
 }
 

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch ({
    type: 'INIT_ANECDOTES',
    data: anecdotes,
    })
  }
}

export const createAnecdote = (content) => { 
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
    type: 'NEW_ANECDOTE',
    data: newAnecdote,
    //  id: getId(),
    votes: 0,
    })
  }  
}

export default reducer