const sqlite3 = require('sqlite3').verbose();

// Conectar ao banco de dados
const db = new sqlite3.Database('./library.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

module.exports = db;

db.serialize(() => {
    // Criar tabela de livros
    db.run(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            genre TEXT NOT NULL,
            year INTEGER NOT NULL
        )
    `);

    // Criar tabela de usuários
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            address TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL
        )
    `);

    // Criar tabela de empréstimos
    db.run(`
        CREATE TABLE IF NOT EXISTS loans (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            bookId INTEGER NOT NULL,
            loanDate TEXT NOT NULL,
            dueDate TEXT NOT NULL,
            returned INTEGER DEFAULT 0,
            FOREIGN KEY (userId) REFERENCES users (id),
            FOREIGN KEY (bookId) REFERENCES books (id)
        )
    `);

    console.log('Tabelas criadas (se não existiam).');
});