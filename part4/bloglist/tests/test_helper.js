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

  const blogsinDb = async () => {
      const blogs = await Blog.find({})
      return blogs.map(blog => blog.toJSON())
  }

  module.exports = {
      initialBlogs, blogsinDb
  }