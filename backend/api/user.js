const jwt = require('jsonwebtoken');
const UserController = require('../controller/user');
require('dotenv').config();
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
            const decoded = jwt.verify(token, 'MeuSegredo123!'); // Verifique o token
            const user = await UserController.findUser(decoded.id); // Encontre o usuário com base no ID do token
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
            const decoded = jwt.verify(token, 'MeuSegredo123!'); // Verifique o token
            const user = await UserController.findUser(decoded.id); // Encontre o usuário com base no ID do token
            if (user) {
                return res.status(200).json({ user });
            } else {
                return res.status(401).json({ message: "Usuário não encontrado" });
            }
        } catch (e) {
            console.error(e);
            return res.status(400).json({ error: 'Deu erro', message: e.message });
        }
    }

        async getAllUser(req, res) {
            try {
                const users = await UserController.findAll();
                // Extrair apenas os dataValues dos usuários
                const userList = users.map(user => user.dataValues);
                console.log('Usuários encontrados:', userList); // Log para depuração
                res.setHeader('Content-Type', 'application/json'); // Defina o cabeçalho Content-Type
                res.json({ user: userList });
            } catch (e) {
                console.error('Erro ao buscar todos os usuários:', e);
                res.status(400).send({ error: 'Deu erro' });
            }
        }
    

    async createUser(req, res) {
        const { name, email, password } = req.body; 


        try {
            const user = await UserController.createUser(name, email, password, 'viewer');
            return res.status(201).send(user);
        } catch (e) {
            console.error(e);
            res.status(400).send({ error: e.message });
        }
    }

    async createUserAdmin(req, res) {
        const { name, email, password } = req.body; 
 

        try {
            const user = await UserController.createUser(name, email, password, 'admin');
            return res.status(201).send(user);
        } catch (e) {
            console.error(e);
            res.status(400).send({ error: e.message });
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
            res.status(400).send({ error: e.message });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
     

        try {
            await UserController.delete(Number(id));
            return res.status(204).send();
        } catch (e) {
            console.error(e);
            res.status(400).send({ error: e.message });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
    
        try {
            const token = await UserController.login(email, password);
            return res.status(200).send({ token });
        } catch (e) {
            console.error(e);
            return res.status(400).send({ error: e.message });
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
            res.status(400).send({ error: e.message });
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
            res.status(400).send({ error: e.message });
        }
    }

    
    async recuperarSenha(req, res) {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email é obrigatório.' });

        try {
            // Verificar se o usuário existe
            const { user } = await UserController.recuperarSenha(email);

            // Gerar código de acesso
            const codigoAcesso = Math.floor(100000 + Math.random() * 900000).toString();

            // Armazenar o código no banco de dados
            await UserController.storeAccessCode(user.id, codigoAcesso);

            // Enviar o código para o email do usuário
            await UserController.sendAccessCode(email, codigoAcesso);

            res.status(200).json({ message: 'Código enviado com sucesso.' });
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    async validateAccessCode(req, res) {
        const { userId, codigoAcesso } = req.body;
        if (!userId || !codigoAcesso) {
            return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
        }

        try {
            const accessCode = await UserController.validateAccessCode(Number(userId), codigoAcesso);
            res.status(200).json({ message: 'Código válido.', accessCode });
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }


    async atualizarSenha(req, res) {
        const { email, newPassword } = req.body;
    
        // Verificar se email e nova senha foram enviados
        if (!email || !newPassword) {
          return res.status(400).json({ error: 'Email e nova senha são obrigatórios' });
        }
    
        try {
          // Buscar o ID do usuário pelo email
          const userId = await UserController.findUm(email);
    
          if (!userId) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
          }
    
          // Criptografar a nova senha
          const hashedPassword = await bcrypt.hash(newPassword, 10);
    
          // Atualizar a senha usando o ID
          await UserController.updateSenha(userId, hashedPassword);
    
          return res.status(200).json({ message: 'Senha atualizada com sucesso' });
        } catch (error) {
          console.error('Erro ao atualizar senha:', error);
          return res.status(500).json({ error: 'Erro interno do servidor' });
        }
      }
}

module.exports = new UserApi();
