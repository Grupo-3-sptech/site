var express = require("express");
var router = express.Router();

var daniloIndiviudalController = require("../controllers/daniloIndividualController");

router.get("/capturarComponentes/:fkRobo", function (req, res) {
    daniloIndiviudalController.capturarComponentes(req, res);
})


module.exports = router;