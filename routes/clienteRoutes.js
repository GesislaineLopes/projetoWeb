const express = require('express');
const routes = express.Router();
const clienteController = require('../controllers/clienteController');

// Definindo as rotas corretamente
routes.get("/cadastrar", clienteController.cadastrar); // Rota para o formulário de cadastro
routes.post("/cadastrar", clienteController.salvar); // Rota para salvar o cliente
routes.get("/relatorio", clienteController.relatorio); // Rota para o relatório dos clientes
routes.get("/detalhar/:cpf", clienteController.detalhar); // Rota para detalhar um cliente

module.exports = routes;


