const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    cpf: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    email: { type: String, required: true },
    dataNascimento: { type: Date },
    idade: { type: Number },
    endereco: { type: String }
});

module.exports = mongoose.model('Cliente', clienteSchema);
