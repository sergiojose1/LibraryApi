const conexao = require("../datab/conexao");

class livrosModel {

    executaQuery(sql, parametros = "") {
        return new Promise((resolve, reject) => {
            conexao.query(sql, parametros, (error, resposta) => {
                if(error) {
                    return reject(error);
                }
                return resolve(resposta);
            });
        });
    }


    listar() {
        const sql = "SELECT + FROM biblioteca";
        return this.executaQuery(sql);
    }

    criar(novoLivro) {
        const sql = "INSERT INTO livros SET ?";
        return this.executaQuery(sql, novoLivro);
    }

    atualizar(livroAtualizado, id) {
        const sql = "UPDATE livros SET ? WHERE id = ?";
        return this.executaQuery(sql, [livroAtualizado, id]);
    }

    delete(livroDeletado, id) {
        const sql = "DELETE FROM livros WHERE id = ?";
        return this.executaQuery(sql, id);
    }
    
}

module.exports = new livrosModel();