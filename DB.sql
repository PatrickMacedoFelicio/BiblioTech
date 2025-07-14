create database Bibliotech;

use Bibliotech;

create table Cliente (
Id int primary key auto_increment,
Nome varchar(50),
CPF varchar(20),
Telefone varchar(500),
Email varchar(50),
Cep varchar(50),
Rua varchar(50),
Bairro varchar(50),
Numero varchar(50),
Estado varchar(50),
Cidade varchar(50),
DataNascimento date
);

create table Funcionario (
Id int primary key auto_increment,
Nome varchar(50),
CPF varchar(20),
Cargo varchar(50),
Telefone varchar(500),
Email varchar(50),
Cep varchar(50),
Rua varchar(50),
Bairro varchar(50),
Numero varchar(50),
Estado varchar(50),
Cidade varchar(50),
DataAdmissao date
);

create table Fornecedor(
Id int primary key auto_increment,
Nome varchar(50),
Cnpj varchar(20),
Telefone varchar(500),
Email varchar(50),
Cep varchar(50),
Rua varchar(50),
Bairro varchar(50),
Numero varchar(50),
Estado varchar(50),
Cidade varchar(50)
);

create table Genero (
Id int primary key auto_increment,
Nome varchar(50),
Descricao varchar(500)
);

create table Livro (
Id int primary key auto_increment,
Titulo varchar(1000),
Autor varchar(50),
Isbn varchar(50),
Editora varchar(50),
Sinopse varchar(2000),
AnoPublicacao date,
GeneroId int,
foreign key (GeneroId) references Genero(Id)
);

create table Estoque(
Id int primary key auto_increment,
Quantidade int,
CodigoDeBarras varchar(30) not null,
LivroId int,
foreign key (LivroId) references Livro(Id)
);

create table Emprestimo (
Id int primary key auto_increment,
DataInicio date,
DataPrevista date,
DataDevolucao date,
Status varchar(100),
ClienteId int,
FuncionarioId int,
foreign key (FuncionarioId) references Funcionario(Id),
foreign key (ClienteId) references Cliente(Id)
);

create table EmprestimoLivro(
Id int primary key auto_increment,
LivroId int,
EmprestimoId int,
foreign key (EmprestimoId) references Emprestimo(Id)
);

create table FornecedorLivro(
Id int primary key auto_increment,
LivroId int,
FornecedorId int,
foreign key (LivroId) references Livro(Id),
foreign key (FornecedorId) references Fornecedor(Id)
);


select * from cliente;