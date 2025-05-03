const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Conexão com o MongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://glm2:sx03obwW3VBLIRpQ@cluster0.yhw3m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const Cliente = require("./models/Cliente");
const Produto = require("./models/Produto");
const Pedido = require("./models/Pedido");


//para cadastrar um cliente
app.get("/clientes/cadastrar", function(req, res){
    res.render('cliente/cadastrar')
    });

// Rota para mostrar relatório de clientes
app.get('/clientes/', async function(req, res){
    const status = req.query.s;
    const clientes = await Cliente.find(); // Buscar apenas os clientes, sem popular produto
    res.render('cliente/relatorio', { status, clientes });
});

// Rota para cadastrar cliente (POST)
app.post('/clientes', async function(req, res){
    const { cpf, nome, email } = req.body;  // Campos conforme modelo Cliente.js
    const novoCliente = new Cliente({
        cpf,
        nome,
        email
    });
    await novoCliente.save();
    res.redirect('/clientes?s=1'); 
});


// Rota para exibir detalhes de um cliente
app.get('/clientes/:cpf', async function(req, res){
    const cpf = req.params.cpf; 
    const cliente = await Cliente.findOne({ cpf }).populate('produto');  // Popula os dados do produto
    res.render('cliente/detalhe', { cliente });
});

// Página inicial
app.get("/", function (req, res){
    const casa = {
        mensagem: "Bem-vindo ao nosso site!",
    };
    res.render("pagInicial/home", casa);
});

// Rota para exibir formulário de edição de cliente
app.get('/clientes/editar/:cpf', async function(req, res){
    const cpf = req.params.cpf;
    const cliente = await Cliente.findOne({ cpf });
    if (!cliente) {
        return res.status(404).send('Cliente não encontrado');
    }
    res.render('cliente/editar', { cliente });
});

// Rota para processar edição de cliente (POST)
app.post('/clientes/editar/:cpf', async function(req, res){
    const cpf = req.params.cpf;
    const { nome, email, idade, endereco } = req.body;
    try {
        await Cliente.updateOne({ cpf }, { nome, email, idade, endereco });
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).send('Erro ao atualizar cliente');
    }
});

// Rotas para produtos

// Página para cadastrar produto
app.get('/produtos/cadastrar', function(req, res){
    res.render('produto/cadastrar');
});

// Rota para cadastrar produto (POST)
app.post('/produtos', async function(req, res){
    const { nome, descricao, preco } = req.body;
    const novoProduto = new Produto({
        nome,
        descricao,
        preco
    });
    await novoProduto.save();
    res.redirect('/produtos?s=1');
});

// Rota para mostrar relatório de produtos
app.get('/produtos', async function(req, res){
    const status = req.query.s;
    const produtos = await Produto.find();
    res.render('produto/relatorio', { status, produtos });
});

// Rota para exibir detalhes de um produto
app.get('/produtos/:id', async function(req, res){
    const id = req.params.id;
    const produto = await Produto.findById(id);
    res.render('produto/detalhe', { produto });
});

// Rota para exibir formulário de edição de produto
app.get('/produtos/editar/:id', async function(req, res){
    const id = req.params.id;
    const produto = await Produto.findById(id);
    if (!produto) {
        return res.status(404).send('Produto não encontrado');
    }
    res.render('produto/editar', { produto });
});

// Rota para processar edição de produto (POST)
app.post('/produtos/editar/:id', async function(req, res){
    const id = req.params.id;
    const { nome, descricao, preco } = req.body;
    try {
        await Produto.updateOne({ _id: id }, { nome, descricao, preco });
        res.redirect('/produtos');
    } catch (error) {
        res.status(500).send('Erro ao atualizar produto');
    }
});

// Rota para excluir cliente (POST)
app.post('/clientes/excluir/:cpf', async function(req, res){
    const cpf = req.params.cpf;
    try {
        await Cliente.deleteOne({ cpf });
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).send('Erro ao excluir cliente');
    }
});

// Rota para excluir produto (POST)
app.post('/produtos/excluir/:id', async function(req, res){
    const id = req.params.id;
    try {
        await Produto.deleteOne({ _id: id });
        res.redirect('/produtos');
    } catch (error) {
        res.status(500).send('Erro ao excluir produto');
    }
});

// Rotas para pedidos

// Página para cadastrar pedido
app.get('/pedidos/cadastrar', async function(req, res){
    const clientes = await Cliente.find();
    const produtos = await Produto.find();
    res.render('pedido/cadastrar', { clientes, produtos });
});

// Rota para cadastrar pedido (POST)
app.post('/pedidos', async function(req, res){
    const { cliente, produtos } = req.body;
    // produtos é um array de objetos com produto e quantidade
    const produtosFormatados = Array.isArray(produtos) ? produtos : [produtos];
    const produtosPedido = produtosFormatados.map(item => ({
        produto: item.produto,
        quantidade: parseInt(item.quantidade, 10)
    }));
    const novoPedido = new Pedido({
        cliente,
        produtos: produtosPedido
    });
    await novoPedido.save();
    res.redirect('/pedidos');
});

// Rota para mostrar relatório de pedidos
app.get('/pedidos', async function(req, res){
    const pedidos = await Pedido.find().populate('cliente').populate('produtos.produto');
    res.render('pedido/relatorio', { pedidos });
});

// Rota para excluir pedido (POST)
app.post('/pedidos/excluir/:id', async function(req, res){
    const id = req.params.id;
    try {
        await Pedido.deleteOne({ _id: id });
        res.redirect('/pedidos');
    } catch (error) {
        res.status(500).send('Erro ao excluir pedido');
    }
});

// Página 404
app.use(function(req, res){
    res.status(404).render("404");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



