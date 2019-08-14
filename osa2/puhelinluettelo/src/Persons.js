import React from 'react'

const Persons = ({filter}) => {
    return (
        <div>
            {filter()}
        </div>
    )
  }
export default Persons