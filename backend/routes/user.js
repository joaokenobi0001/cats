const express = require('express');
const UserApi = require('../api/user');
const authMiddleware = require('../middleware/auth');

const userRouter = express.Router();

userRouter.post('/login',  UserApi.login);
userRouter.get('/', authMiddleware(['admin', 'viewer']), UserApi.findUser);
userRouter.post('/', UserApi.createUser);
userRouter.post('/admin', authMiddleware(['admin']), UserApi.createUserAdmin);
userRouter.put('/:id', authMiddleware(), UserApi.updateUser);
userRouter.delete('/:id', UserApi.deleteUser);
userRouter.post('/:id/block', authMiddleware(['admin']), UserApi.blockUser);
userRouter.post('/:id/unblock', authMiddleware(['admin']), UserApi.unblockUser);


module.exports = userRouter;