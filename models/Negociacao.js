const mongoose = require("mongoose");

const NegociacaoSchema = new mongoose.Schema(
  {
    tipo_de_instrumento: {
      type: String,
    },
    cod_de_negociacao: {
      type: String,
    },
    tipo_de_empresa: {
      type: String,
    },
    nif: {
      type: String,
    },
    nome_da_empresa: {
      type: String,
    },
    preco_unitario: {
      type: String,
    },
    tipo_de_obrigacao_ref: {
      type: String,
    },
    taxa_de_juro: {
      type: String,
    },
    data_de_emissao: {
      type: String,
    },
    data_de_maturidade: {
      type: String,
    },
    valor_total: {
      type: Number,
    },
    quantidade_total: {
      type: Number,
    },
    quantidade_minima: {
      type: Number,
    },
    data_de_abertura: {
      type: Date,
    },
    data_de_feicho: {
      type: Date,
    },
    preco_unitario: {
      type: Number,
    },
    isin: {
      type: String,
    },
    entidade: {
      type: String,
    },
    qty_emitida: {
      type: Number,
    },
    rentabilidade_cupao: {
      type: Number,
    },
    ordens: {
      type: Array,
    },
    accoes_disponivel: {
      type: String,
    },
    accoes_cotada: {
      type: String,
    },
    obrigacoes_disponivel: {
      type: String,
    },
    obrigacoes_cotada: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Negociacao", NegociacaoSchema);
