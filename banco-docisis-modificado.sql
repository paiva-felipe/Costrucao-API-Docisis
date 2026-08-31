CREATE DATABASE db_docisis;
USE db_docisis;

#-----------------------------------------------cargos-----------------------------------------------
#CREATE TABLE tbl_cargos (
#	id_cargos INTEGER PRIMARY KEY UNIQUE NOT NULL,
#    nivel_acesso_1 INTEGER NOT NULL,
#    nivel_acesso_2 INTEGER NOT NULL,
#    nome_cargo VARCHAR(100),
#    departamento VARCHAR(200),
#    jornada TIME NOT NULL
#);
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE tbl_cargos;
CREATE TABLE tbl_cargos (
	id_cargos INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nivel_acesso_1 INTEGER NOT NULL,
    nivel_acesso_2 INTEGER NOT NULL,
    nome_cargo VARCHAR(100),
    departamento VARCHAR(200),
    jornada TIME NOT NULL
);
SET FOREIGN_KEY_CHECKS = 1;

#-----------------------------------------------funcionarios-----------------------------------------------
#CREATE TABLE tbl_funcionarios (
#	cpf INTEGER PRIMARY KEY UNIQUE NOT NULL,
#    id_cargos INTEGER UNIQUE NOT NULL,
#    nome VARCHAR(200) NOT NULL,
#    email VARCHAR(100) NOT NULL,
#    
#    CONSTRAINT fk_id_cargos_funcionarios FOREIGN KEY (id_cargos)
#    REFERENCES tbl_cargos (id_Cargos)
#);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE tbl_funcionarios;
CREATE TABLE tbl_funcionarios (
	id_funcionario INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
	cpf VARCHAR(11) NOT NULL,
    id_cargos INTEGER UNIQUE NOT NULL,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL
);
SET FOREIGN_KEY_CHECKS = 1;

#-----------------------------------------------fornecedor-----------------------------------------------
#CREATE TABLE tbl_fornecedor (
#	id_fornecedor INTEGER PRIMARY KEY UNIQUE NOT NULL,
#    nome_fornecedor VARCHAR(200)
#);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE tbl_fornecedor;
CREATE TABLE tbl_fornecedor (
	id_fornecedor  INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome_fornecedor VARCHAR(200)
);

SET FOREIGN_KEY_CHECKS = 1;

#-----------------------------------------------nota fiscal-----------------------------------------------
#CREATE TABLE tbl_nota_fiscal (
#	id_nota_fiscal INTEGER PRIMARY KEY UNIQUE NOT NULL,
#  id_fornecedor INTEGER UNIQUE NOT NULL,
#  destinatario VARCHAR(100) NOT NULL,
#  remetente VARCHAR(100) NOT NULL,
#  servico VARCHAR(100) NOT NULL,
#  total FLOAT NOT NULL,
#  imposto FLOAT NOT NULL,
#   
#    CONSTRAINT fk_id_fornecedor_nota_fiscal FOREIGN KEY (id_fornecedor)
#    REFERENCES tbl_fornecedor (id_fornecedor)
#);
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE tbl_nota_fiscal;
CREATE TABLE tbl_nota_fiscal (
	id_nota_fiscal INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_fornecedor INTEGER UNIQUE NOT NULL,
    destinatario VARCHAR(100) NOT NULL,
    remetente VARCHAR(100) NOT NULL,
    servico VARCHAR(100) NOT NULL,
    total FLOAT NOT NULL,
    imposto FLOAT NOT NULL,
    
    CONSTRAINT fk_id_fornecedor_nota_fiscal FOREIGN KEY (id_fornecedor)
    REFERENCES tbl_fornecedor (id_fornecedor)
);
SET FOREIGN_KEY_CHECKS = 1;

#-----------------------------------------------pedidos-----------------------------------------------
#CREATE TABLE tbl_pedido (
	#  nome VARCHAR(200) NOT NULL,
 #   produto VARCHAR(100) NOT NULL
#);
DROP TABLE tbl_pedido;
CREATE TABLE tbl_pedido (
	id_pedido INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(200) NOT NULL,
    produto VARCHAR(100) NOT NULL
);

#-----------------------------------------------produtos-----------------------------------------------
#CREATE TABLE tbl_produtos (
#   marca VARCHAR(100) NOT NULL,
#   nome_fornecedor VARCHAR(200),
#   lote VARCHAR(30) NOT NULL,
#   tipo VARCHAR(100) NOT NULL,
#   validade DATE NULL
#);

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE tbl_produtos;

CREATE TABLE tbl_produtos (
    id_produtos INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    marca VARCHAR(100) NOT NULL,
    nome_fornecedor VARCHAR(200),
    lote VARCHAR(30) NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    validade DATE NULL
);

SET FOREIGN_KEY_CHECKS = 1;

#-----------------------------------------------entrada-----------------------------------------------
#CREATE TABLE tbl_mov_entrada (
#	id_mov_entrada INTEGER PRIMARY KEY UNIQUE NOT NULL,
#    id_nota_fiscal INTEGER UNIQUE NOT NULL,
#    cpf INTEGER UNIQUE NOT NULL,
#    horario TIME NOT NULL,
#    quantidade FLOAT NOT NULL,
#    preco FLOAT NOT NULL,
#    
#    CONSTRAINT fk_id_nota_fiscal_mov_entrada FOREIGN KEY (id_nota_fiscal)
#    REFERENCES tbl_nota_fiscal (id_nota_fiscal),
#    
#    CONSTRAINT fk_cpf_mov_entrada FOREIGN KEY (cpf)
#    REFERENCES tbl_funcionarios (cpf)
#    
#);

DROP TABLE tbl_mov_entrada;
CREATE TABLE tbl_mov_entrada (
id_mov_entrada INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
id_nota_fiscal INTEGER NOT NULL,
cpf VARCHAR(11) NOT NULL,
horario TIME NOT NULL,
quantidade FLOAT NOT NULL,
preco FLOAT NOT NULL
);

#-----------------------------------------------saida-----------------------------------------------
#CREATE TABLE tbl_mov_saida (
#	id_mov_saida INTEGER PRIMARY KEY UNIQUE NOT NULL,
#   id_pedido INTEGER UNIQUE NOT NULL,
#   cpf INTEGER UNIQUE NOT NULL,
#   horario TIME NOT NULL,
#   quantidade FLOAT NOT NULL,
#    preco FLOAT NOT NULL,
#    
#    CONSTRAINT fk_id_pedido_mov_saida FOREIGN KEY (id_pedido)
#    REFERENCES tbl_pedido (id_pedido),
#    
#    CONSTRAINT fk_cpf_mov_saida FOREIGN KEY (cpf)
#    REFERENCES tbl_funcionarios (cpf)
#);
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE tbl_mov_saida;
CREATE TABLE tbl_mov_saida (
	id_mov_saida INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_pedido INTEGER NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    horario TIME NOT NULL,
    quantidade FLOAT NOT NULL,
    preco FLOAT NOT NULL
);
SET FOREIGN_KEY_CHECKS = 1;

#-----------------------------------------------estoque-----------------------------------------------
#CREATE TABLE tbl_estoque (
#	id_produtos INTEGER UNIQUE NOT NULL,
#    id_mov_entrada INTEGER UNIQUE NULL,
#    id_mov_saida INTEGER UNIQUE NULL,
#    localizacao_fisica VARCHAR(200) NOT NULL,
#    quantidade FLOAT NOT NULL,
#    
#    CONSTRAINT fk_id_produtos_estoque FOREIGN KEY (id_produtos)
#    REFERENCES tbl_produtos (id_produtos),
#    
#    CONSTRAINT fk_id_mov_entrada_estoque FOREIGN KEY (id_mov_entrada)
#    REFERENCES tbl_mov_entrada (id_mov_entrada),
#    
#    CONSTRAINT fk_id_mov_saida_estoque FOREIGN KEY (id_mov_saida)
#    REFERENCES tbl_mov_saida (id_mov_saida)
#);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE tbl_estoque;
CREATE TABLE tbl_estoque (
	id_produtos INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_mov_entrada INTEGER UNIQUE NOT NULL,
    id_mov_saida INTEGER UNIQUE NOT NULL,
    localizacao_fisica VARCHAR(200) NOT NULL,
    quantidade FLOAT NOT NULL,
    
    CONSTRAINT fk_id_produtos_estoque FOREIGN KEY (id_produtos)
    REFERENCES tbl_produtos (id_produtos),
    
    CONSTRAINT fk_id_mov_entrada_estoque FOREIGN KEY (id_mov_entrada)
    REFERENCES tbl_mov_entrada (id_mov_entrada),
    
    CONSTRAINT fk_id_mov_saida_estoque FOREIGN KEY (id_mov_saida)
    REFERENCES tbl_mov_saida (id_mov_saida)
);
SET FOREIGN_KEY_CHECKS = 1;