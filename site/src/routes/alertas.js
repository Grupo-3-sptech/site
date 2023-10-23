var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");

router.get("/buscarUltimaMedida", function (req,res) {
  alertasController.buscarUltimosAlertas(req,res);
});

router.get("/buscarQuantidadeDeAlertas/:intervalo", function (req,res) {
  alertasController.buscarQuantidadeDeAlertas(req,res);
});


module.exports = router;