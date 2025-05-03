const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedidoSchema = new Schema({
    cliente: { type: Schema.Types.ObjectId, ref: "Cliente", required: true },
    produtos: [{
        produto: { type: Schema.Types.ObjectId, ref: "Produto", required: true },
        quantidade: { type: Number, required: true, min: 1 }
    }],
    dataPedido: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Pedido", pedidoSchema);
