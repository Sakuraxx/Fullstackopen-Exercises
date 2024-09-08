const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const assert = require("node:assert");
const blog = require('../models/blog');

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


test('save one blog and the total number of blogs is increased by 1', async () => {
    const blogToBeSaved = {
        "title": "Dark sky",
        "author": "LittleBread",
        "url": "https://www.sky.com",
        "likes": 1
    };
    await api
        .post('/api/blogs')
        .send(blogToBeSaved)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    const response = await api.get('/api/blogs');
    const titles = response.body.map(r => r.title);
    assert.strictEqual(response.body.length, initialBlogs.length + 1);
    assert(titles.includes('Dark sky'));
});

test('default value of likes should be 0 if missing in request', async () => {
    const newBlog = {
        title: 'A new blog',
        author: 'Author Name',
        url: 'http://example.com'
        // No 'likes' property
    };

    const response = await api.post('/api/blogs').send(newBlog);

    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.likes, 0);
});

test('blog creation fails with 400 if title is missing', async () => {
    const newBlog = {
        author: 'LittleBread',
        url: 'http://example.com',
        likes: 5
    };

    const response = await api.post('/api/blogs').send(newBlog);

    assert.strictEqual(response.status, 400);
});

test('blog creation fails with 400 if url is missing', async () => {
    const newBlog = {
        title: 'A new blog',
        author: 'LittleBread',
        likes: 5
    };

    const response = await api.post('/api/blogs').send(newBlog);

    assert.strictEqual(response.status, 400);
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