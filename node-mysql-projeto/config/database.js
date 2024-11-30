const mysql = require('mysql2');

// Crie uma conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',        // Host do MySQL (geralmente localhost)
  user: 'root',             // Nome de usuário do MySQL
  password: '12345',    // Sua senha do MySQL
  database: 'biblioteca'    // Nome do banco de dados
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados com sucesso!');
});

module.exports = connection;
