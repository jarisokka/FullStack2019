import React from 'react'

const Filter = ({showAll, handleSearch}) => {
    
    return (
        <div>
          filter shown with <input value={showAll}
          onChange={handleSearch}
          />
        </div>
    )
  }

export default Filter