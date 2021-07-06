const router = require("express").Router();
const axios = require("axios");

router.get("/ottx/:url", async (req, res) => {
  var pdfData = [];
  const newdata = [];
  var onemonth = [];
  var threemonth = [];
  var sixmonth = [];
  var oneyear = [];
  var twoyear = [];
  var threeyear = [];
  var fouryear = [];
  var fifthyear = [];
  var sixyear = [];
  var seventhyear = [];
  var ot_tx_dia = [];
  var ot_tx_anterior = [];
  var ot_tx = [];
  var ot_nr_dia = [];
  var ot_nr_anterior = [];
  var ot_nr = [];
  axios("http://127.0.0.1:8000/pdf/" + req.params.url)
    .then((response) => {
      pdfData = response.data.data;

      for (let index = 0; index < pdfData.length; index++) {
        var pdf = pdfData[index];
        for (let i = 0; i < pdf.length; i++) {
          newdata.push(pdf[i]);
        }
      }

      for (let index = 0; index < newdata.length; index++) {
        for (let index = 0; index < newdata.length; index++) {
          if (newdata[index].text === "Horizonte Actual") {
            newdata.splice(index, 1);
          }

          if (newdata[index].text === "Variação (pp)") {
            newdata.splice(index, 1);
          }
          if (newdata[index].text === "Variação (%)") {
            newdata.splice(index, 1);
          }

          if (newdata[index].text === "Horizonte") {
            newdata.splice(index, 1);
          }

          if (newdata[index].text === "Actual") {
            newdata.splice(index, 1);
          }
          if (newdata[index].text === "1 Dia Atrás") {
            newdata.splice(index, 1);
          }
          if (newdata[index].text === "") {
            newdata.splice(index, 1);
          }
        }
      }

      for (let index = 0; index < newdata.length; index++) {
        var place = index;
        if (newdata[index].text === "1M") {
          for (let newindex = 0; newindex < 3; newindex++) {
            onemonth.push(newdata[place]);
            place = place + 1;
            if (newindex === 0) {
              var newtext = newdata[place].text;
              ot_nr_dia.push(newtext.slice(0, -1));
            }
            if (newindex === 1) {
              var newtext = newdata[place].text;
              ot_nr_anterior.push(newtext.slice(0, -1));
            }
          }
        }
        if (newdata[index].text === "3M") {
          for (let newindex = 0; newindex < 3; newindex++) {
            threemonth.push(newdata[place]);
            place = place + 1;
            if (newindex === 0) {
              var newtext = newdata[place].text;
              ot_tx_dia.push(newtext.slice(0, -1));
              ot_nr_dia.push(newtext.slice(0, -1));
            }
            if (newindex === 1) {
              var newtext = newdata[place].text;
              ot_tx_anterior.push(newtext.slice(0, -1));
              ot_nr_anterior.push(newtext.slice(0, -1));
            }
          }
          ot_tx_dia.splice(1, 1);
          ot_tx_anterior.splice(1, 1);
        }
        if (newdata[index].text === "6M") {
          for (let newindex = 0; newindex < 3; newindex++) {
            sixmonth.push(newdata[place]);
            place = place + 1;
            if (newindex === 0) {
              var newtext = newdata[place].text;
              ot_tx_dia.push(newtext.slice(0, -1));
            }
            if (newindex === 1) {
              var newtext = newdata[place].text;
              ot_tx_anterior.push(newtext.slice(0, -1));
            }
          }
          ot_tx_dia.splice(2, 1);
          ot_tx_anterior.splice(2, 1);
        }

        if (newdata[index].text === "1A") {
          for (let newindex = 0; newindex < 3; newindex++) {
            oneyear.push(newdata[place]);
            place = place + 1;
            if (newindex === 0) {
              var newtext = newdata[place].text;
              ot_tx_dia.push(newtext.slice(0, -1));
            }
            if (newindex === 1) {
              var newtext = newdata[place].text;
              ot_tx_anterior.push(newtext.slice(0, -1));
            }
          }
          ot_tx_dia.splice(3, 1);
          ot_tx_anterior.splice(3, 1);
        }

        if (newdata[index].text === "2A") {
          for (let newindex = 0; newindex < 3; newindex++) {
            twoyear.push(newdata[place]);
            place = place + 1;
            if (newindex === 0) {
              var newtext = newdata[place].text;
              ot_tx_dia.push(newtext.slice(0, -1));
            }
            if (newindex === 1) {
              var newtext = newdata[place].text;
              ot_tx_anterior.push(newtext.slice(0, -1));
            }
          }
          ot_tx_dia.splice(4, 1);
          ot_tx_anterior.splice(4, 1);
        }
        if (newdata[index].text === "3A") {
          for (let newindex = 0; newindex < 3; newindex++) {
            threeyear.push(newdata[place]);
            place = place + 1;
            if (newindex === 0) {
              var newtext = newdata[place].text;
              ot_tx_dia.push(newtext.slice(0, -1));
            }
            if (newindex === 1) {
              var newtext = newdata[place].text;
              ot_tx_anterior.push(newtext.slice(0, -1));
            }
          }
          ot_tx_dia.splice(5, 1);
          ot_tx_anterior.splice(5, 1);
        }
        if (newdata[index].text === "4A") {
          for (let newindex = 0; newindex < 3; newindex++) {
            fouryear.push(newdata[place]);
            place = place + 1;
            if (newindex === 0) {
              var newtext = newdata[place].text;
              ot_tx_dia.push(newtext.slice(0, -1));
            }
            if (newindex === 1) {
              var newtext = newdata[place].text;
              ot_tx_anterior.push(newtext.slice(0, -1));
            }
          }
          ot_tx_dia.splice(6, 1);
          ot_tx_anterior.splice(6, 1);
        }
        if (newdata[index].text === "5A") {
          for (let newindex = 0; newindex < 3; newindex++) {
            fifthyear.push(newdata[place]);
            place = place + 1;
            if (newindex === 0) {
              var newtext = newdata[place].text;
              ot_tx_dia.push(newtext.slice(0, -1));
            }
            if (newindex === 1) {
              var newtext = newdata[place].text;
              ot_tx_anterior.push(newtext.slice(0, -1));
            }
          }
          ot_tx_dia.splice(7, 1);
          ot_tx_anterior.splice(7, 1);
        }
        if (newdata[index].text === "6A") {
          for (let newindex = 0; newindex < 3; newindex++) {
            sixyear.push(newdata[place]);
            place = place + 1;
            if (newindex === 0) {
              var newtext = newdata[place].text;
              ot_tx_dia.push(newtext.slice(0, -1));
            }
            if (newindex === 1) {
              var newtext = newdata[place].text;
              ot_tx_anterior.push(newtext.slice(0, -1));
            }
          }
          ot_tx_dia.splice(8, 1);
          ot_tx_anterior.splice(8, 1);
        }

        if (newdata[index].text === "7A") {
          for (let newindex = 0; newindex < 3; newindex++) {
            seventhyear.push(newdata[place]);
            place = place + 1;
            if (newindex === 0) {
              var newtext = newdata[place].text;
              ot_tx_dia.push(newtext.slice(0, -1));
            }
            if (newindex === 1) {
              var newtext = newdata[place].text;
              ot_tx_anterior.push(newtext.slice(0, -1));
            }
          }
          ot_tx_dia.splice(9, 1);
          ot_tx_anterior.splice(9, 1);
        }
      }
      ot_tx.push(ot_tx_dia, ot_tx_anterior);

      res.status(200).json(ot_tx);
    })
    .catch(console.error);
});

router.get("/otnr/:url", async (req, res) => {
  var pdfData = [];
  const newdata = [];
  var onemonth = [];
  var threemonth = [];
  var sixmonth = [];
  var oneyear = [];
  var twoyear = [];
  var threeyear = [];
  var fouryear = [];
  var fifthyear = [];
  var sixyear = [];
  var seventhyear = [];
  var ot_nr_dia = [];
  var ot_nr_anterior = [];
  var ot_nr = [];
  var wave = 0;
  axios("http://127.0.0.1:8000/pdf/" + req.params.url)
    .then((response) => {
      pdfData = response.data.data;

      for (let index = 0; index < pdfData.length; index++) {
        var pdf = pdfData[index];
        for (let i = 0; i < pdf.length; i++) {
          newdata.push(pdf[i]);
        }
      }

      for (let index = 0; index < newdata.length; index++) {
        for (let index = 0; index < newdata.length; index++) {
          if (newdata[index].text === "Horizonte Actual") {
            newdata.splice(index, 1);
          }

          if (newdata[index].text === "Variação (pp)") {
            newdata.splice(index, 1);
          }
          if (newdata[index].text === "Variação (%)") {
            newdata.splice(index, 1);
          }

          if (newdata[index].text === "Horizonte") {
            newdata.splice(index, 1);
          }

          if (newdata[index].text === "Actual") {
            newdata.splice(index, 1);
          }
          if (newdata[index].text === "1 Dia Atrás") {
            newdata.splice(index, 1);
          }
          if (newdata[index].text === "") {
            newdata.splice(index, 1);
          }
        }
      }

      for (let index = 0; index < newdata.length; index++) {
        var place = index;
        if (newdata[index].text === "1M") {
          for (let newindex = 0; newindex < 3; newindex++) {
            onemonth.push(newdata[place]);
            place = place + 1;
            if (newindex === 0) {
              var newtext = newdata[place].text;
              ot_nr_dia.push(newtext.slice(0, -1));
            }
            if (newindex === 1) {
              var newtext = newdata[place].text;
              ot_nr_anterior.push(newtext.slice(0, -1));
            }
          }
        }
        if (newdata[index].text === "3M") {
          wave = wave + 1;
          for (let newindex = 0; newindex < 3; newindex++) {
            threemonth.push(newdata[place]);
            place = place + 1;
            if (wave === 2) {
              if (newindex === 0) {
                var newtext = newdata[place].text;
                ot_nr_dia.push(newtext.slice(0, -1));
              }
              if (newindex === 1) {
                var newtext = newdata[place].text;
                ot_nr_anterior.push(newtext.slice(0, -1));
                wave = 0;
              }
            }
          }
        }
        if (newdata[index].text === "6M") {
          wave = wave + 1;
          for (let newindex = 0; newindex < 3; newindex++) {
            sixmonth.push(newdata[place]);
            place = place + 1;
            if (wave === 2) {
              if (newindex === 0) {
                var newtext = newdata[place].text;
                ot_nr_dia.push(newtext.slice(0, -1));
              }
              if (newindex === 1) {
                var newtext = newdata[place].text;
                ot_nr_anterior.push(newtext.slice(0, -1));
                wave = 0;
              }
            }
          }
        }

        if (newdata[index].text === "1A") {
          wave = wave + 1;
          for (let newindex = 0; newindex < 3; newindex++) {
            oneyear.push(newdata[place]);
            place = place + 1;
            if (wave === 2) {
              if (newindex === 0) {
                var newtext = newdata[place].text;
                ot_nr_dia.push(newtext.slice(0, -1));
              }
              if (newindex === 1) {
                var newtext = newdata[place].text;
                ot_nr_anterior.push(newtext.slice(0, -1));
                wave = 0;
              }
            }
          }
        }

        if (newdata[index].text === "2A") {
          wave = wave + 1;
          for (let newindex = 0; newindex < 3; newindex++) {
            twoyear.push(newdata[place]);
            place = place + 1;
            if (wave === 2) {
              if (newindex === 0) {
                var newtext = newdata[place].text;
                ot_nr_dia.push(newtext.slice(0, -1));
              }
              if (newindex === 1) {
                var newtext = newdata[place].text;
                ot_nr_anterior.push(newtext.slice(0, -1));
                wave = 0;
              }
            }
          }
        }
        if (newdata[index].text === "3A") {
          wave = wave + 1;
          for (let newindex = 0; newindex < 3; newindex++) {
            threeyear.push(newdata[place]);
            place = place + 1;
            if (wave === 2) {
              if (newindex === 0) {
                var newtext = newdata[place].text;
                ot_nr_dia.push(newtext.slice(0, -1));
              }
              if (newindex === 1) {
                var newtext = newdata[place].text;
                ot_nr_anterior.push(newtext.slice(0, -1));
                wave = 0;
              }
            }
          }
        }
        if (newdata[index].text === "4A") {
          wave = wave + 1;
          for (let newindex = 0; newindex < 3; newindex++) {
            fouryear.push(newdata[place]);
            place = place + 1;
            if (wave === 2) {
              if (newindex === 0) {
                var newtext = newdata[place].text;
                ot_nr_dia.push(newtext.slice(0, -1));
              }
              if (newindex === 1) {
                var newtext = newdata[place].text;
                ot_nr_anterior.push(newtext.slice(0, -1));
                wave = 0;
              }
            }
          }
        }
        if (newdata[index].text === "5A") {
          wave = wave + 1;
          for (let newindex = 0; newindex < 3; newindex++) {
            fifthyear.push(newdata[place]);
            place = place + 1;
            if (wave === 2) {
              if (newindex === 0) {
                var newtext = newdata[place].text;
                ot_nr_dia.push(newtext.slice(0, -1));
              }
              if (newindex === 1) {
                var newtext = newdata[place].text;
                ot_nr_anterior.push(newtext.slice(0, -1));
                wave = 0;
              }
            }
          }
        }
        if (newdata[index].text === "6A") {
          wave = wave + 1;
          for (let newindex = 0; newindex < 3; newindex++) {
            sixyear.push(newdata[place]);
            place = place + 1;
            if (wave === 2) {
              if (newindex === 0) {
                var newtext = newdata[place].text;
                ot_nr_dia.push(newtext.slice(0, -1));
              }
              if (newindex === 1) {
                var newtext = newdata[place].text;
                ot_nr_anterior.push(newtext.slice(0, -1));
                wave = 0;
              }
            }
          }
        }

        if (newdata[index].text === "7A") {
          wave = wave + 1;
          for (let newindex = 0; newindex < 3; newindex++) {
            seventhyear.push(newdata[place]);
            place = place + 1;
            if (wave === 2) {
              if (newindex === 0) {
                var newtext = newdata[place].text;
                ot_nr_dia.push(newtext.slice(0, -1));
              }
              if (newindex === 1) {
                var newtext = newdata[place].text;
                ot_nr_anterior.push(newtext.slice(0, -1));
                wave = 0;
              }
            }
          }
        }
      }
      ot_nr.push(ot_nr_dia, ot_nr_anterior);

      res.status(200).json(ot_nr);
    })
    .catch(console.error);
});

router.get("/test/:url", async (req, res) => {
  var pdfData = [];
  const newdata = [];
  axios("http://127.0.0.1:8000/pdf/" + req.params.url)
    .then((response) => {
      pdfData = response.data.data;

      for (let index = 0; index < pdfData.length; index++) {
        var pdf = pdfData[index];
        for (let i = 0; i < pdf.length; i++) {
          newdata.push(pdf[i]);
        }
      }

      for (let index = 0; index < newdata.length; index++) {
        for (let index = 0; index < newdata.length; index++) {
          if (newdata[index].text === "Horizonte Actual") {
            newdata.splice(index, 1);
          }

          if (newdata[index].text === "Variação (pp)") {
            newdata.splice(index, 1);
          }
          if (newdata[index].text === "Variação (%)") {
            newdata.splice(index, 1);
          }

          if (newdata[index].text === "Horizonte") {
            newdata.splice(index, 1);
          }

          if (newdata[index].text === "Actual") {
            newdata.splice(index, 1);
          }
          if (newdata[index].text === "1 Dia Atrás") {
            newdata.splice(index, 1);
          }
          if (newdata[index].text === "") {
            newdata.splice(index, 1);
          }
        }
      }

      res.status(200).json(newdata);
    })
    .catch(console.error);
});

module.exports = router;
