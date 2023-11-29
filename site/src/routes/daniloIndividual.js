var express = require("express");
var router = express.Router();

var daniloIndiviudalController = require("../controllers/daniloIndividualController");

router.get("/capturarComponentes/:fkRobo", function (req, res) {
    daniloIndiviudalController.capturarComponentes(req, res);
})

router.post("/dadosConsultaMedico", function (req, res) {
    daniloIndiviudalController.dadosConsultaMedico(req, res);
})

router.get("/capturarKPIS/:fkRobo", function (req, res) {
    daniloIndiviudalController.capturarKPIS(req, res);
})


module.exports = router;