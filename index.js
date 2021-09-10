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
const quoteRoute = require("./routes/quote");
const scraperRoute = require("./scrapper/scraper");
const pdfConvertor = require("./routes/pdfconvertor");
const matching = require("./routes/matching/index");
const Matches = require("./models/Matching");
const Negociacao = require("./models/Negociacao");
const updateChart = require("./scrapper/scrapping_ordins");
const negocios = require("./routes/negocios");

updateChart();

setInterval(function () {
  const getMatches = async () => {
    let Bidside = [];
    let Askside = [];
    let matches = [];

    try {
      matches = await Matches.find({});
      for (let index = 0; index < matches.length; index++) {
        if (matches[index].lado_de_ordem == "ask") {
          for (let indexBid = 0; indexBid < matches.length; indexBid++) {
            if (
              matches[indexBid].lado_de_ordem == "bid" &&
              matches[indexBid].codigo_de_negociacao ==
                matches[index].codigo_de_negociacao &&
              matches[index].cotacao >= matches[indexBid].cotacao &&
              matches[indexBid].quantidade_total != 0
            ) {
              if (
                matches[indexBid].quantidade_total >=
                matches[index].quantidade_total
              ) {
                matches[indexBid].quantidade_total =
                  parseInt(matches[indexBid].quantidade_total) -
                  parseInt(matches[index].quantidade_total);

                matches[index].quantidade_total = 0;
              } else {
                matches[index].quantidade_total =
                  parseInt(matches[index].quantidade_total) -
                  parseInt(matches[indexBid].quantidade_total);

                matches[indexBid].quantidade_total = 0;
              }
            }
          }
        }

        if (matches[index].lado_de_ordem == "bid") {
          for (let indexAsk = 0; indexAsk < matches.length; indexAsk++) {
            if (
              matches[indexAsk].lado_de_ordem == "ask" &&
              matches[indexAsk].codigo_de_negociacao ==
                matches[index].codigo_de_negociacao &&
              matches[index].cotacao >= matches[indexAsk].cotacao &&
              matches[indexAsk].quantidade_total != 0
            ) {
              if (
                matches[indexAsk].quantidade_total >=
                matches[index].quantidade_total
              ) {
                matches[indexAsk].quantidade_total =
                  parseInt(matches[indexAsk].quantidade_total) -
                  parseInt(matches[index].quantidade_total);

                matches[index].quantidade_total = 0;
              } else {
                matches[index].quantidade_total =
                  parseInt(matches[index].quantidade_total) -
                  parseInt(matches[indexAsk].quantidade_total);

                matches[indexAsk].quantidade_total = 0;
              }
            }
          }
        }
      }

      console.log(matches);
    } catch (err) {
      console.log(err);
    }
  };
  // getMatches();
}, 6000);

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
app.use("/api/quote", quoteRoute);
app.use("/api/scraper", scraperRoute);
app.use("/api/pdf", pdfConvertor);
app.use("/api/engine", matching);
app.use("/api/negocios", negocios);

//iniciar App
app.listen(process.env.PORT || 8800, () => {
  console.log("backend server is running");
});
