const mongoose = require("mongoose");

const NegociacaoSchema = new mongoose.Schema(
  {
    codigo_de_negociacao: {
      type: String,
    },
    nome: {
      type: String,
    },
    preco: {
      type: Number,
    },
    ordens: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Negociacao", NegociacaoSchema);
