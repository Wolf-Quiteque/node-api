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
        const link = $(this).find("a").attr("href");

        noticias.push({
          capa: capa,
          data: data,
          lastUpdated: lastUpdated,
          title: title,
          desc: desc,
          link: link,
          fonte: "jornal de angola",
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
        const capa = $(this).find("img").attr("srcset");
        const data = $(this).find(".date").text();
        const desc = $(this).find(".text-wrapper").text();
        const link = $(this).find("a").attr("href");

        noticias.push({
          title: title,
          capa: capa,
          data: data,
          desc: desc,
          link: link,
          fonte: "Mercado",
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
        const capa = $(this).find("img").attr("srcset");
        const data = $(this).find(".date").text();
        const desc = $(this).find(".text-wrapper").text();
        const link = $(this).find("a").attr("href");

        noticias.push({
          title: title,
          capa: capa,
          data: data,
          desc: desc,
          link: link,
          fonte: "Mercado",
        });
      });

      res.status(200).json(noticias);
    })
    .catch(console.error);
});

router.post("/newsinfo", async (req, res) => {
  if (req.body.fonte == "Mercado") {
    axios(req.body.url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const title = $("body").find("h1").text();
        const desc = $("body").find(".paragraph").text();
        res.status(200).json({ title: title, desc: desc });
      })
      .catch(console.error);
  } else {
    axios(req.body.url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const title = $("body").find("h1").text();
        const desc = $("body").find(".body-news").text();
        res.status(200).json({ title: title, desc: desc });
      })
      .catch(console.error);
  }
  // const url = req.params.url;
  // console.log("this is url " + url);
  // axios(url)
  //   .then((response) => {
  //     const html = response.data;
  //     const $ = cheerio.load(html);
  //     const itemNoticaDiv = $("body");
  //     const noticias = [];

  //     itemNoticaDiv.each(function () {
  //       const title = $(this).find("h1").text();
  //       const desc = $(this).find(".paragraph").text();
  //       const data = $(this).find(".datefrom small").text();

  //       noticias.push({
  //         title: title,
  //         data: data,
  //         desc: desc,
  //         fonte: "Mercado",
  //       });
  //     });

  //     res.status(200).json(noticias);
  //   })
  //   .catch(console.error);
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
