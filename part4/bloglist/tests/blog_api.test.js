const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  },100000)

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type',/application\/json/)
})

test('all blogs are returned', async() => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)

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

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('iltutmish')
})

test('if likes property not present, default to zero', async () => {
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

test('deletion of a note', async() => {
    const blogsAtStart = await helper.blogsinDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsinDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
})

test('update likes on a blog', async() => {
    const blogsAtStart = await helper.blogsinDb()
    let blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 50

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
    
    expect(blogToUpdate.likes).toBe(50)

})

afterAll(() => {
    mongoose.connection.close()
})