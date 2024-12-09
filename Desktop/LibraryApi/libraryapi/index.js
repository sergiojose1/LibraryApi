const express = require('express');
const app = express();

const livroRoutes = require('./books'); // Importando rotas de livros

app.use(express.json()); // Middleware para JSON

app.get('/', (req, res) => {
  res.send('API Biblioteca funcionando!');
});

// Rotas para livros (em português)
app.use('/livros', livroRoutes);

let usuarios = []; // Lista para usuários
let emprestimos = []; // Lista para empréstimos

// Rotas de usuários (em português)
app.post('/usuarios', (req, res) => {
  const usuario = req.body;
  usuarios.push(usuario);
  res.status(201).send(usuario);
});

app.get('/usuarios', (req, res) => {
  res.send(usuarios);
});

app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuarioAtualizado = req.body;
  usuarios = usuarios.map((usuario, index) => (index === id ? usuarioAtualizado : usuario));
  res.send(usuarioAtualizado);
});

app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  usuarios = usuarios.filter((_, index) => index !== id);
  res.status(204).send();
});

// Rotas de empréstimos (em português)
app.post('/emprestimos', (req, res) => {
  const { usuarioId, livroId, dataEmprestimo, dataDevolucao } = req.body;
  const emprestimo = { usuarioId, livroId, dataEmprestimo, dataDevolucao, devolvido: false };
  emprestimos.push(emprestimo);
  res.status(201).send(emprestimo);
});

app.get('/emprestimos', (req, res) => {
  res.send(emprestimos);
});

app.put('/emprestimos/:id/devolver', (req, res) => {
  const id = parseInt(req.params.id);
  emprestimos[id].devolvido = true;
  res.send(emprestimos[id]);
});

app.get('/relatorios/livros-mais-emprestados', (req, res) => {
  const livroContagem = {};
  emprestimos.forEach(emprestimo => {
    if (!livroContagem[emprestimo.livroId]) {
      livroContagem[emprestimo.livroId] = 0;
    }
    livroContagem[emprestimo.livroId]++;
  });

  const maisEmprestados = Object.entries(livroContagem)
    .sort((a, b) => b[1] - a[1])
    .map(([livroId, contagem]) => ({ livroId, contagem }));

  res.send(maisEmprestados);
});

app.get('/relatorios/usuarios-pendentes', (req, res) => {
  const pendentes = emprestimos.filter(emprestimo => !emprestimo.devolvido);
  res.send(pendentes);
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`http://localhost:${PORT}/livros`);
  console.log(`http://localhost:${PORT}/usuarios`);
});