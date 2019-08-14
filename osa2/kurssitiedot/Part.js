import React from 'react'

const Part = (props) => {

    const tiedot = () => props.course.parts.map(x => <p key={x.id}>{x.name} {x.exercises}</p>)

    return (
      <div>
        {tiedot()}
      </div>
    )
  }

export default Part