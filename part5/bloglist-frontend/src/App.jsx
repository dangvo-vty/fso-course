import { useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggable'
import PostForm from './components/PostForm'
import Login from './components/Login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [className, setClass] = useState('')
  
  let blogRefs = useRef()

  useEffect(() => {
    blogService.getAll().then(initblogs => setBlogs(initblogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  

  const handleLogin = async (username,password) => {
    try {
      const user = await loginService.login({username,password})
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      setUser(user)
      setMessage('Loggin')
      setClass('successful')
    } catch (exception) {
      setMessage('wrong user')
      setClass('error')
      console.log('sai pass')
    }
  }
  
  const handleLogout = () => {
    setMessage('Loggout')
    setClass('successful')
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = async (object) => {
    const new_blog = await blogService.create(object)
    setBlogs(blogs.concat(new_blog))
  }

  const handleRemove = (id) => {
    console.log('call')
    blogService.remove(id)
    console.log(id)

    setBlogs(blogs.filter((content) => content.id !== id))

  }
  return (
    <div>
      <Notification message={message} className={className}/>
      <h2>blogs</h2>
      {user === null ?
        <Login handleLogin={handleLogin}/> :
        <div>
          <p>{user.username} logged</p> <button onClick={handleLogout}>logout</button>

          <Toggleable label='New Blog' >
            <PostForm createBlog={createBlog}/>
          </Toggleable>
          {blogs.sort((a,b) => b.likes - a.likes).map(allBlog => <Blog key={allBlog.id} handleRemove={handleRemove} blog={allBlog}/> )}
        </div>
      }
    </div>
  )
}

export default App