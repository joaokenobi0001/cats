const User = require("../model/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const AccessCode = require("../model/acessCode");
require('dotenv').config();

const salts = 12;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

    async initializeAdmin() {
        try {
            console.log('Verificando usuário admin...');
            const adminEmail = process.env.ADMIN_EMAIL;

            const adminExists = await User.findOne({ where: { email: adminEmail } });
            if (adminExists) {
                console.log('Admin já existe:', adminEmail);
                return;
            }

            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salts);
            const adminUser = await User.create({
                name: process.env.ADMIN_NAME,
                email: adminEmail,
                password: hashedPassword,
                role: process.env.ADMIN_ROLE,
            });

            console.log('Usuário admin criado com sucesso:', adminUser.email);
        } catch (error) {
            console.error('Erro ao criar usuário admin:', error.message);
        }
    }

    async findUser(id, isDelete = false) {
        if (!id) {
            throw new Error("Id é obrigatório.");
        }

        const userValue = await User.findByPk(id);
        if (!userValue) {
            throw new Error("Usuário não encontrado.");
        }

        if (!isDelete && userValue.isBlocked) {
            throw new Error("Usuário bloqueado.");
        }

        return userValue;
    }

    async delete(id) {
        if (!id) {
            throw new Error("Id é obrigatório.");
        }

        const userValue = await this.findUser(id, true);

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
        if (!email || !password) {
            throw new Error("Email e senha são obrigatórios.");
        }

        const userLogged = await User.findOne({ where: { email } });

        if (!userLogged) {
            throw new Error("Email ou senha inválido. Tente novamente.");
        }

        if (userLogged.isBlocked) {
            throw new Error("Sua conta está bloqueada. Entre em contato com o suporte.");
        }

        const validPassword = await bcrypt.compare(password, userLogged.password);
        if (!validPassword) {
            throw new Error("Email ou senha inválido. Tente novamente.");
        }

        return jwt.sign(
            { id: userLogged.id, email: userLogged.email, role: userLogged.role },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 } // 1 hora
        );
    }

    async sendAccessCode(email, codigoAcesso) {
        if (!email || !codigoAcesso) throw new Error('Email e código são obrigatórios.');

        const msg = {
            to: email,
            from: process.env.SENDGRID_SENDER,
            subject: 'Seu Código de Acesso',
            text: `Seu código de acesso é: ${codigoAcesso}`,
            html: `<strong>Seu código de acesso é: ${codigoAcesso}</strong>`,
        };

        try {
            await sgMail.send(msg);
            console.log(`E-mail enviado para: ${email}`);
        } catch (error) {
            console.error(`Erro ao enviar e-mail: ${error.message}`);
            throw new Error('Falha ao enviar o e-mail.');
        }
    }

    async storeAccessCode(userId, codigoAcesso) {
        const expiration = new Date();
        expiration.setMinutes(expiration.getMinutes() + 10);

        await AccessCode.create({
            userId,
            codigoAcesso,
            expiresAt: expiration,
        });
    }

    async validateAccessCode(userId, codigoAcesso) {
        const accessCode = await AccessCode.findOne({ where: { userId, codigoAcesso } });
        if (!accessCode) {
            console.error(`Código inválido para userId: ${userId}`);
            throw new Error('Código inválido.');
        }

        if (new Date() > accessCode.expiresAt) {
            console.error(`Código expirado para userId: ${userId}`);
            throw new Error('Código expirado.');
        }

        console.log(`Código válido para userId: ${userId}`);
        return accessCode;
    }
}

module.exports = new UserController();