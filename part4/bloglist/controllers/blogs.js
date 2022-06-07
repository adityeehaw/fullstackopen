const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate('user',{username: 1})
  response.json(allBlogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  // const token = getTokenFrom(request)

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes
  })
  
  savedblog = await blog.save()
  user.blogs = user.blogs.concat(savedblog._id)
  await user.save()
  response.status(201).json(savedblog)

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request,response) => {

  // const token = getTokenFrom(request)

  const user = request.user
  const blogToDelete = await Blog.findById(request.params.id)


  if(user.id.toString() === blogToDelete.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
   response.status(204).end()
  }else{
    response.status(401).json({ error: 'not authorized to delete this blog'})
  }

  

})

blogsRouter.put('/:id', middleware.userExtractor, async (request,response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const user = request.user

  blogToUpdate = await Blog.findById(request.params.id)

  if(user.id.toString() === blogToUpdate.user.toString()) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.status(204).json(updatedBlog)
  } else {
    response.status(401).json({ error: 'not authorized to update this blog'})
  }


  // const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  // response.json(updatedBlog)

})


module.exports = blogsRouter