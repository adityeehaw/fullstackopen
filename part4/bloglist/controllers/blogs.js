const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({})
  response.json(allBlogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
  // try{              No need of try/catch because of express-async-errors
  savedblog = await blog.save()
  response.status(201).json(savedblog)
// }
  // catch(exception) {
  //   next(exception)
  // }

})

module.exports = blogsRouter