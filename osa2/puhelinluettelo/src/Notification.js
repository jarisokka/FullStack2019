import React from 'react'

const Notification = ({message1, message2}) => {
    if (message1 !== null && message1 !== undefined) {
        return (
          <div className='alert'>
            {message1}
          </div>
          )             
    }

    if (message2 !== null && message2 !== undefined ) {
        return (
            <div className='error'>
          {message2}
        </div>
        )
    }
    return null
}


  export default Notification