const blogRouter = require('express').Router()
const { urlencoded } = require('express')
const Blog = require('../models/blogs')

blogRouter.get('/', async (request, response) => {
    const  blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
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
  const deleted = await Blog.findByIdAndDelete(request.params.id)
  response.status(200).send(deleted)
})
module.exports = blogRouter