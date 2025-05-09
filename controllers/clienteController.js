const ClienteModel = require("../models/Cliente");

class clienteController {
  static async cadastrar(req, res) {
    res.render('cliente/cadastrar'); // Corrigido para 'cliente/cadastrar'
  }

  static async salvar(req, res) {
    const { cpf, nome, email, dataNascimento, endereco } = req.body;
    const novoCliente = new ClienteModel({
      cpf,
      nome,
      email,
      dataNascimento,
      endereco,
    });
    await novoCliente.save(); // Salva o novo cliente no banco de dados
    res.redirect('/cliente/relatorio'); // Redireciona para o relatório de clientes
  }

  static async relatorio(req, res) {
    const status = req.query.s;
    const clientes = await ClienteModel.find(); // Busca todos os clientes
    res.render("cliente/relatorio", { clientes, status }); // Renderiza a lista de clientes
  }

  static async detalhar(req, res) {
    const cpf = req.params.cpf; // Pega o CPF do cliente da URL
    const cliente = await ClienteModel.findOne({ cpf }); // Busca o cliente pelo CPF
    res.render('cliente/detalhar', { cliente }); // Renderiza os detalhes do cliente
  }
}

module.exports = clienteController;



