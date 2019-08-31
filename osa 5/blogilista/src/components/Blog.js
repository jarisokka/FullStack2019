import React, { useState } from 'react'


const Blog = ({ blog, like, remove }) => {
const [showAll, setShowAll] = useState(false)

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showAlldetails = { display: showAll ? '' : 'none' }
  const toggleShowAll = () => {
      setShowAll(!showAll)
  }

  return (    
  <div style={blogStyle}>
    <div onClick={toggleShowAll} className='start'>  
    {blog.title} {blog.author}
    </div>
    <div style={showAlldetails} className='details'>
    <p>{blog.url}</p>
    <p>{blog.likes} likes <button onClick={() => like(blog.id) }>like</button></p>
    <p>added by {blog.user ? blog.user.name : ''}</p>
    <p><button onClick={() => remove(blog.id)}>delete</button></p>  
    </div>
  </div>
  )
}

export default Blog