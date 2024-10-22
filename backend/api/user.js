const UserController = require('../controller/user');

class UserApi {
    async findUser(req, res) {
        try {
            const users = await UserController.findAll();
            res.send({ users });
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
        const requestingUser = req.user;

        try {
            await UserController.delete(Number(id), requestingUser);
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
            res.send({ token });
        } catch (e) {
            console.error(e);
            res.status(400).send({ error: e.message });
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
