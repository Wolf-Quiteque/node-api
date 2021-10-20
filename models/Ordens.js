const mongoose = require("mongoose");

const OrdensSchema = new mongoose.Schema(
  {
    id_cliente: {
      type: String,
    },
    codigo_de_negociacao: {
      type: String,
    },
    tipo_de_instrumento: {
      type: String,
    },
    lado_de_ordem: {
      type: String,
    },
    tipo_ordem: {
      type: String,
    },
    cotacao: {
      type: Number,
    },
    quantidade_total: {
      type: Number,
    },
    preco_unitario: {
      type: Number,
    },
    estado: {
      type: String,
      default: "activo",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ordens", OrdensSchema);
