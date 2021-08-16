const router = require("express").Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const multer = require("multer");

//atualizar usuario
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const usuario = await Usuario.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("atualizado");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Podes atualizar na sua conta");
  }
});

//eliminar usuario
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const usuario = await Usuario.findByIdAndDelete(req.params.id);
      res.status(200).json("Conta foi eliminada");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Podes eliminar na sua conta");
  }
});

//buscar usuario

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const usuario = userId
      ? await Usuario.findById(userId)
      : await Usuario.findOne({ username: username });
    const { password, updateAt, ...other } = usuario._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//buscar seguidores

router.get("/asseguir/:userId", async (req, res) => {
  try {
    const user = await Usuario.findById(req.params.userId);
    const amigos = await Promise.all(
      user.aseguir.map((idAmigo) => {
        return Usuario.findById(idAmigo);
      })
    );
    let listaAmigos = [];
    amigos.map((amigo) => {
      const { _id, username, imagemProfil } = amigo;
      listaAmigos.push({ _id, username, imagemProfil });
    });
    res.status(200).json(listaAmigos);
  } catch (err) {}
});

//todos
router.get("/todos", async (req, res) => {
  try {
    const listaAmigos = await Usuario.find({});
    res.status(200).json(listaAmigos);
  } catch (err) {}
});

//seguir usuario

router.put("/:id/seguir", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const usuario = await Usuario.findById(req.params.id);
      const usuarioatual = await Usuario.findById(req.body.userId);
      if (!usuario.seguidores.includes(req.body.userId)) {
        await usuario.updateOne({
          $push: { seguidores: req.body.userId },
        });
        await usuarioatual.updateOne({
          $push: { aseguir: req.params.id },
        });
        res.status(200).json("estas a seguir o usuario");
      } else {
        res.status(403).json("ja seguis esse usuairo");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("nao podes se seguir");
  }
});

//para de seguir usuario
router.put("/:id/naoseguir", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const usuario = await Usuario.findById(req.params.id);
      const usuarioatual = await Usuario.findById(req.body.userId);
      if (usuario.seguidores.includes(req.body.userId)) {
        await usuario.updateOne({
          $pull: { seguidores: req.body.userId },
        });
        await usuarioatual.updateOne({
          $pull: { aseguir: req.params.id },
        });
        res.status(200).json("paraste de seguir usuario");
      } else {
        res
          .status(403)
          .json("operacao invalida , não estas a seguis esse usuairo");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json(
        "opercao invalido: nao podes deixar de se seguir , porque nao podes se seguir, se toto"
      );
  }
});

var uploadimgname;
var biupload;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/users");
  },
  filename: function (req, file, cb) {
    uploadimgname = Date.now() + file.originalname;
    cb(null, uploadimgname);
  },
});

var storageBi = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profile");
  },
  filename: function (req, file, cb) {
    biupload = Date.now() + file.originalname;
    cb(null, biupload);
    console.log(file);
  },
});

var upload = multer({ storage: storage });
var uploadBi = multer({ storage: storageBi });

router.post("/upload-profile", upload.single("file"), (req, res) => {
  try {
    console.log();
    res.status(200).json({ img: uploadimgname });
  } catch (err) {
    console.log(err);
  }
});

router.post("/upload-bi", uploadBi.single("file"), (req, res) => {
  try {
    console.log();
    res.status(200).json({ bi: biupload });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
