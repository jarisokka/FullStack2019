import React from 'react'
import { Button } from 'semantic-ui-react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
      {blog.title} {blog.author}
    </div>
    <div>
      blog has {blog.likes} likes
      <Button size='mini' onClick={onClick}>like</Button>
    </div>
    <p>added by {blog.user ? blog.user.name : ''}</p>
  </div>
)

export default SimpleBlog