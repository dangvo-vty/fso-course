import { useState } from "react"; 
import blogService from '../services/blogs'

const PostForm = (props) => {
    const [newBlog, setBlogs] = useState({
        title: '',
        author: '',
        url: '',
        likes: 0
    })
    
    const handlePost = (event) => {
        event.preventDefault()
        const target = event.target
        props.createBlog({
            title: target.title.value,
            author: target.author.value,
            url: target.url.value, 
            likes: target.likes.value,
          })
        setBlogs({
            title: '',
            author: '',
            url: '',
            likes: 0
        })
      }

    return (
        <div>
        <h2>New Blog</h2>
        <form onSubmit={handlePost}>
          <div>title: <input onChange={(event) => {setBlogs({...newBlog,title: event.target.value})}} value={newBlog.title} type='text' name='title'/></div>
          <div>author: <input onChange={(event) => {setBlogs({...newBlog,author: event.target.value})}} value={newBlog.author} type='text' name='author'/></div>
          <div>url: <input onChange={(event) => {setBlogs({...newBlog,url: event.target.value})}} value={newBlog.url} type='text' name='url'/></div>
          <div>like: <input onChange={(event) => {setBlogs({...newBlog,likes: event.target.value})}} value={newBlog.likes} type='number' name='likes'/></div>
          <div><button type='submit'>POST</button></div>
        </form>
        </div>
    )
}

export default PostForm