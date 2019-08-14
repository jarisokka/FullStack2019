import React from 'react'

const Filter = ({showAll, handleSearch}) => {
    return (
        <div>
          find countries <input value={showAll}
          onChange={handleSearch}
          />
        </div>
    )
  }

  export default Filter