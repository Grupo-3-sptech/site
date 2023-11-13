var express = require("express");
var router = express.Router();

var metricasController = require("../controllers/metricasController");

router.get("/buscarMetricas", function (req, res) {
    metricasController.buscarMetricas(req, res);
});

router.post("/updateMetricas/:fkMetrica/:alerta/:urgente/:critico", function (req, res) {
    metricasController.updateMetricas(req, res);
});

router.post("/excluirMetricas/:idMetrica", function (req, res) {
    metricasController.excluirMetricas(req, res);
});


module.exports = router;