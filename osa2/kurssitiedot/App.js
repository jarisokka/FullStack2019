import React from 'react'
import Course from './Course'

const App = () => {
  const course = [
  {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  },
  {
    name: 'Node.js',
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

const Loop = () => {
  let rivit = [];
  for (let i = 0; i < course.length; i++) {
    rivit.push(<Course course={course[i]} key={i}/>)
    }
    return (
    <div>
      {rivit}
    </div>  
    )
  }


    return (
      <div>
      {Loop()}
      </div>
    )
  }

export default App