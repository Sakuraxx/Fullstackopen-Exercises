const Blog = require('../models/blog');
const User = require('../models/user');

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
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
}

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}