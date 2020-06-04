const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, response) => {
  Blog.find({}).then(blog => {
    response.json(blog)
    })
  })
  
blogRouter.get('/:id', (req, response, next) => {
  Blog.findById(req.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end() 
      }
    })
    .catch(error => next(error))
})

blogRouter.post('/', (request, response, next) => {
    const body = request.body
  
  
 
    const blog =  new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,

    })
  
    blog.save()
      .then(savedBlog => {
        return savedBlog.toJSON()
      })
      .then(savedAndFormattedPerson => {
        response.json(savedAndFormattedPerson)
      })
      .catch(error => next(error))
})

blogRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(req.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
})
  
blogRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog =  new Blog({
    name: body.name,
    author: body.author,
    url: body.url,
    number: body.number,

  })

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
  })
  
module.exports = blogRouter