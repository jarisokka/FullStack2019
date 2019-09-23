import React from 'react'

const Users = ({ blog }) => {

  return (
    <div>
      <p>{blog.user ? blog.user.name : ''}</p>
    </div>
  )
}

export default Users