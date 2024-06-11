--11/06
CREATE TABLE IF NOT EXISTS imagem_produto (
    id_imagem INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_produto INT,
    caminho VARCHAR(255),
    FOREIGN KEY(id_produto) REFERENCES produtos(id_produto)
);