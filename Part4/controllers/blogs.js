const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require('../models/user');
const jwt = require('jsonwebtoken')

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url is missing' });
  }

  if (!body.userId) {
    return response.status(400).json({ error: 'user id is missing' });
  }

  if (body.likes === undefined) {
    body.likes = 0;
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({ ...body, user: user.id });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const blogToRemove = await Blog.findById(request.params.id);


  if (!blogToRemove) {
    return response.status(401).json({ error: 'the blog dose no longer exists' });
  }

  if (blogToRemove.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: 'dose not have the right to delete this blog' });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url is missing' });
  }

  const updatedBlog = { ...request.body };
  delete updatedBlog._id;
  const blog = await Blog.findByIdAndUpdate({ _id: request.params.id }, updatedBlog, { new: true })
  if (blog) {
    response.status(200).json(blog);
  }
  else {
    response.status(404).json({ error: 'blog not found' });
  }
});

module.exports = blogsRouter;
