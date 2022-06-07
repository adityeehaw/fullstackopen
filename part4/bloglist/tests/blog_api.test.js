const mongoose = require('mongoose')
const supertest = require('supertest')
const { post, response } = require('../app')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


const newUser = {
    username: "newUser",
    name: "user",
    password: "user"
}
const createNewUser = async () => {
    await api
            .post('/api/users')
            .send(newUser)
}

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await createNewUser()
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
    const logintoken = await api.post('/api/login').send(newUser)

    await api
        .post('/api/blogs')
        .set('authorization',`bearer ${logintoken.body.token}` )
        .send(newblog)
        .expect(201)
        .expect('Content-Type',/application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('iltutmish')
})

test('new blog cannot be added if token is not provided', async() => {
    const newblog = {
        title: 'iltutmish',
        author:'iltutmish',
        url: 'www.12ft.io',
        likes: 243
    }
    

    await api
        .post('/api/blogs')
        .send('newblog')
        .expect(401)
})


test('if likes property not present, default to zero', async () => {
    const newblog = {
        title: 'ibn Batuta',
        author: 'Ibn Batuta',
        url: 'www.youtube.com'
    }

    const logintoken = await api.post('/api/login').send(newUser)

    const response = await api
                        .post('/api/blogs')
                        .set('authorization', `bearer ${logintoken.body.token}`)
                        .send(newblog)
                        .expect(201)

    expect(response.body.likes).toBe(0)
})

test('if title and url not present, send back 400 Bad request', async () => {
    const blog = {
        author: 'snoop',
        likes: 5
    }
    const logintoken = await api.post('/api/login').send(newUser)
    await api
            .post('/api/blogs')
            .set('authorization', `bearer ${logintoken.body.token}`)
            .send(blog)
            .expect(400)
})

test('deletion of a note with correct token', async() => {
    const newblog = {
        title: 'ibn Batuta',
        author: 'Ibn Batuta',
        url: 'www.youtube.com',
        likes: 40
    }

    const logintoken = await api.post('/api/login').send(newUser)

    const response = await api
                        .post('/api/blogs')
                        .set('authorization', `bearer ${logintoken.body.token}`)
                        .send(newblog)
                        .expect(201)

    const blogsAtStart = await helper.blogsinDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('authorization', `bearer ${logintoken.body.token}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsinDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
})

test('update likes on a blog with a correct token', async() => {

    const newblog = {
        title: 'ibn Batuta',
        author: 'Ibn Batuta',
        url: 'www.youtube.com',
        likes: 40
    }

    const logintoken = await api.post('/api/login').send(newUser)

    const response = await api
                        .post('/api/blogs')
                        .set('authorization', `bearer ${logintoken.body.token}`)
                        .send(newblog)
                        .expect(201)

    const blogsAtStart = await helper.blogsinDb()
    let blogToUpdate = blogsAtStart[blogsAtStart.length - 1]
    blogToUpdate.likes = 50

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('authorization',`bearer ${logintoken.body.token}`)
        .send(blogToUpdate)
        .expect(204)
    
    expect(blogToUpdate.likes).toBe(50)

})

afterAll(() => {
    mongoose.connection.close()
})