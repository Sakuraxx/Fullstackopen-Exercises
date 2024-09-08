const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
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
  if (body.likes === undefined) {
    body.likes = 0;
  }
  const blog = new Blog(body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
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
