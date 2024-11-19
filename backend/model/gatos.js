const database = require("../config/database");

class Gatos {
  constructor() {
    this.model = database.db.define("gatos", {
      id: {
        type: database.db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      url: {
        type: database.db.Sequelize.STRING(255),
        allowNull: false
      },
      descricao: {
        type: database.db.Sequelize.STRING(500),
        allowNull: true 
      },
      nome: {
        type: database.db.Sequelize.STRING(100),
        allowNull: false
      },
      origem: {
        type: database.db.Sequelize.STRING(100),
        allowNull: true
      },
      temperamento: {
        type: database.db.Sequelize.STRING(100),
        allowNull: true
      },
      nivel_energia: {
        type: database.db.Sequelize.INTEGER,
        allowNull: true
      },
      vida_media: {
        type: database.db.Sequelize.STRING(50),
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
