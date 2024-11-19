const express = require('express');
const UserApi = require('../api/user');
const authMiddleware = require('../middleware/auth');

const userRouter = express.Router();

userRouter.post('/login',  UserApi.login);
userRouter.post('/validate', authMiddleware(), UserApi.tokenValidate);
userRouter.get('/token', authMiddleware(), UserApi.getUser);
// Atualizar senha - rota específica
userRouter.put('/atualizarsenha', UserApi.atualizarSenha);

// Atualizar usuário pelo ID - rota dinâmica
userRouter.put('/:id', authMiddleware(['admin']), UserApi.updateUser);
userRouter.get('/', authMiddleware(['admin']), UserApi.getAllUser);
userRouter.post('/', authMiddleware(['admin']), UserApi.createUser);
userRouter.post('/admin', UserApi.createUserAdmin);
userRouter.delete('/:id', authMiddleware(['admin']), UserApi.deleteUser);
userRouter.post('/:id/block', authMiddleware(['admin']), UserApi.blockUser);
userRouter.post('/:id/unblock', authMiddleware(['admin']), UserApi.unblockUser);
userRouter.post('/verificar', UserApi.validateAccessCode);  
userRouter.post('/recuperar', UserApi.recuperarSenha); 

module.exports = userRouter;