var express = require("express");
var router = express.Router();

var componenteController = require("../controllers/componenteController");

router.get("/cpu/:id/:linhas", function (req, res) {
    componenteController.buscarUltimasMedidas(req, res);
});

// router.get("//:id", function (req, res) {
//     medidaController.buscarMedidasEmTempoReal(req, res);
// })

module.exports = router;