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

module.exports = router;
