const router = require("express").Router();
const Negociacao = require("../models/Negociacao");

router.get("/todos", async (req, res) => {
  try {
    const ordem = await Negociacao.find({});
    res.status(200).json(ordem);
  } catch (err) {}
});

router.get("/:id", async (req, res) => {
  try {
    const ordem = await Negociacao.findById(req.params.id);
    res.status(200).json(ordem.ordens);
  } catch (err) {}
});

router.put("/:id", async (req, res) => {
  try {
    const negociacao = await Negociacao.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("atualizado");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const negociacao = await Negociacao.findByIdAndDelete(req.params.id);
    res.status(200).json("Conta foi eliminada");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
