var express = require("express");
var router = express.Router();

var biancaAlertasController = require("../controllers/biancaAlertasController");

router.get("/buscarUltimaMedida/:fkRobo", function (req,res) {
    biancaAlertasController.buscarUltimosAlertas(req,res);
});

router.get("/buscarUltimaMedidaGrafico/:fkRobo/:limite_linhas", function (req,res) {
    biancaAlertasController.buscarUltimosAlertasGrafico(req,res);
});

router.get("/listarProcessos/:fkRobo", function (req,res) {
    biancaAlertasController.listarProcessos(req,res);
});

router.get("/capturarPorcentagem/:fkRobo", function (req,res) {
    biancaAlertasController.capturarPorcentagem(req,res);
});

router.get("/getIdRobo/:fkRobo", function (req,res) {
    biancaAlertasController.getIdRobo(req,res);
});

router.get("/capturarTemperatura/:fkRobo", function (req,res) {
    biancaAlertasController.capturarTemperatura(req,res);
});


module.exports = router;