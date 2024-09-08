const { test, after, beforeEach, describe } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const assert = require("node:assert");
const { initialBlogs, blogsInDb } = require('./test_helper');

const api = supertest(app);

describe('when there is initially some blogs saved', () => {

    beforeEach(async () => {
        await Blog.deleteMany({});
        const blogObjects = initialBlogs.map(blog => new Blog(blog));
        const promiseArray = blogObjects.map(blog => blog.save());
        await Promise.all(promiseArray);
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

    describe('save blogs', () => {
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
    });

    describe('view blogs', () => {
        test('there are two blogs', async () => {
            const response = await api.get('/api/blogs')

            assert.strictEqual(response.body.length, initialBlogs.length)
        });

        test('the first blog is about pet', async () => {
            const response = await api.get('/api/blogs')

            const titles = response.body.map(e => e.title)
            assert(titles.includes('What is hedgehock'))
        });
    });

    describe('delete blogs', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            const blogsAtStart = await blogsInDb();
            const blogToDelete = blogsAtStart[0];

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204);

            const blogsAtEnd = await blogsInDb()

            assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)

            const titles = blogsAtEnd.map(r => r.title)
            assert(!titles.includes(blogToDelete.title))
        })
    });

    describe('modify blogs', () => {
        test('succeeds with updating', async () => {
            const blogsAtStart = await blogsInDb();
            const blogToUpdate = blogsAtStart[0];
            blogToUpdate.author = 'LittleBread';
            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(blogToUpdate)
                .expect(200);

            const blogsAtEnd = await blogsInDb();
            assert.strictEqual(blogsAtEnd.length, initialBlogs.length);
            const authors = blogsAtEnd.map(r => r.author);
            assert(authors.includes(blogToUpdate.author));
        });
    });

});

after(async () => {
    await mongoose.connection.close();
});