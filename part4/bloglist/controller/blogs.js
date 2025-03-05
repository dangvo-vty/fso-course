require('dotenv').config()
const blogRouter = require('express').Router()
const { urlencoded } = require('express')
const Blog = require('../models/blogs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
    const  blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log("test decoded", decodedToken)
    
    if (!decodedToken) {
      return response.status(400).json({error: 'token invalid'})
    }
    
    const user = await User.findById(decodedToken.id)
    
    console.log(user)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
    const newBlog = {
      title: request.params.titile,
      author: request.params.author,
      url: request.params.url,
      likes: request.params.likes,
    }
    const blog = await Blog.findByIdAndUpdate(request.params.id,newBlog)
    response.status(200).json(blog)
})

blogRouter.delete('/:id', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token,process.env.SECRET)
  const blog = await Blog.findById(request.params.id)
  console.log("blog ",blog)
  console.log("decoded ",decodedToken)
  console.log("blog user ",blog.user.toString())
  console.log("decoded user ",decodedToken.id)
  if (!decodedToken &&( blog.user.toString() !== decodedToken.user.toString())) {
    return response.status(400).send('Invalid token')
  }
  
  

  const deleted = await Blog.findByIdAndDelete(request.params.id)
  response.status(200).send(deleted)
})
module.exports = blogRouter