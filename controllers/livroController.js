const livrosModel = require("../models/livrosModel");

class livroController {
    buscar() {
        return livrosModel.listar();
    }
    criar(novoLivro) {
        return "Criando";
    }
    atualizar(atualizarLivro, id) {
        return "atualizando livro" + id;
    }
    deletar(id) {
        return "deletando livro" + id;
    }
}

module.exports = new livroController();
