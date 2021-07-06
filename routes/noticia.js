const router = require("express").Router();

const request = require("request");

router.get("/googleapi", async (req, res) => {
  request(
    "https://newsapi.org/v2/top-headlines?country=pt&category=business&apiKey=2a3308c949d34cd682d926a7465a1e75",
    function (error, response, body) {
      if (error == null) {
        res.status(200).send(body);
      } else {
        res.status(500).json(error);
      }
    }
  );
});

module.exports = router;
