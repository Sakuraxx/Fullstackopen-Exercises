const bcrypt = require('bcrypt');
const User = require('../models/user');
const { usersInDb } = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('test user api', () => {
    describe('when there is initially one user in db', () => {
        beforeEach(async () => {
            await User.deleteMany({});

            const passwordHash = await bcrypt.hash('sekret', 10);
            const user = new User({ username: 'root', passwordHash });

            await user.save();
        });

        test('creation succeeds with a fresh username', async () => {
            const usersAtStart = await usersInDb();

            const newUser = {
                username: 'LittleBread',
                name: 'Little Bread',
                password: 'sakuraxx',
            };

            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/);

            const usersAtEnd = await usersInDb();
            expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

            const usernames = usersAtEnd.map(u => u.username);
            expect(usernames).toContain(newUser.username);
        });

        test('creation fails with proper statuscode and message if username already taken', async () => {
            const usersAtStart = await usersInDb();

            const newUser = {
                username: 'root',
                name: 'Superuser',
                password: 'salainen',
            };

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/);

            const usersAtEnd = await usersInDb();
            expect(result.body.error).toContain('expected `username` to be unique');
            expect(usersAtEnd.length).toBe(usersAtStart.length);
        });
    });


    describe('when user added is invalid', () => {
        test('username is not provided', async () => {
            const usersAtStart = await usersInDb();

            const newUser = {
                name: 'Little Bread',
                password: 'sakuraxx',
            };

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/);

            const usersAtEnd = await usersInDb();
            expect(result.body.error).toContain('expected `username` to be provided');
            expect(usersAtEnd.length).toBe(usersAtStart.length);
        });

        test('the length of username is less than 3 characters', async () => {
            const usersAtStart = await usersInDb();

            const newUser = {
                username: 'bb',
                name: 'Little Bread',
                password: 'sakuraxx',
            };

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/);

            const usersAtEnd = await usersInDb();
            expect(result.body.error).toContain('expected `username` to be at be at least 3 characters long');
            expect(usersAtEnd.length).toBe(usersAtStart.length);
        });

        test('password is not provided', async () => {
            const usersAtStart = await usersInDb();

            const newUser = {
                username: 'LittleBread',
                name: 'Little Bread',
            };

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/);

            const usersAtEnd = await usersInDb();
            expect(result.body.error).toContain('expected `password` to be provided');
            expect(usersAtEnd.length).toBe(usersAtStart.length);
        });

        test('the length of password is less than 3 characters', async () => {
            const usersAtStart = await usersInDb();

            const newUser = {
                username: 'bbbb',
                name: 'Little Bread',
                password: 'sa',
            };

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/);

            const usersAtEnd = await usersInDb();
            expect(result.body.error).toContain('expected `password` to be at be at least 3 characters long');
            expect(usersAtEnd.length).toBe(usersAtStart.length);
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});