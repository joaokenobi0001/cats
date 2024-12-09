const jwt = require('jsonwebtoken');
const UserController = require('../controller/user');
require('dotenv').config();  // Carrega as variáveis de ambiente
const bcrypt = require('bcrypt');

class UserApi {
    async tokenValidate(req, res) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Token não fornecido" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Token não fornecido" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Usando variável de ambiente
            const user = await UserController.findUser(decoded.id);
            if (user) {
                return res.status(200).json({ message: "Token válido", user });
            } else {
                return res.status(401).json({ message: "Token inválido" });
            }
        } catch (error) {
            return res.status(401).json({ message: "Token inválido", error: error.message });
        }
    }

    async getUser(req, res) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Token não fornecido" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Token não fornecido" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Usando variável de ambiente
            const user = await UserController.findUser(decoded.id);
            if (user) {
                return res.status(200).json({ user });
            } else {
                return res.status(401).json({ message: "Usuário não encontrado" });
            }
        } catch (e) {
            console.error(e);
            return res.status(400).json({ error: 'Erro ao buscar usuário', message: e.message });
        }
    }

    async getAllUser(req, res) {
        try {
            const users = await UserController.findAll();
            const userList = users.map(user => user.dataValues);
            console.log('Usuários encontrados:', userList); 
            res.setHeader('Content-Type', 'application/json');
            res.json({ user: userList });
        } catch (e) {
            console.error('Erro ao buscar todos os usuários:', e);
            res.status(400).send({ error: 'Erro ao buscar usuários' });
        }
    }

    async createUser(req, res) {
        const { name, email, password } = req.body;
        try {
            const user = await UserController.createUser(name, email, password, 'viewer');
            return res.status(201).send(user);
        } catch (e) {
            console.error(e);
            res.status(400).send({ error: 'Erro ao criar usuário', message: e.message });
        }
    }

    async createUserAdmin(req, res) {
        const { name, email, password } = req.body;
        try {
            const user = await UserController.createUser(name, email, password, 'admin');
            return res.status(201).send(user);
        } catch (e) {
            console.error(e);
            res.status(400).send({ error: 'Erro ao criar administrador', message: e.message });
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        try {
            const user = await UserController.update(Number(id), name, email, password);
            return res.status(200).send(user);
        } catch (e) {
            console.error(e);
            res.status(400).send({ error: 'Erro ao atualizar usuário', message: e.message });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            await UserController.delete(Number(id));
            return res.status(204).send();
        } catch (e) {
            console.error(e);
            res.status(400).send({ error: 'Erro ao deletar usuário', message: e.message });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const token = await UserController.login(email, password);
            return res.status(200).send({ token });
        } catch (e) {
            console.error(e);
            return res.status(400).send({ error: 'Falha no login', message: e.message });
        }
    }

    async blockUser(req, res) {
        const { id } = req.params; 
        const { requestingUser } = req.body;
        try {
            const blockedUser = await UserController.blockUser(id, requestingUser);
            res.send({ message: "Usuário bloqueado com sucesso", user: blockedUser });
        } catch (e) {
            console.error(e);
            res.status(400).send({ error: 'Erro ao bloquear usuário', message: e.message });
        }
    }

    async unblockUser(req, res) {
        const { id } = req.params; 
        const { requestingUser } = req.body;
        try {
            const unblockedUser = await UserController.unblockUser(id, requestingUser);
            res.send({ message: "Usuário desbloqueado com sucesso", user: unblockedUser });
        } catch (e) {
            console.error(e);
            res.status(400).send({ error: 'Erro ao desbloquear usuário', message: e.message });
        }
    }

    async recuperarSenha(req, res) {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email é obrigatório.' });

        try {
            const { user } = await UserController.recuperarSenha(email);
            const codigoAcesso = Math.floor(100000 + Math.random() * 900000).toString();
            await UserController.storeAccessCode(user.id, codigoAcesso);
            await UserController.sendAccessCode(email, codigoAcesso);
            res.status(200).json({ success: true, message: 'Código enviado com sucesso.' });
        } catch (e) {
            res.status(400).json({ error: 'Erro ao recuperar senha', message: e.message });
        }
    }

    async validateAccessCode(req, res) {
        const { email, codigoAcesso } = req.body;
        if (!email || !codigoAcesso) {
            return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
        }

        try {
            const user = await UserController.findUm(email);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }
            const accessCode = await UserController.validateAccessCode(user, codigoAcesso);
            res.status(200).json({ message: 'Código válido.', accessCode });
        } catch (e) {
            res.status(400).json({ error: 'Erro ao validar código', message: e.message });
        }
    }

    async atualizarSenha(req, res) {
        const { login, key, password } = req.body;
        if (!login || !key || !password) {
            return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
        }

        try {
            const userId = await UserController.findUm(login);
            if (!userId) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            await UserController.validateAccessCode(userId, key);

            const hashedPassword = await bcrypt.hash(password, 10);

            await UserController.updateSenha(userId, hashedPassword);

            return res.status(200).json({ success: true, message: 'Senha atualizada com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar senha:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
}

module.exports = new UserApi();

