const router = require("express").Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//Registrar
router.post("/registrar", async (req, res) => {
  const token = Math.floor(Math.random() * 10000000) + 10000000;
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
      subject: "EMAINVEST-SCVM - VERIFICAR EMAIL", // Subject line
      text: "", // plain text body
      html:
        ' <img src="https://emainvest.herokuapp.com/images/logo.png" height="80"> <br>Muito Obrigado ' +
        req.body.username +
        ', por se registrar na platafroma EMAINVEST-SCVM.Por favor <a href="https://emainvest.herokuapp.com/api/auth/link/' +
        req.body.email +
        token +
        '">SEGUE ESTE LINK</a> para fazer a confirmação da sua conta', // html body
    });
  }
  main().catch(console.error);

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
      Token: req.body.email + token,
      tipo: req.body.tipo,
    });

    //guardar usuario e resposta
    const usuario = await novoUsuario.save();
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/link/:email", async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ Token: req.params.email });
    await Usuario.findByIdAndUpdate(usuario._id, {
      confirmado: "true",
    });
    res.send("muito obrigado sua conta foi confirmado");
  } catch (err) {
    return res.status(500).send("ouve um erro");
  }
});

//Login this is the new login
router.post("/login", async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.body.email });
    !usuario && res.status(404).json("Usuario nao encontrado");

    const validarPassword = await bcrypt.compare(
      req.body.password,
      usuario.password
    );
    !validarPassword && res.status(400).json("senha errado");
    if (!usuario.confirmado) {
      res.status(400).json("senha errado");
    } else {
      res.status(200).json(usuario);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
