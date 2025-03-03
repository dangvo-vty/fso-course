const {test , after, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const suppertest = require('supertest')
const app = require('../app')
const assert  = require('node:assert')
const Blog = require('../models/blogs')
const helper = require('./helper')
const api = suppertest(app)



beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject  = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject  = new Blog(helper.initialBlogs[1])
  await blogObject.save()

})

test('blogs returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/) 
})

test.only('there are 2 blogs', async() => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test.only('first is test', async() => {
  const response = await api.get('/api/blogs')
  const contents  = response.body.map( r => r.title)
  assert.strictEqual(contents.includes('test1'), true)
})

test('identifier is id not __id', async() => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body[0].hasOwnProperty('id'), true)

})

test('add a valid blogs', async() => {
  const newBlogs = {
    title: 'test3',
    author: 'dang',
    url: 'https://test.com',
    likes: 100
  }

  await api
    .post('/api/blogs/')
    .send(newBlogs)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})



after(async () => {
  await mongoose.connection.close()
})