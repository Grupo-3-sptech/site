var express = require("express");
var router = express.Router();

var componenteController = require("../controllers/componenteController");

router.get("/medidas/:id/:tempo/:linhas", function (req, res) {
    componenteController.buscarUltimasMedidas(req, res);
});

router.get("/resumo/:id/:tempo", function (req, res) {
    componenteController.buscarMedidasResumo(req, res);
});

router.get("/usb/:id/", function (req, res) {
    componenteController.buscarUsb(req, res);
});

// router.get("//:id", function (req, res) {
//     medidaController.buscarMedidasEmTempoReal(req, res);
// })

module.exports = router;