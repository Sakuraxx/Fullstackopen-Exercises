const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const assert = require("node:assert");

const api = supertest(app);

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


beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});


test('blog\'s unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;
    blogs.forEach(blog => {
        assert(blog.id !== undefined, 'id field is missing');
        assert(blog.id !== '', 'id field is empty');
    })
});

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
});

test('the first blog is about pet', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(e => e.title)
    assert(titles.includes('What is hedgehock'))
})

after(async () => {
    await mongoose.connection.close();
});