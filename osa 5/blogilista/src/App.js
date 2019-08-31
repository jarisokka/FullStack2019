import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import {useField} from './hooks/index'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  //const [title, setTitle] = useState('')
  //const [author, setAuthor] = useState('')
  //const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = React.createRef()  
  const username = useField('text')
  const password = useField('password')
  let title = useField('text')
  const author = useField('text')
  const url = useField('text')


  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  
  const handleLogin = async (event) => {
    //console.log('käyttäjä' + event.target[0].value)
    //console.log('salasana' + event.target[1].value)
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: event.target[0].value , password: event.target[1].value,
      })
      
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
        ) 
        blogService.setToken(user.token)
        setUser(user)
        //setUsername('')
        //setPassword('')
      } catch (exception) {
        setNotification('wrong username or password')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }
    
    const handleLogOut = (event) => {
      event.preventDefault()
      window.localStorage.removeItem('loggedNoteappUser')
      blogService.setToken(null)
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
        //setTitle('')
        //setAuthor('')
        //setUrl('')
        setNotification('a new blog ' + data.title + ' by ' + data.author + ' added')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setNotification('blog post failed')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }) 
     }  
    
    const handleBlogLikes = (id) => {
      const blog = blogs.find(n => n.id === id)
      const changedBlog = { ...blog, likes: blog.likes + 1 }
      blogService
      .update(id, changedBlog)
      .then(changedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : changedBlog))
      })
      .catch(error => {
        setNotification('unable update the likes')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
    
    const handleBlogDelete = (id) => {
      const blog = blogs.find(n => n.id === id)
      if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`) === true) {
      return (  
      blogService
        .remove(id)
        .then(removedBlog => {
          setBlogs(blogs.filter(del => del.id !== id))
        })
        .catch(error => {
          setNotification('error while removing the blog')
          setTimeout(() => {
            setNotification(null)
          }, 5000) 
        })
      ) 
    }
    else {
      return (
        console.log('peruttu')
      )
    }
  }
    const blogit = () => blogs.sort((a, b) => b.likes - a.likes).map(blog =>
      <Blog
      key={blog.id}
      blog={blog}
      like={handleBlogLikes}
      remove={handleBlogDelete} />
    )
    
    const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
    <form onSubmit={handleBlogs}>
      <h1>create new</h1>
      <div>
      title:
      <input {...title.att}/>
      </div>
      <div>
      author:
      <input {...author.att}/>
      </div>
      <div>
      url:
      <input {...url.att} />
      </div>
        <button type="submit">save</button>
      </form>
      </Togglable>  
    )


  const loginForm = () => (
    <div className='login'>
    <form onSubmit={handleLogin}>
      <h1>Login to application</h1>
      <Notification message={notification} />
      <div>
        username
          <input {...username.att} />
      </div>
      <div>
        password
          <input {...password.att} />
      </div>
      <button type="login">login</button>
    </form>
    </div>      
  )

  const loggedForm = () => (
    <div>
      <h1>blogs</h1>
      <Notification message={notification} />
      <p>{user.name} logged in
      <button type="logout" onClick={handleLogOut}>logout</button></p>
      {blogForm()}
      {blogit()}
    </div>  
  )

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && loggedForm()}
    </div>
  )
}

export default App