const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema(
  {
    id_cliente: {
      type: String,
    },
    codigo_de_negociacao: {
      type: String,
    },
    quantidade_compra: {
      type: Number,
    },
    preco_compra: {
      type: Number,
    },
    quantidade_venda: {
      type: Number,
    },
    preco_venda: {
      type: Number,
    },
    comentario: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", QuoteSchema);
