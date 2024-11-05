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
    
    async update(id) {
        await User.findByPk(id);
    }
    
    async delete(id) {
        if (id === undefined) {
            throw new Error("Id é obrigatório.");
        }

        const userValue = await this.findUser(id);

        await userValue.destroy();
    }

    async findAll() {
            try {
                const users = await User.findAll({
                    attributes: { exclude: ['password'] }
                });
                return users;
            } catch (e) {
                console.error('Erro ao buscar usuários:', e);
                throw new Error('Erro ao buscar usuários');
            }
        }
    
    async login(email, password) {
        if (email === undefined || password === undefined) {
            throw new Error("Email e senha são obrigatórios.");
        }

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
            'MeuSegredo123!', { expiresIn: 60 * 60 }
        );
    }

   
    async blockUser(id) {
       

        const user = await this.findUser(id);
        user.isBlocked = true;
        await user.save();
    }

    async unblockUser(id) {

        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        user.isBlocked = false;
        await user.save();
    }
}

module.exports = new UserController();
