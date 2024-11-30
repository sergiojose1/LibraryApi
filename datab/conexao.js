const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345",
    database: "biblioteca",
    multipleStatements: true
});

module.exports = conexao;