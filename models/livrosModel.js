const conexao = require("../datab/conexao");

class livrosModel {
    listar() {
        const sql = "SELECT + FROM biblioteca";
        return conexao.query(sql, {}, (error, reposta) => {
            if(error) {
                console.log("error no listar");
                return;
            }
            console.log("show");
        });
    }
}

module.exports = new livrosModel();