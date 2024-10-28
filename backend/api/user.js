const jwt = require('jsonwebtoken');
const UserController = require('../controller/user');

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
            const user = await UserController.findAll();
            res.send({ user });
        } catch (e) {
            console.error(e);
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
        const requestingUser = req.user;

        try {
            const user = await UserController.update(Number(id), name, email, password, requestingUser);
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

    
}

module.exports = new UserApi();
