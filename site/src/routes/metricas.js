var express = require("express");
var router = express.Router();

var metricasController = require("../controllers/metricasController");

router.get("/buscarMetricas", function (req, res) {
    metricasController.buscarMetricas(req, res);
});

module.exports = router;