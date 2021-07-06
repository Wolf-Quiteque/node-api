const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request-promise");

router.get("/jornaldeangola", async (req, res) => {
  const url = "https://jornaldeangola.ao/ao/noticias/index.php?tipo=1&idSec=15";

  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const itemNoticaDiv = $(".item-noticia");
      const noticias = [];

      itemNoticaDiv.each(function () {
        const caparaw = $(this).find(".capa").attr("style");
        const capanew = caparaw.slice(23, -2);
        const capa = "https://jornaldeangola.ao/" + capanew;
        const data = $(this).find(".data").text();
        const lastUpdated = $(this).find(".last-updated").text();
        const title = $(this).find("h2").text();
        const desc = $(this).find("p").text();

        noticias.push({
          capa: capa,
          data: data,
          lastUpdated: lastUpdated,
          title: title,
          desc: desc,
        });
      });

      res.status(200).json(noticias);
    })
    .catch(console.error);
});

router.get("/jornaleconomia", async (req, res) => {
  const url = "https://mercado.co.ao/economia";

  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const itemNoticaDiv = $(".template-3-custom");
      const noticias = [];

      itemNoticaDiv.each(function () {
        const title = $(this).find("h2").text();
        const capa = $(this).find("img").attr("data-srcset");
        const data = $(this).find(".date").text();
        const desc = $(this).find(".text-wrapper").text();
        const link = $(this).find("a").attr("href");

        noticias.push({
          title: title,
          capa: capa,
          data: data,
          desc: desc,
          link: link,
        });
      });

      res.status(200).json(noticias);
    })
    .catch(console.error);
});

router.get("/jornalnegocios", async (req, res) => {
  const url = "https://mercado.co.ao/negocios";

  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const itemNoticaDiv = $(".template-3-custom");
      const noticias = [];

      itemNoticaDiv.each(function () {
        const title = $(this).find("h2").text();
        const capa = $(this).find("img").attr("data-srcset");
        const data = $(this).find(".date").text();
        const desc = $(this).find(".text-wrapper").text();
        const link = $(this).find("a").attr("href");

        noticias.push({
          title: title,
          capa: capa,
          data: data,
          desc: desc,
          link: link,
        });
      });

      res.status(200).json(noticias);
    })
    .catch(console.error);
});

router.get("/valoreconomico-empresas-negocios", async (req, res) => {
  const url = "https://valoreconomico.co.ao/artigos/empresas-negocios";

  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const itemNoticaDiv = $(".mega-article");
      const noticias = [];

      itemNoticaDiv.each(function () {
        const title = $(this).find(".mega-text > .title > a").text();
        const capa = $(this).find("img").attr("src");
        const data = $(this).find(".mega-date").text();
        // const desc = $(this).find(".mega-text > .title > a").text();
        const link = $(this).find("a").attr("href");

        noticias.push({
          title: title,
          capa: capa,
          data: data,
          // desc: desc,
          link: link,
        });
      });

      res.status(200).json(noticias);
    })
    .catch(console.error);
});

module.exports = router;
