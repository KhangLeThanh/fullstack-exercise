import React, {useState} from 'react' 

const BlogForm = ({ createBlog }) => {
    const [ newBlog, setNewBlog] = useState({
        title: "",
        author: "",
        url:""
    })

    const handleChange = (event) => {
        const value = event.target.value;
        setNewBlog({
            ...newBlog,
            [event.target.name]: value
        });
    }

    const addBlog = async (event) => {
        event.preventDefault()
    
        createBlog ({
          title: newBlog.title,
          author: newBlog.author,
          url: newBlog.url,
        })
       
      }  

  return (
    <div className="formDiv">
      <h2>Create new </h2>

      <form onSubmit={addBlog}>
      <div>
      title: 
          <input  
            value={newBlog.title}
            name="title"
            onChange={handleChange}/>
        </div>
        <div>
          author: 
          <input  
            value={newBlog.author}
            name="author"
            onChange={handleChange}/>
          </div>
          <div>
          url: 
          <input  
            value={newBlog.url}
            name="url"
            onChange={handleChange}/>
          </div>
      <button type="submit">save</button>
    </form>  
    </div>
  )
}
export default BlogForm
