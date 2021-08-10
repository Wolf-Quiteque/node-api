const express = require("express");
const app = express();

//middleware
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
//importar routes
const usuariosRoute = require("./routes/usuarios");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const noticiaRoute = require("./routes/noticia");
const conversationRoute = require("./routes/conversations");
const messagesRoute = require("./routes/messages");
const ordensRoute = require("./routes/ordens");
const livroOrdensRoute = require("./routes/livroOrdens");
const quoteRoute = require("./routes/quote");
const scraperRoute = require("./scrapper/scraper");
const pdfConvertor = require("./routes/pdfconvertor");

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://loving-albattani-a66e95.netlify.app"
  ); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

dotenv.config();

//mongo db conexao
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Conected to mangodb successfully");
  }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/images", express.static(path.join(__dirname, "public/images")));

var uploadimgname;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/posts");
  },
  filename: function (req, file, cb) {
    uploadimgname = Date.now() + ".jpg";
    cb(null, uploadimgname);
  },
});

var upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    console.log();
    res.status(200).json({ img: uploadimgname });
  } catch (err) {
    console.log(err);
  }
});

//routes
app.use("/api/usuarios", usuariosRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/noticia", noticiaRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/ordem", ordensRoute);
app.use("/api/livroordem", livroOrdensRoute);
app.use("/api/quote", quoteRoute);
app.use("/api/scraper", scraperRoute);
app.use("/api/pdf", pdfConvertor);

//iniciar App
app.listen(process.env.PORT || 8800, () => {
  console.log("backend server is running");
});
