import React from 'react'

const Total = (props) => {
    const summa = props.course.parts.reduce((sum, x) => sum + x.exercises, 0)

    return (
      <div>
        <b>
        total of {summa} exercises
        </b>
      </div>
    )
  }

  export default Total  