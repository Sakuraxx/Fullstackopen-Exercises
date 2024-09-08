const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title": "What is hedgehock",
        "author": "Cactus",
        "url": "https://www.xxx.com",
        "likes": 0
    },
    {
        "title": "What is xxx",
        "author": "Cactus2",
        "url": "https://www.xxx.com",
        "likes": 10
    },
];

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb
}