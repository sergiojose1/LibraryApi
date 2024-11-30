class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarTabelaBiblioteca();
    }

    criarTabelaBiblioteca() {
        const sql = `
            CREATE TABLE IF NOT EXISTS livros (
            id INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            autor VARCHAR(255) NOT NULL,
            genero VARCHAR(100) NOT NULL,
            ano_publicacao INT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            telefone VARCHAR(20)
            );

            CREATE TABLE IF NOT EXISTS  emprestimos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_usuario INT,
            id_livro INT,
            data_emprestimo DATE,
            data_devolucao DATE,
            FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
            FOREIGN KEY (id_livro) REFERENCES livros(id)
            );

        `;
        this.conexao.query(sql, (error) => {
            if(error) {
                console.log("algo inesperado aconteceu");
                console.log(error.message());
                return;
            }
            console.log("criada com sucesso!");
        });
    }
}

module.exports = new Tabelas();