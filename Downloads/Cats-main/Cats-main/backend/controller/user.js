const user = require("../model/user");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const salts = 12;

class UserController {
  async createUser(name, email, password) {
    if (!name || !email || !password) {
      throw new Error("name, email e password são obrigatórios.");
    }

    const passwordHashed = await bcrypt.hash(password, salts);  // Adicione await

    const userValue = await user.create({
      name,
      email,
      password: passwordHashed,
      role: 'viewer' // Adicione um valor padrão ou receba o valor do body
    });

    return userValue;
  }

  async findUser(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }

    const userValue = await user.findByPk(id);

    if (!userValue) {
      throw new Error("Usuário não encontrado.");
    }

    return userValue;
  }

  async update(id, name, email, password) {
    const oldUser = await user.findByPk(id);
    if(email){
      const sameEmail = await user.findOne({ where: { email } });
      if (sameEmail && sameEmail.id !== id) {
        throw new Error("Email já cadastrado.");
      }
    }

    // achar a melhor forma de fazer isso daqui (ternário)
    const passwordHashed = bcrypt.hash(password, salts)
    oldUser.name = name || oldUser.name;
    oldUser.email = email || oldUser.email;
    oldUser.password = passwordHashed;

    oldUser.save();

    return oldUser;
  }

  async delete(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }
    const userValue = await this.findUser(id);
    userValue.destroy();

    return;
  }

  async findAll() {
    return user.findAll();
  }

  async login(email, password) {
    const userLogged = await user.findOne({ where: { email } });

    if(!userLogged){
      throw new Error("Email ou senha inválido. Tente novamente.")
    }

    const validPassword = bcrypt.compare(password, userLogged.password);

    if(!validPassword){
      throw new Error("Email ou senha inválido. Tente novamente.")
    }

    return jwt.sign(
      { id: userLogged.id, email: userLogged.email },
      'MeuSegredo123!'
    )
  }
}

module.exports = new UserController();