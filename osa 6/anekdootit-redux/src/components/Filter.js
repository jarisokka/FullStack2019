import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
  console.log('filtterin props ' + props)  
  const handleChange = (event) => {
    props.filterChange(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(
    (state) => ({ filter: state.filter }),
    { filterChange }
  )(Filter)

//export default connect()(Filter)
//export default Filter