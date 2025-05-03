const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    produtos: [{
        produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
        quantidade: { type: Number, required: true }
    }],
    precoTotal: { type: Number }
});

module.exports = mongoose.model('Pedido', pedidoSchema);
