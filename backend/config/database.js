const { Sequelize } = require("sequelize");

class Database {
    constructor() {
        this.init();
    }

    init(){
        this.db = new Sequelize({
            database: "api-cats",
            host: "localhost",
            username: "root",
            password: "",
            dialect: "mysql"
        })
    }
}

module.exports = new Database();