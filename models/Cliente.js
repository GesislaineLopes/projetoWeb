const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Importando o modelo Produto
const Produto = require('./Produto'); 

const clienteSchema = Schema({
    cpf: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    email: { type: String, required: true },
    dataNascimento: { type: Date },
    endereco: { type: String },
    // Referência para o modelo Produto
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' } 
});

module.exports = mongoose.model("Cliente", clienteSchema);


