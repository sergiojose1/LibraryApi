const db = require('../config/database').db;

const getAllLivros = (req, res) => {
    db.query('SELECT * FROM livros', (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
};

const createLivro = (req, res) => {
    const { titulo, autor, genero, ano_publicacao } = req.body;
    db.query(
        'INSERT INTO livros (titulo, autor, genero, ano_publicacao) VALUES (?, ?, ?, ?)',
        [titulo, autor, genero, ano_publicacao],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ id: result.insertId, titulo, autor, genero, ano_publicacao });
        }
    );
};

const getLivro = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM livros WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: 'Livro não encontrado' });
        res.status(200).json(result[0]);
    });
};

const updateLivro = (req, res) => {
    const { id } = req.params;
    const { titulo, autor, genero, ano_publicacao } = req.body;
    db.query(
        'UPDATE livros SET titulo = ?, autor = ?, genero = ?, ano_publicacao = ? WHERE id = ?',
        [titulo, autor, genero, ano_publicacao, id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Livro não encontrado' });
            res.status(200).json({ message: 'Livro atualizado com sucesso' });
        }
    );
};

const deleteLivro = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM livros WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Livro não encontrado' });
        res.status(200).json({ message: 'Livro deletado com sucesso' });
    });
};

module.exports = { getAllLivros, createLivro, getLivro, updateLivro, deleteLivro };
