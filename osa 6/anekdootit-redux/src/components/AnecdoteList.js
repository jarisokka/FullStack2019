import React from 'react'
import { giveVote } from '../reducers/anecdoteReducer'
import { showNotific, hideNotific } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
//import Filter from '../components/Filter'

const AnecdoteList = (props) => {
  console.log('listan propsit ' + props.anecdotes)
  //const anecdot = props.anecdotes

  const vote = async (id, content) => {
    props.dispatch(giveVote(id))
    props.dispatch(showNotific(content, 'VOTE'))
    setTimeout(() => {
       props.dispatch(hideNotific(content, 'NULL'))
    }, 5000)
  }


return (
    <div>
      {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>     
    )
} 


const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log('staten tila ' + state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}


const ConnectedList = connect(mapStateToProps)(AnecdoteList)

export default ConnectedList
     