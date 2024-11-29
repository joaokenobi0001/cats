const User = require("../model/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salts = 12;
const sgMail = require('@sendgrid/mail');
const AccessCode = require("../model/acessCode"); 
require('dotenv').config();
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
          const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
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
        if (id === undefined) {
            throw new Error("Id é obrigatório.");
        }
    
        const userValue = await User.findByPk(id);
        if (!userValue) {
            throw new Error("Usuário não encontrado.");
        }
    
        if (!isDelete  && userValue.isBlocked) {
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

        async findUm(email) {
            try {
              const user = await User.findOne({
                where: { email },
                attributes: ['id'], // Apenas retorna o ID do usuário
              });
        
              if (!user) {
                throw new Error('Usuário não encontrado');
              }
        
              return user.id; // Retorna apenas o ID
            } catch (error) {
              console.error('Erro ao buscar ID do usuário:', error);
              throw new Error('Erro ao buscar usuário');
            }
          }
        
          async updateSenha(userId, hashedPassword) {
            try {
              await User.update({ password: hashedPassword }, { where: { id: userId } });
              console.log(`Senha atualizada para o usuário com ID: ${userId}`);
            } catch (error) {
              console.error('Erro ao atualizar senha no banco de dados:', error);
              throw new Error('Erro ao atualizar senha');
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

    
    async recuperarSenha(email) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('Email inválido.');
        return { user };
    }

    async sendAccessCode(email, codigoAcesso) {
        if (!email) throw new Error('O email é obrigatório.');
    
        const msg = {
            to: email, // E-mail do destinatário
            from: 'eduardohansen10@gmail.com', // Use um e-mail válido (melhor, do domínio autorizado no SendGrid)
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
        expiration.setMinutes(expiration.getMinutes() + 10); // Código válido por 10 minutos

        await AccessCode.create({
            userId,
            codigoAcesso,
            expiresAt: expiration,
        });
    }

    async validateAccessCode(userId, codigoAcesso) {
            const accessCode = await AccessCode.findOne({ where: { userId, codigoAcesso } });
            if (!accessCode) throw new Error('Código inválido.');

            if (new Date() > accessCode.expiresAt) throw new Error('Código expirado.');

            return accessCode;
        }
    }

module.exports = new UserController();
