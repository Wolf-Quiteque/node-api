const router = require("express").Router();
const LivroOrdens = require("../models/LivroOrdens");

router.put("/novo", async (req, res) => {
  try {
    const novoLivroOrdens = new LivroOrdens({
      id_cliente: req.body.userId,
      codigo_de_negociacao: req.body.codigo_de_negociacao,
      lado_de_ordem: req.body.lado_de_ordem,
      condicao_preco: req.body.condicao_preco,
      preco_disparo: req.body.preco_disparo,
      condicao_temporal: req.body.condicao_temporal,
      validade: req.body.validade,
      quantia: req.body.quantia,
      quantia_minima: req.body.quantia_minima,
      estado: req.body.estado,
    });

    const livroOrdens = await novoLivroOrdens.save();
    res.status(200).json(livroOrdens);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const meusOrdens = await Ordens.find({});
    res.status(200).json(meusOrdens);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
