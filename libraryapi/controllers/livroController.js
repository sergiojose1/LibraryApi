const livrosModel = require("../models/livrosModel");

class livroController {
    buscar(req, res) {
        const listaLivros = livrosModel.buscar();
        return listaLivros
            .then(livros => res.status(200).json(livros))
            .catch(error => res.status(400).json(error.message));
    }
    criar(req, res) {
        const novoLivro = req.body;
        const livro = livrosModel.criar(novoLivro);
        return livro
            .then(livroCriado => res.status(201).json(livroCriado))
            .catch(error => res.status(400).json(error.message));
    }
    atualizar(req, res) {
        const { id } = req.params;
        const livroAtualizado = req.body;
        const livro = livrosModel.atualizar(livroAtualizado, id);
        return livro
            .then((resultLivroAtualizado) => res.status(200).json(resultLivroAtualizado))
            .catch((error) => res.status(400).json(error.message))
    }
    deletar(req, res) {
        const { id } = req.params;
        const livro = livroController.delete(id);
        return livro
            .then((resultLivroDeletado) => res.status(200).json(resultLivroDeletado))
            .catch((error) => res.status(400).json(error.message))
    }
}

module.exports = new livroController();

