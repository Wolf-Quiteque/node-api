const mongoose = require("mongoose");

const OrdensSchema = new mongoose.Schema(
  {
    codigo_de_negociacao: {
      type: String,
    },
    id_cliente: {
      type: String,
    },
    taxa_de_cupao: {
      type: Number,
    },
    ultimo_cotacao: {
      type: Number,
    },
    quantidade_minima: {
      type: Number,
    },
    preco_limite: {
      type: Number,
    },
    preco_disparo: {
      type: Number,
    },
    condicao_temporal: {
      type: String,
    },
    condicao_preco: {
      type: String,
    },
    quantidade_total: {
      type: Number,
    },
    lado_ordem: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ordens", OrdensSchema);
