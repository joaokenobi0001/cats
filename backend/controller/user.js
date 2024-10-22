const User = require("../model/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salts = 12;

class UserController {
    async createUser(name, email, password, role) {
        if (!name || !email || !password) {
            throw new Error("name, email e password são obrigatórios.");
        }

        const passwordHashed = await bcrypt.hash(password, salts);
        const userValue = await User.create({
            name,
            email,
            password: passwordHashed,
            role
        });

        return userValue;
    }

    async findUser(id) {
        if (id === undefined) {
            throw new Error("Id é obrigatório.");
        }
    
        const userValue = await User.findByPk(id);
        if (!userValue) {
            throw new Error("Usuário não encontrado.");
        }
    
        if (userValue.isBlocked) {
            throw new Error("Usuário bloqueado.");
        }
    
        return userValue;
    }
    
    async update(id, name, email, password, requestingUser) {
        const oldUser = await User.findByPk(id);
    
        if (!oldUser) {
            throw new Error("Usuário não encontrado.");
        }
    
        // Verifica se o usuário que está tentando editar é o mesmo ou um administrador
        if (requestingUser.role !== 'admin' && requestingUser.id !== id) {
            throw new Error("Você não tem permissão para editar este usuário.");
        }
    
        // Verifica se o usuário está bloqueado
        if (oldUser.isBlocked) {
            throw new Error("Usuário bloqueado.");
        }
    
        // Atualiza os dados do usuário
        oldUser.name = name || oldUser.name;
        oldUser.email = email || oldUser.email;
    
        if (password) {
            oldUser.password = await bcrypt.hash(password, salts);
        }
    
        await oldUser.save();
        return oldUser;
    }
    
    
    
    async delete(id, requestingUser) {
        if (id === undefined) {
            throw new Error("Id é obrigatório.");
        }

        const userValue = await this.findUser(id);

        if (requestingUser.role !== 'admin' && requestingUser.id !== id) {
            throw new Error("Você não tem permissão para deletar este usuário.");
        }

        await userValue.destroy();
    }

    async findAll() {
        return User.findAll();
    }

    async login(email, password) {
        const userLogged = await User.findOne({ where: { email } });

        if (!userLogged) {
            throw new Error("Email ou senha inválido. Tente novamente.");
        }

        const validPassword = await bcrypt.compare(password, userLogged.password);
        if (!validPassword || userLogged.isBlocked) {
            throw new Error("Email ou senha inválido. Tente novamente.");
        }

        return jwt.sign(
            { id: userLogged.id, email: userLogged.email, role: userLogged.role },
            'MeuSegredo123!'
        );
    }

    async isAdmin(user) {
        return user && user.role === 'admin';
    }

    async blockUser(id, requestingUser) {
        if (!this.isAdmin(requestingUser)) {
            throw new Error("Apenas administradores podem bloquear usuários.");
        }

        const user = await this.findUser(id);
        user.isBlocked = true;
        await user.save();
    }

    async unblockUser(id, requestingUser) {
        if (!this.isAdmin(requestingUser)) {
            throw new Error("Apenas administradores podem desbloquear usuários.");
        }

        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        user.isBlocked = false;
        await user.save();
    }
}

module.exports = new UserController();
