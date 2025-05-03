const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const produtoSchema = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String },
    preco: { type: Number, required: true }
});

module.exports = mongoose.model("Produto", produtoSchema);
