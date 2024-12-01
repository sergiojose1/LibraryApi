const { Router } = require("express");
const  router = Router();
const livroController = require("../controllers/livroController")

//pegar 

router.get("/livros", livroController.buscar);

router.post("/livros", livroController.criar);

router.put("/livros/:id", livroController.atualizar);

router.delete("/livros/:id", livroController.deletar);

module.exports = router;