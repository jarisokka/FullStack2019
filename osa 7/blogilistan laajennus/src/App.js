import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import {useField} from './hooks/index'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import { Container, Menu, Button, Form } from 'semantic-ui-react'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({message: null})

  const blogFormRef = React.createRef()  
  const username = useField('text')
  const password = useField('password')
  let title = useField('text')
  const author = useField('text')
  const url = useField('text')


  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 10000)
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: event.target[0].value, 
        password: event.target[1].value,
      })
      
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogOut = () => {
    setUser(null)
    blogService.destroyToken()
    window.localStorage.removeItem('loggedNoteappUser')
  }

  const handleBlogs = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: event.target[0].value,
      author: event.target[1].value,
      url: event.target[2].value
    }
    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        title.reset()
        author.reset()
        url.reset()
        notify(`a new blog ${data.title} by ${data.author} added`)
      })
      .catch(error => {
        notify(`blog post failed`, 'error')
      }) 
  }  

  const handleBlogLikes = async (id) => {
    const blog = blogs.find(n => n.id === id)
    const likedBlog = { ...blog, likes: blog.likes + 1}
    const updatedBlog = await blogService.update(id, likedBlog)
    setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
    notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
  }  

  const handleBlogDelete = async (id) => {
    const blog = blogs.find(n => n.id === id)
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      const updatedBlog = await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      notify(`blog ${updatedBlog.title} by ${updatedBlog.author} removed!`)
    }
  }


  const blogById = (id) => {
    return blogs.find(a => a.id === id)
  }
  
  const OneBlog = ({ blog }) => {
    if (blog === undefined) {
      return null
    }
    return(
      <div>
        <h2> </h2>
        <h2>{blog.title} {blog.author}</h2>
        <Link to={`${blog.url}`}>{blog.url}</Link>
        <p>{blog.likes} likes <Button size='mini' onClick={() => handleBlogLikes(blog.id) }>like</Button></p>
        <p><Button size='mini' onClick={() => handleBlogDelete(blog.id)}>delete</Button></p> 
        <p>added by {blog.user ? blog.user.name : ''}</p>
      </div>
    )
  }

  const Kayttajat = ({ blogs }) => {
    return (
      <div>
        <h1>users</h1>
        {blogs.map(blog =>
          <Users
            key={blog.id}
            user={user}
            blog={blog} />
        )}
      </div>
    )
  }
    

  const Menuu = () => {
    return (
      <div>
        <Menu inverted>
          <Menu.Item link>
            <Link to="/">home</Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to="/blogs">blogs</Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to="/users">users</Link>
          </Menu.Item>
          <Menu.Item link>
            <p>{user.name} logged in
              <Button size='mini' type="logout" onClick={handleLogOut}>logout</Button></p>
          </Menu.Item>  
        </Menu>  
      </div>
    )
  }
 

  const blogForm = () => (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <Form onSubmit={handleBlogs}>
          <h1>create new</h1>
          <Form.Field>
      title:
            <input {...title.att}/>
          </Form.Field>
          <Form.Field>
      author:
            <input {...author.att}/>
          </Form.Field>
          <Form.Field>
      url:
            <input {...url.att} />
          </Form.Field>
          <Button size='mini' type="submit">save</Button>
          <p> </p>
        </Form>
      </Togglable>
      <p> </p>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={handleBlogLikes}
          remove={handleBlogDelete} 
        />
      )}
    </div>
  )

  if (user === null) {
    return (
      <div>
        <Container>
          <Router> 
            <div className='login'>
              <Form onSubmit={handleLogin}>
                <h1>Login to application</h1>
                <Notification notification={notification} />
                <Form.Field>
        username
                  <input {...username.att} />
                </Form.Field>
                <Form.Field>
        password
                  <input {...password.att} />
                </Form.Field>
                <p> </p>
                <Button size='mini' type="login">login</Button>
              </Form>
            </div>
          </Router>
        </Container> 
      </div>      
    )
  }
  
  return(
    <div>
      <Container>
        <div>
          <Router>
            <div>
              <Menuu />
              <h1>blog app</h1>
              <Notification notification={notification} />   
              <Route exact path="/" render={() => blogForm() }/>
              <Route exact path="/blogs" render={() => blogForm() }/>
              <Route exact path="/users" render={() =>
                <Kayttajat blogs={blogs} />} />
              <Route exact path="/api/blogs:id" render={({ match }) =>
                <OneBlog blog={blogById(match.params.id)} /> }/> 
            </div>
          </Router>
        </div>
      </Container>
    </div>  
  )
}

export default App