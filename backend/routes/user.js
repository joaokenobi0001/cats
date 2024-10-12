const express = require('express');
const UserApi = require('../api/user');
const authMiddleware = require('../middleware/auth');

const userRouter = express.Router();

userRouter.post('/login',  UserApi.login);
userRouter.get('/', authMiddleware(['admin', 'viewer']), UserApi.findUser);
userRouter.post('/', UserApi.createUser);
userRouter.put('/:id', authMiddleware(), UserApi.updateUser);
userRouter.delete('/:id', UserApi.deleteUser);

module.exports = userRouter;