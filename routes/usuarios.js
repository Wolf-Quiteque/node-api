const router = require("express").Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const multer = require("multer");
const nodemailer = require("nodemailer");

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

  if (req.body.assunto) {
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "emainvestsuport@gmail.com", // generated ethereal user
          pass: "Emainvest@2021", // generated ethereal password
        },
      });

      // send mail with defined transport object
      await transporter.sendMail({
        from: "emainvestsuport@gmail.com", // sender address
        to: req.body.email, // list of receivers
        subject: req.body.assunto, // Subject line
        text: "", // plain text body
        html:
          ' <img src="https://emainvest.herokuapp.com/images/logo.png" height="80">' +
          req.body.mensagem, // html body
      });
    }
    main().catch(console.error);
  }
});

router.post("/novo", async (req, res) => {
  try {
    //cryptografar senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("12345678", salt);

    //criar novo usuario
    const novoUsuario = new Usuario({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      Tel: req.body.Tel,
      tipo: "cliente-admin-emainvest",
      provincia: req.body.provincia,
      municipio: req.body.municipio,
      proffisao: req.body.proffisao,
      interesse: req.body.interesse,
    });

    //guardar usuario e resposta
    const usuario = await novoUsuario.save();
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json(err);
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
router.get("/todos_cliente_admin", async (req, res) => {
  try {
    const listaAmigos = await Usuario.find({ tipo: "cliente-admin-emainvest" });
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
