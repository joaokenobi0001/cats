const { Sequelize } = require("sequelize");

class Database {
    constructor() {
        this.init();
    }

    init(){
        this.db = new Sequelize({
            database: "api-rick-and-morty",
            host: "localhost",
            username: "root",
            password: "8525",
            dialect: "mysql"
        })
    }
}

module.exports = new Database();