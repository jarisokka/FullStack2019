import React from 'react'

const Result = ({searchRows, filter, country, showOne}) => {
    if (searchRows.length > 10) {
        return (
          <p>Too many matches, specify another filter</p>
        )
      }
      if (searchRows.length < 10 && searchRows.length > 1) {
        if (showOne === null) {     
          return (
            <div>
              {filter()}
            </div>
              )
          }      
        return (
          <div>
           {country(showOne)}
          </div>
          )
        } 
        return (
          <div>
            {country(searchRows)}
          </div>
           )
        }

export default Result