const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
    const users = await User.find({});
    response.json(users);
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;

    if (username === undefined) {
        return response.status(400).json({ error: 'expected `username` to be provided' });
    }

    if (username.length < 3) {
        return response.status(400).json({ error: 'expected `username` to be at be at least 3 characters long' });
    }

    if (password === undefined) {
        return response.status(400).json({ error: 'expected `password` to be provided' });
    }

    if (password.length < 3) {
        return response.status(400).json({ error: 'expected `password` to be at be at least 3 characters long' });
    }

    const saltRounds = 7;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
});

module.exports = usersRouter;