var express = require("express");
var router = express.Router();

var biancaAlertasController = require("../controllers/biancaAlertasController");

router.get("/buscarUltimaMedida/:fkRobo", function (req,res) {
    biancaAlertasController.buscarUltimosAlertas(req,res);
});

router.get("/listarProcessos/:fkRobo", function (req,res) {
    biancaAlertasController.listarProcessos(req,res);
});


module.exports = router;