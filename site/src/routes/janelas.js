var express = require("express");
var router = express.Router();

var janelasController = require("../controllers/janelasController");

router.get("/ultimas/", function (req, res) {
    janelasController.buscarUltimasMedidasJa(req, res);
});
router.post("/colJanela", function (req, res) {
    janelasController.colJanela(req, res);
});
router.post('/fechar', (req, res) => {
    janelasController.fechar(req, res);
});


module.exports = router;