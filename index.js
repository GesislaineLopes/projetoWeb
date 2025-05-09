const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Conexão com o MongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://glm2:sx03obwW3VBLIRpQ@cluster0.yhw3m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// Importando os modelos
const Cliente = require("./models/Cliente");
const Produto = require("./models/Produto");
const Pedido = require("./models/Pedido");

// Importando o arquivo de roteamento dos clientes 
const clienteRoutes = require("./routes/clienteRoutes");
app.use("/cliente", clienteRoutes);

// Página inicial home
app.get("/", function (req, res){
    const casa = {
        mensagem: "Bem-vindo ao nosso site!",
    };
    res.render("pagInicial/home", casa);
});

// Página 404
app.use(function(req, res){
    res.status(404).render("404");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
