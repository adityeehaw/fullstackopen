const { get } = require('express/lib/response')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: 'Life is easy',
      author: 'jack',
      url: 'www.youtube.com',
      likes: 23
    },
    {
        title: 'Life is hard',
        author: 'jacku',
        url: 'www.bmw.com',
        likes: 28
    },
  ]
  
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  },100000)

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type',/application\/json/)
})

test('all blogs are returned', async() => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)

})

test('id is defined', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async() => {
    const newblog = {
        title: 'iltutmish',
        author:'iltutmish',
        url: 'www.12ft.io',
        likes: 243
    }

    await api
        .post('/api/blogs')
        .send(newblog)
        .expect(201)
        .expect('Content-Type',/application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('iltutmish')
})

test('if likess property not present, default to zero', async () => {
    const newblog = {
        title: 'ibn Batuta',
        author: 'Ibn Batuta',
        url: 'www.youtube.com'
    }

    const response = await api.post('/api/blogs').send(newblog)
    expect(response.body.likes).toBe(0)
})

test('if title and url not present, send back 400 Bad request', async () => {
    const blog = {
        author: 'snoop',
        likes: 5
    }

    await api
            .post('/api/blogs')
            .send(blog)
            .expect(400)
})
afterAll(() => {
    mongoose.connection.close()
})