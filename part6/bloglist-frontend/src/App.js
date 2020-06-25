import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './App.css'
const App = () => {
  const [blog, setBlog] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [ newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url:""
  })
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const blogFormRef = React.createRef()

  
  useEffect(() => {
    blogService.getAll().then(blog =>
      setBlog( blog )
    )  
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const logOut = () => {
    window.localStorage.clear();
    window.location.reload(false);
  }


  const addBlog =  (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlog(blog.concat(returnedBlog))
        setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setNewBlog('')

      })
      .catch(error=>{
        console.log(error)
      })
  }  
  
  const handleLikes = (id) => {
    const item = blog.find(n => n.id === id)
    const changedInfo = { ...item, likes: item.likes + 1}
    blogService
      .update(id, changedInfo)
      .then(returnedBlog => {
        setBlog(blog.map(item => item.id !== changedInfo.id ? item : returnedBlog))

      
      })
      .catch(error => {
        console.log(error)
      
      }) 
  };
  const handleRemove = (id) => {
    const item = blog.find(n => n.id === id)
    const deletedBlog = { ...item}
    let answer = window.confirm(`Remove ${item.title} by ${item.author}`);
    if(answer=== true){
      blogService
        .deleteId(id, deletedBlog)
        .then(returnedBlog=> {
          setBlog(blog.map(item => item.id !== id ? item : returnedBlog).filter(value => Object.keys(value).length !== 0))
        })
    }  
  };
  return (
    <div>

      {user === null ? 
        <div>
           <h2>log in to application</h2>
           <Notification error_message={errorMessage} success_message={successMessage}/>
          
           <Togglable buttonLabel='login'>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        </div>
        :  
        <div>
          <h2>blogs</h2>
          <Notification success_message={successMessage} error_message={errorMessage}/>
          <p >{user.name} logged in <span><button onClick={logOut}>log out</button></span></p> 
          <div style={{paddingTop:'1em'}}>
            <h2>create new</h2>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <BlogForm
                 createBlog={addBlog}  
              />
            </Togglable>
          </div>
          <div>
          {blog.map(item =>
              <Blog key={item.id} blog={item} handleLikes={handleLikes} handleRemove={handleRemove}/>
          )}
          
          </div>
        </div>
      }

     
    </div>
  )
}

export default App