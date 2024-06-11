--11/06
CREATE TABLE IF NOT EXISTS imagem_produto (
    id_imagem INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_produto INT,
    caminho VARCHAR(255),
    FOREIGN KEY(id_produto) REFERENCES produtos(id_produto)
);

--11/06
CREATE TABLE IF NOT EXISTS categorias(
    id_categoria INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name_categoria VARCHAR(255)
);

--11/06
ALTER TABLE produtos ADD id_categoria INT;
UPDATE produtos SET id_categoria = 1 ;
ALTER TABLE produtos ADD CONSTRAINT fk_produto_categoria FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria);