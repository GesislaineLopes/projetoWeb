const ProdutoModel = require("../models/Produto");

class produtoController {
  static async cadastrar(req, res) {
    res.render('produto/cadastrar');
  }

  static async salvar(req, res) {
    const { nome, descricao, preco } = req.body;
    const novoProduto = new ProdutoModel({
      nome,
      descricao,
      preco,
    });
    await novoProduto.save();
    res.redirect('/produtos/relatorio');
  }

  static async relatorio(req, res) {
    const status = req.query.s;
    const produtos = await ProdutoModel.find();
    res.render('produto/relatorio', { produtos, status });
  }

  static async detalhar(req, res) {
    const id = req.params.id;
    const produto = await ProdutoModel.findById(id);
    res.render('produto/detalhe', { produto });
  }
}

module.exports = produtoController;
