const mongoose = require("mongoose");

const LivroOrdensSchema = new mongoose.Schema(
  {
    id_cliente: {
      type: String,
    },
    codigo_de_negociacao: {
      type: String,
    },
    lado_de_ordem: {
      type: String,
    },
    preco_disparo: {
      type: Number,
    },
    preco_limite: {
      type: Number,
    },
    quantidade_total: {
      type: Number,
    },
    estado: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LivroOrdens", LivroOrdensSchema);
