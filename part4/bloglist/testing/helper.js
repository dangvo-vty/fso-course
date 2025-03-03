const Blog = require('../models/blogs')

const initialBlogs = [
    {
      title: 'test1',
      author: 'dang',
      url: 'https://test.com',
      like:11
    },
    {
      title: 'test2',
      author: 'dang',
      url: 'https://test.com',
      like:11
    }
]

const nonExistingId = async () => {
    const note = new Blog({ content: 'willremovethissoon' })
    await note.save()
    await note.deleteOne()
  
    return note._id.toString()
}

const blogsInDb = async () => {
    const notes = await Blog.find({})
    return notes.map(note => note.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}