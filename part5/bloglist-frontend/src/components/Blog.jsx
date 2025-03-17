import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog,refForm,handleRemove }) => {
  const [visible, setVisible] = useState(true)
  const [content, setContent] = useState(blog)
  const isDisplay = { display: visible? 'none': '' }

  const handleClick = () => {
    setVisible(!visible)
  }
  const handleLike = () => {
    setContent({ ...content, likes: content.likes+1 })
    blogService.update({ ...content,likes: content.likes + 1 })
  }
  const remove = () => {
    const comfirmm = window.confirm('CAC')
    if (comfirmm) {
      handleRemove(content.id)
      setContent({})
    }
  }

  return (
    <div className="blog-box">
      <p>titile: {content.title} <button  className='view-button' onClick={handleClick}>View</button> </p>
      <p style={isDisplay}>author: {content.author}</p>
      <p style={isDisplay}>url: {content.url}</p>
      <p style={isDisplay}>likes: {content.likes}  <button  className='like-button' style={isDisplay} onClick={handleLike}>Like</button></p>
      <button  className='remove-button' onClick={remove} style={isDisplay} >REMOVE</button>
    </div>
  )}

export default Blog