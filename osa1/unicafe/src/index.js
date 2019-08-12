import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({counter, counter1, counter2 }) => {
  if (counter === 0 && counter1 === 0 && counter2 === 0) return <p>No feedback given</p>
  return (
    <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{counter}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{counter1}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{counter2}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{counter + counter1 + counter2}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{((counter*1) + (counter1*0) + (counter2*-1)) / (counter + counter1 + counter2)}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{(counter / (counter + counter1 + counter2)) * 100 + ' %'}</td>
          </tr>
        </tbody>
      </table>
  )
}

const App = props => {
  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const [good, setGood] = useState(0)
  const setToGood = (value) => setGood(value)

  const [neutral, setNeutral] = useState(0)
  const setToNeutral = (value) => setNeutral(value)

  const [bad, setBad] = useState(0)
  const setToBad = (value) => setBad(value)

  const onkoArvoja = good + bad + neutral
  console.log('arvo on', onkoArvoja)

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={() => setToGood(good + 1)}
        text='good'
      />
      <Button
        handleClick={() => setToNeutral(neutral + 1)}
        text='neutral'
      />
      <Button
        handleClick={() => setToBad(bad + 1)}
        text='bad'
      />
      <h1>statistics</h1>
      <Statistics counter={good} counter1={neutral} counter2={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
