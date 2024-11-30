const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// CRUD de usuários
router.get('/', UsuarioController.getAllUsuarios);
router.post('/', UsuarioController.createUsuario);
router.get('/:id', UsuarioController.getUsuario);
router.put('/:id', UsuarioController.updateUsuario);
router.delete('/:id', UsuarioController.deleteUsuario);

module.exports = router;