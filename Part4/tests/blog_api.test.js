const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const { initialBlogs, blogsInDb } = require('./test_helper');
const jwt = require('jsonwebtoken');
const api = supertest(app);
const bcrypt = require('bcrypt');
const User = require('../models/user');

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn()
}));

beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'cactus', passwordHash });
    const userForTest = await user.save();
    const userIdForTest = userForTest.id;

    // Set the mock implementation after userIdForTest has been set
    jwt.verify.mockImplementation(() => {
        return { id: userIdForTest };
    });
});

describe('when there is initially some blogs saved', () => {
    jest.setTimeout(10000);

    beforeEach(async () => {
        await Blog.deleteMany({});
        for (let blog of initialBlogs) {
            await api.post('/api/blogs').send(blog);
        }
    });

    test('blogs are returned as json', async () => {
        const token = "tokeForTest";
        await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(jwt.verify).toHaveBeenCalledWith(token, process.env.SECRET);
    });

    test('blog\'s unique identifier property is named id', async () => {
        const response = await api
            .get('/api/blogs');
        // .set('Authorization', `TokeForTest`);
        const blogs = response.body;
        blogs.forEach(blog => {
            expect(blog.id).toBeDefined();
            expect(blog.id).not.toBe('');
        });
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
            expect(response.body.length).toBe(initialBlogs.length + 1);
            expect(titles).toContain('Dark sky');
        });

        test('default value of likes should be 0 if missing in request', async () => {
            const newBlog = {
                title: 'A new blog',
                author: 'Author Name',
                url: 'http://example.com',
                // No 'likes' property
            };

            const response = await api.post('/api/blogs').send(newBlog);
            expect(response.status).toBe(201);
            expect(response.body.likes).toBe(0);
        });

        test('blog creation fails with 400 if title is missing', async () => {
            const newBlog = {
                author: 'LittleBread',
                url: 'http://example.com',
                likes: 5
            };

            const response = await api.post('/api/blogs').send(newBlog);
            expect(response.status).toBe(400);
        });

        test('blog creation fails with 400 if url is missing', async () => {
            const newBlog = {
                title: 'A new blog',
                author: 'LittleBread',
                likes: 5
            };

            const response = await api.post('/api/blogs').send(newBlog);
            expect(response.status).toBe(400);
        });
    });

    describe('view blogs', () => {
        test('there are two blogs', async () => {
            const response = await api.get('/api/blogs');
            expect(response.body.length).toBe(initialBlogs.length);
        });

        test('the first blog is about pet', async () => {
            const response = await api.get('/api/blogs');
            const titles = response.body.map(e => e.title);
            expect(titles).toContain('What is hedgehock');
        });
    });

    describe('delete blogs', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            const blogsAtStart = await blogsInDb();
            const blogToDelete = blogsAtStart[0];
            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204);
            const blogsAtEnd = await blogsInDb();
            expect(blogsAtEnd.length).toBe(initialBlogs.length - 1);
            const titles = blogsAtEnd.map(r => r.title);
            expect(titles).not.toContain(blogToDelete.title);
        });
    });

    describe('modify blogs', () => {
        test('succeeds with updating', async () => {
            const blogsAtStart = await blogsInDb();
            const blogToUpdate = blogsAtStart[0];
            blogToUpdate.likes = '10000';
            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(blogToUpdate)
                .expect(200);

            const blogsAtEnd = await blogsInDb();
            expect(blogsAtEnd.length).toBe(initialBlogs.length);

            const resp = await api.get(`/api/blogs/${blogToUpdate.id}`);
            expect(resp.body.likes).toBe(10000);
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});