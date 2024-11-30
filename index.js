const express = require("express");
const app = express();

const router = require("./rotas/index");
const conexao = require("./datab/conexao");
const tabelas = require("./datab/tabelas");

const port = 3000;


tabelas.init(conexao);

router(app);


app.listen(3000, (error) => {
    if(error) {
        console.log("erro");
        return;
    }
    console.log("legal")
});
