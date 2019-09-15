import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
//import anecdoteService from './services/anecdotes'

//import { giveVote } from './reducers/anecdoteReducer'

const App = (props) => {

  useEffect(() => {
    props.initializeAnecdotes()
  },[])

//  const anecdotes = props.store.getState()
//  const vote = (id) => {
//    props.store.dispatch(giveVote(id))
//  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />  
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)