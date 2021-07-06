const router = require("express").Router();
const Quote = require("../models/Quote");

router.post("/novo", async (req, res) => {
  try {
    const novoQuote = new Quote({
      id_cliente: req.body.id_cliente,
      codigo_de_negociacao: req.body.codigo_de_negociacao,
      quantidade_compra: req.body.quantidade_compra,
      preco_compra: req.body.preco_compra,
      quantidade_venda: req.body.quantidade_venda,
      preco_venda: req.body.preco_venda,
      comentario: req.body.comentario,
    });

    const quote = await novoQuote.save();
    res.status(200).json(quote);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const allQuote = await Quote.find({});
    res.status(200).json(allQuote);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/usuario/:userId", async (req, res) => {
  try {
    const allQuote = await Quote.find({ id_cliente: req.params.userId });
    res.status(200).json(allQuote);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Quote.deleteOne({ _id : req.params.id});
    res.status(200).json("eliminado com successo");
  } catch {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
     await Quote.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("atualizado");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
