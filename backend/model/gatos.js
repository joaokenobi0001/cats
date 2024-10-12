const database = require("../config/database");

class Gatos {
  constructor() {
    this.model = database.db.define("gatos", {
      id: {
        type: database.db.Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      url: {
        type: database.db.Sequelize.STRING,
        allowNull: false
      },
      descricao: {
        type: database.db.Sequelize.STRING,
        allowNull: true 
      }
    });
  }
}

module.exports = new Gatos().model;
