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
    condicao_preco: {
      type: String,
    },
    preco_disparo: {
      type: Number,
    },
    condicao_temporal: {
      type: String,
    },
    validade: {
      type: Date,
    },
    quantia: {
      type: Number,
    },
    quantia_minima: {
      type: Number,
    },
    estado: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LivroOrdens", LivroOrdensSchema);
