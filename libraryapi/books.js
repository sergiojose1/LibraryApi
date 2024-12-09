const db = require('./database');

const express = require('express');
const router = express.Router();

// Criar um novo livro
router.post('/', (req, res) => {
  const { titulo, autor, genero, ano } = req.body; // Extrai os dados do corpo da requisição
  const query = `INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)`;

  db.run(query, [titulo, autor, genero, ano], function (err) {
    if (err) {
      console.error('Erro ao adicionar livro:', err.message);
      res.status(500).send('Erro ao adicionar livro.');
    } else {
      res.status(201).send({ id: this.lastID, titulo, autor, genero, ano });
    }
  });
});

// Listar todos os livros
router.get('/', (req, res) => {
  const query = `SELECT id, title AS titulo, author AS autor, genre AS genero, year AS ano FROM books`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar livros:', err.message);
      res.status(500).send('Erro ao buscar livros.');
    } else {
      res.send(rows);
    }
  });
});

// Atualizar um livro por ID
router.put('/:id', (req, res) => {
  const { titulo, autor, genero, ano } = req.body; // Extrai os dados atualizados
  const query = `UPDATE books SET title = ?, author = ?, genre = ?, year = ? WHERE id = ?`;

  db.run(query, [titulo, autor, genero, ano, req.params.id], function (err) {
    if (err) {
      console.error('Erro ao atualizar livro:', err.message);
      res.status(500).send('Erro ao atualizar livro.');
    } else {
      res.send({ id: req.params.id, titulo, autor, genero, ano });
    }
  });
});

// Deletar um livro por ID
router.delete('/:id', (req, res) => {
  const query = `DELETE FROM books WHERE id = ?`;

  db.run(query, [req.params.id], function (err) {
    if (err) {
      console.error('Erro ao deletar livro:', err.message);
      res.status(500).send('Erro ao deletar livro.');
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;