const db = require('../config/database').db;

const getAllUsuarios = (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
};

const createUsuario = (req, res) => {
    const { nome, email, telefone } = req.body;
    db.query(
        'INSERT INTO usuarios (nome, email, telefone) VALUES (?, ?, ?)',
        [nome, email, telefone],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ id: result.insertId, nome, email, telefone });
        }
    );
};

const getUsuario = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.status(200).json(result[0]);
    });
};

const updateUsuario = (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    db.query(
        'UPDATE usuarios SET nome = ?, email = ?, telefone = ? WHERE id = ?',
        [nome, email, telefone, id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
            res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        }
    );
};

const deleteUsuario = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    });
};

module.exports = { getAllUsuarios, createUsuario, getUsuario, updateUsuario, deleteUsuario };
