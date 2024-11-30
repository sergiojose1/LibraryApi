const { Router } = require("express");
const  router = Router();
const livroController = require("../controllers/livroController")

//pegar 

router.get("/livros", (req, res) => {
    const resposta = livroController.buscar();
    res.send(resposta);
});

router.post("/livros", (req, res) => {
    const resposta = livroController.criar();
    res.send(resposta);
});

router.put("/livros/:id", (req, res) => {
    const { id } = req.params;
    const resposta = livroController.atualizar(id);
    res.send(resposta);
});

router.delete("/livros/:id", (req, res) => {
    const { id } = req.params;
    const resposta = livroController.deletar(id);
    res.send("O livro foi deletado" + id );
});

module.exports = router;