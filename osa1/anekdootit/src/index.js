import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = (props) => {
  
  const [ selected, setSelected ] = useState(null)
  const [ top, setTop ] = useState(null)

  const setToSelected= (value) => setSelected(value)

  const handleVote = () => {
    votes[selected] += 1
    const copy = [...votes]
    setTop(IndexOfMax(copy))
  }

  const handleClick = () => {
    const random = (Math.floor(Math.random()*(5-0+1)+0));
    setToSelected(random);
  }

  const Selected = (props) => {
    return (
      <div>
        <p>has {props.aanet[props.valittu]} votes</p>
      </div>
    )
  }

  const IndexOfMax = (votes) => {
    if (votes.length === 0) {
        return -1
    }

    var max = votes[0]
    var maxIndex = 0

    for (var i = 1; i < votes.length; i++) {
        if (votes[i] > max) {
            maxIndex = i
            max = votes[i]
        }
    }
    return maxIndex
}

  return (
    <div>
      <h1>Anecdote of the day</h1>
     {props.anecdotes[selected]} 
    <p></p>
    <Selected aanet={votes} valittu={selected}/>
    <button onClick={handleVote}>
        vote
    </button>
    <button onClick={handleClick}>
        next anecdote
    </button>
    <h1>Anecdote with most votes</h1>
    <div>
    {props.anecdotes[top]}
    </div>
    </div>
  )
}

const votes = [0, 0, 0, 0, 0, 0]

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
