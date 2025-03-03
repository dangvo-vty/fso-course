require('dotenv').config()

const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}



const url = process.env.TEST_MONGODB

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
    console.log('connected')
  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
  })

  const Blog = mongoose.model('Blog', blogSchema)


const note = new Blog({
   title: process.argv[2],
  author: process.argv[3],
  url: process.argv[4],
  likes: process.argv[5],
 })

note.save().then(result => {
    console.log('note saved!')
})

Blog.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
      mongoose.connection.close()
    })
   
  })
 
})