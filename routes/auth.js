const router = require("express").Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//Registrar
router.post("/registrar", async (req, res) => {
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "marcioqui3@gmail.com", // generated ethereal user
        pass: "shinobi777", // generated ethereal password
      },
    });

    // send mail with defined transport object
    await transporter.sendMail(
      {
        from: "marcioqui3@gmail.com", // sender address
        to: req.body.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      },
      function (error, response) {
        if (error) {
          console.log(error);
          res.end("error");
        } else {
          console.log("Message sent: " + response.message);
          res.end("sent");
        }
      }
    );
  }

  main().catch(console.error);

  // try {
  //   //cryptografar senha
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //   //criar novo usuario
  //   const novoUsuario = new Usuario({
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: hashedPassword,
  //     Tel: req.body.Tel,
  //   });

  //   //guardar usuario e resposta
  //   const usuario = await novoUsuario.save();
  //   res.status(200).json(usuario);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
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
