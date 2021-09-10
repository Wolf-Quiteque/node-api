const router = require("express").Router();
const Ordens = require("../../models/Ordens");
const Negociacao = require("../../models/Negociacao");
const Matching = require("../../models/Matching");

//---------------------------------------------------------------------Orders
router.post("/newOrder", async (req, res) => {
  try {
    const novoOrdens = new Ordens(req.body);
    const ordens = await novoOrdens.save();
    const novoMatch = new Matching(req.body);
    const matches = await novoMatch.save();

    res.status(200).json(matches);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/allOrders", async (req, res) => {
  try {
    const ordens = await Ordens.find({});
    res.status(200).json(ordens);
  } catch (err) {}
});

//-------------------------------------------------------------------Negocios
router.post("/newNegocio", async (req, res) => {
  try {
    const novoNegociacao = new Negociacao(req.body);
    const negociacao = await novoNegociacao.save();
    res.status(200).json(negociacao);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/allNegocios", async (req, res) => {
  try {
    const negocios = await Negociacao.find({});
    res.status(200).json(negocios);
  } catch (err) {}
});

//-------------------------------------------------------------------Matches
router.get("/allMatches", async (req, res) => {
  try {
    const matching = await Matching.find({});
    res.status(200).json(matching);
  } catch (err) {}
});

module.exports = router;
