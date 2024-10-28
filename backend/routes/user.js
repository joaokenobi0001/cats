const express = require('express');
const UserApi = require('../api/user');
const GatosApi = require('../api/gatos');
const authMiddleware = require('../middleware/auth');

const userRouter = express.Router();

userRouter.post('/login',  UserApi.login);
userRouter.post('/validate', authMiddleware(), UserApi.tokenValidate);
userRouter.get('/token', authMiddleware(), UserApi.getUser);

userRouter.get('/', authMiddleware(['admin']), UserApi.getAllUser);
userRouter.post('/', UserApi.createUser);
userRouter.post('/admin',  UserApi.createUserAdmin);
userRouter.put('/:id', authMiddleware(), UserApi.updateUser);
userRouter.delete('/:id', UserApi.deleteUser);
userRouter.post('/:id/block', authMiddleware(['admin']), UserApi.blockUser);
userRouter.post('/:id/unblock', authMiddleware(['admin']), UserApi.unblockUser);

userRouter.get('/', GatosApi.listarGatos)

module.exports = userRouter;