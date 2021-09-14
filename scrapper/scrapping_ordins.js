const router = require("express").Router();
const axios = require("axios");
const Negociacao = require("../models/Negociacao");

var ordens = [];
var ordensotnr = { high: 0, low: 0, open: 0, close: 0 };
var ordensottx = { high: 0, low: 0, open: 0, close: 0 };
var maxotnr = 0;
var minotnr = 0;

var maxottx = 0;
var minottx = 0;
var utlimaCotacao;
var otnrindex = 0;
var ottxindex = 0;

const d = new Date();

function updateChart() {
  const url = "https://bodiva-api.herokuapp.com/api/scraper/bodiva_ordens";
  ordensotnr.date = d.toISOString();
  ordensottx.date = d.toISOString();

  axios(url)
    .then((response) => {
      ordens = response.data;
      for (let index = 0; index < ordens.length; index++) {
        if (ordens[index].ultima_cotacao == "-") {
          utlimaCotacao = ordens[index].ultima_cotacao.replace("-", "0.0");
        } else {
          utlimaCotacao = ordens[index].ultima_cotacao.replace(",", ".");
        }

        if (ordens[index].tipologia === "OT-NR") {
          otnrindex += 1;
          if (otnrindex == 1) {
            minotnr = parseFloat(utlimaCotacao);
            maxotnr = parseFloat(utlimaCotacao);
            ordensotnr.open = parseFloat(utlimaCotacao);
          }

          if (minotnr > parseFloat(utlimaCotacao) && utlimaCotacao != "0.0") {
            minotnr = parseFloat(utlimaCotacao);
          }

          if (maxotnr < parseFloat(utlimaCotacao)) {
            maxotnr = parseFloat(utlimaCotacao);
          }

          ordensotnr.close = parseFloat(utlimaCotacao);
        }

        if (ordens[index].tipologia === "OT-TX") {
          ottxindex += 1;
          if (ottxindex == 1) {
            minottx = parseFloat(utlimaCotacao);
            maxottx = parseFloat(utlimaCotacao);
            ordensottx.open = parseFloat(utlimaCotacao);
          }

          if (minottx > parseFloat(utlimaCotacao) && utlimaCotacao != "0.0") {
            minottx = parseFloat(utlimaCotacao);
          }

          if (maxottx < parseFloat(utlimaCotacao)) {
            maxottx = parseFloat(utlimaCotacao);
          }

          ordensottx.close = parseFloat(utlimaCotacao);
        }
      }

      ordensotnr.high = maxotnr;
      ordensottx.high = maxottx;
      ordensotnr.low = minotnr;
      ordensottx.low = minottx;

      const UploadOrdens = async () => {
        try {
          const ordemot = await Negociacao.findById("612c99bfc328ab3014c62086");
          const ordembt = await Negociacao.findById("613f2b4c8a7a47071408ad47");
          await ordemot.updateOne({
            $push: { ordens: ordensotnr },
          });
          await ordembt.updateOne({
            $push: { ordens: ordensottx },
          });
          console.log(200);
        } catch (error) {
          console.log(error);
        }
      };
      // UploadOrdens();
    })
    .catch(console.error);
}
module.exports = updateChart;
