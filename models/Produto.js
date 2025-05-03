const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String },
    preco: { type: Number, required: true }
});

module.exports = mongoose.model('Produto', produtoSchema);
