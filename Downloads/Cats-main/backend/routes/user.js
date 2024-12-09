const express = require('express');
const UserApi = require('../api/user');
const authMiddleware = require('../middleware/auth');
const UserController = require('../controller/user');

const userRouter = express.Router();

// Rota para registro de usuários
userRouter.post('/', UserApi.createUser);  // Alterado para a rota padrão

// Rota para login
userRouter.post('/login', UserApi.login);  // Mantido como estava

// Validação de token (requer autenticação)
userRouter.post('/validate', authMiddleware(), UserApi.tokenValidate);  // Mantido como estava

// Obter informações do usuário autenticado
userRouter.get('/token', authMiddleware(), UserApi.getUser);  // Mantido como estava

// Atualizar senha
userRouter.put('/atualizarsenha', UserApi.atualizarSenha);  // Mantido como estava

// Rotas protegidas para administradores
userRouter.get('/', authMiddleware(['admin']), UserApi.getAllUser);  // Mantido como estava
userRouter.post('/admin', authMiddleware(['admin']), UserApi.createUserAdmin);  // Mantido como estava
userRouter.put('/:id', authMiddleware(['admin']), UserApi.updateUser);  // Mantido como estava
userRouter.delete('/:id', authMiddleware(['admin']), UserApi.deleteUser);  // Mantido como estava
userRouter.post('/:id/block', authMiddleware(['admin']), UserApi.blockUser);  // Mantido como estava
userRouter.post('/:id/unblock', authMiddleware(['admin']), UserApi.unblockUser);  // Mantido como estava

// Rotas para recuperação de senha
userRouter.post('/recuperar', UserApi.recuperarSenha);  // Mantido como estava
userRouter.post('/verificar', UserApi.validateAccessCode);  // Mantido como estava

// Inicializar usuário administrador padrão
UserController.initializeAdmin();

module.exports = userRouter;
