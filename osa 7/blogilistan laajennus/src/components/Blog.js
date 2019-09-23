/* eslint-disable indent */
import React from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const Blog = ({ blog, like, remove }) => {

  return (    
  <div>
      <Table celled>      
        <Table.Body>
          <Table.Cell>
            <Link to={`/api/blogs${blog.id}`}>
                {blog.title} {blog.author}           
            </Link>
          </Table.Cell>
        </Table.Body>       
      </Table>
  </div>
  )
}

export default Blog