const mongoose = require("mongoose");

const MatchingSchema = new mongoose.Schema(
  {
    id_negocicao: {
      type: String,
    },
    codigo_de_negociacao: {
      type: String,
    },
    id_cliente: {
      type: String,
    },
    tipo_ordem: {
      type: String,
    },
    lado_de_ordem: {
      type: String,
    },
    quantidade_total: {
      type: Number,
    },
    cotacao: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Matching", MatchingSchema);
