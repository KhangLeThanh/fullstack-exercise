import React , { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikes, handleRemove }) => {
  const [isToggled, setIsToggled] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggle = useCallback(
    () => setIsToggled(!isToggled),
    [isToggled],
  );

  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title} <button   onClick={toggle}>{isToggled === false ? 'view' : 'hide'}</button>
        {isToggled === true &&
          <ul>
            <li>{blog.url}</li>
            <li>likes {blog.likes}  <button onClick={()=>handleLikes(blog.id)}>like</button></li>
            <li>{blog.author}</li>     
            <li><button onClick={()=>handleRemove(blog.id)}>remove</button></li>
          </ul> 
        }  
      </div>
  </div>
  )
}  
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}
export default Blog
