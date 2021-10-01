const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    Tel: {
      type: String,
      default: "",
    },
    categoria: {
      type: String,
      default: "Demo",
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    imagemProfil: {
      type: String,
      default: "",
    },
    imagemCover: {
      type: String,
      default: "",
    },
    seguidores: {
      type: Array,
      default: [],
    },
    aseguir: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
      default: "",
    },
    bi: {
      type: String,
      default: "",
    },
    provincia: {
      type: String,
      max: 50,
      default: "",
    },
    municipio: {
      type: String,
      default: "",
    },
    morada: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    google: {
      type: String,
      default: "",
    },
    valorLiquido: {
      type: Number,
      default: 0,
    },
    carteira: {
      type: Number,
      default: 0,
    },
    carteiraDemo: {
      type: Number,
      default: 100000000,
    },
    conta: {
      type: String,
      default: "",
    },
    confirmado: {
      type: String,
    },
    Token: {
      type: String,
    },
    documentos_do_procurador: {
      type: String,
    },
    diario_republica: {
      type: String,
    },
    registo_comercial: {
      type: String,
    },
    Contrato_Sociedade: {
      type: String,
    },
    tipo: {
      type: String,
    },
    nif: {
      type: String,
    },
    accoes_disponivel: {
      type: String,
    },
    accoes_cotada: {
      type: String,
    },
    proffisao: {
      type: String,
    },
    interesse: {
      type: Number,
    },
    etapa: {
      type: String,
      default: "novo",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", UserSchema);
