const router = require("express").Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

//Registrar
router.post("/registrar", async (req, res) => {
  try {
    //cryptografar senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //criar novo usuario
    const novoUsuario = new Usuario({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      Tel: req.body.Tel,
    });

    //guardar usuario e resposta
    const usuario = await novoUsuario.save();
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.body.email });
    !usuario && res.status(404).json("Usuario nao encontrado");

    const validarPassword = await bcrypt.compare(
      req.body.password,
      usuario.password
    );
    !validarPassword && res.status(400).json("senha errado");

    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
