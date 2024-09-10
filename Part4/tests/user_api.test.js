const bcrypt = require('bcrypt');
const User = require('../models/user');
const { usersInDb } = require('./test_helper');
const { test, after, beforeEach, describe } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const assert = require("node:assert");

const api = supertest(app);

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
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        assert(usernames.includes(newUser.username));
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
        assert(result.body.error.includes('expected `username` to be unique'));

        assert.strictEqual(usersAtEnd.length, usersAtStart.length);
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
        assert.strictEqual(usersAtEnd.length, usersAtStart.length);
        assert(result.body.error.includes('expected `username` to be provided'));
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
        assert.strictEqual(usersAtEnd.length, usersAtStart.length);
        assert(result.body.error.includes('expected `username` to be at be at least 3 characters long'));
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
        assert.strictEqual(usersAtEnd.length, usersAtStart.length);
        assert(result.body.error.includes('expected `password` to be provided'));
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
        assert.strictEqual(usersAtEnd.length, usersAtStart.length);
        assert(result.body.error.includes('expected `password` to be at be at least 3 characters long'));
    });
});

after(async () => {
    await mongoose.connection.close();
});