import { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a,b) =>  b.likes - a.likes)))
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const likeUpdate = async(blog, id) => {
    await blogService.update(blog, id)
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)

  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type= "text"
          value= {username}
          name= "Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type = "submit">login</button>
    </form>
  )

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog '${blogObject.title}' by '${blogObject.author}' added`)
      setMessageClass('success')
      setTimeout(() => {
        setMessage(null)
        setMessageClass('')
      },5000)
    } catch(exception) {
      setMessage(`${exception}`)
      setMessageClass('error')
      setTimeout(() => {
        setMessage(null)
        setMessageClass('')
      },5000)
    }
  }
  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('logging in with', username, password)

    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`${user.name} logged in`)
      setMessageClass('success')
      setTimeout(() => {
        setMessage(null)
        setMessageClass('')
      },5000)
    } catch (exception) {
      setMessage('wrong username or password')
      setMessageClass('error')
      setTimeout(() => {
        setMessage(null)
        setMessageClass('')
      },5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} messageClass = {messageClass}/>
        <h2>
          Login to application
        </h2>
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} messageClass = {messageClass}/>
      <h3>{user.username} is Logged in <button onClick = {() => logout()}>logout</button></h3>

      <Togglable buttonLabel = "create new blog">
        <BlogForm createBlog={addBlog}/>
      </Togglable>

      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} likeUpdate={likeUpdate} blog={blog} user={user} blogs={blogs} setBlogs={setBlogs}/>
      )}
    </div>
  )
}

export default App
