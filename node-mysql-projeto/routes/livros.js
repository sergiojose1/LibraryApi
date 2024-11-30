const express = require('express');
const router = express.Router();
const LivroController = require('../controllers/LivroController');

// CRUD de livros
router.get('/', LivroController.getAllLivros);
router.post('/', LivroController.createLivro);
router.get('/:id', LivroController.getLivro);
router.put('/:id', LivroController.updateLivro);
router.delete('/:id', LivroController.deleteLivro);

module.exports = router;