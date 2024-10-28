const database = require("../config/database");

class Gatos {
  constructor() {
    this.model = database.db.define("gatos", {
      id: {
        type: database.db.Sequelize.STRING(36), // Exemplo: UUIDs geralmente têm 36 caracteres
        primaryKey: true,
        allowNull: false
      },
      url: {
        type: database.db.Sequelize.STRING(255), // Aumenta o tamanho para 255 caracteres
        allowNull: false
      },
      descricao: {
        type: database.db.Sequelize.STRING(500), // Aumenta o tamanho para 500 caracteres
        allowNull: true 
      },
      nome: {
        type: database.db.Sequelize.STRING(100), // Aumenta o tamanho para 100 caracteres
        allowNull: false
      },
      origem: {
        type: database.db.Sequelize.STRING(100), // Aumenta o tamanho para 100 caracteres
        allowNull: true
      },
      temperamento: {
        type: database.db.Sequelize.STRING(100), // Aumenta o tamanho para 100 caracteres
        allowNull: true
      },
      nivel_energia: {
        type: database.db.Sequelize.INTEGER,
        allowNull: true
      },
      vida_media: {
        type: database.db.Sequelize.STRING(50), // Aumenta o tamanho para 50 caracteres
        allowNull: true
      },
      adaptabilidade: {
        type: database.db.Sequelize.INTEGER,
        allowNull: true
      },
      inteligencia: {
        type: database.db.Sequelize.INTEGER,
        allowNull: true
      }
    });
  }
}

module.exports = new Gatos().model;
