const database = require('../config/database');

class UserModel {
    constructor() {
        this.model = database.db.define("users", {
            id: {
                type: database.db.Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            role: {
                type: database.db.Sequelize.ENUM('admin', 'viewer'),
                allowNull: false,
                defaultValue: 'viewer'
            },
            
            isBlocked: {
                type: database.db.Sequelize.BOOLEAN,
                defaultValue: false
            }
        });
    }

    async sync() {
        await this.model.sync();
    }
}

module.exports = new UserModel().model;
