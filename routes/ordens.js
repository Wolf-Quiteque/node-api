const router = require("express").Router();
const Ordens = require("../models/Ordens");

router.post("/novo", async (req, res) => {
  try {
    const novoOrdens = new Ordens({
      id_cliente: req.body.id_cliente,
      codigo_de_negociacao: req.body.codigo_de_negociacao,
      taxa_de_cupao: req.body.taxa_de_cupao,
      quantidade_minima: req.body.quantidade_minima,
      ultimo_cotacao: req.body.ultimo_cotacao,
      preco_limite: req.body.preco_limite,
      preco_disparo: req.body.preco_disparo,
      condicao_temporal: req.body.condicao_temporal,
      condicao_preco: req.body.condicao_preco,
      quantidade_total: req.body.quantidade_total,
      lado_ordem: req.body.lado_ordem,
    });

    const ordem = await novoOrdens.save();
    res.status(200).json(ordem);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const allOrdens = await Ordens.find({});
    res.status(200).json(allOrdens);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/usuario/:userId", async (req, res) => {
  try {
    const allOrdens = await Ordens.find({ id_cliente: req.params.userId });
    res.status(200).json(allOrdens);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Ordens.deleteOne({ _id: req.params.id });
    res.status(200).json("eliminado com successo");
  } catch {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await Ordens.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("atualizado");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
