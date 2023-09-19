var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:id", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:id", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

// DASH 2 ---------------------------------------------------------------------------------------------------------------------------------
router.get("/ultimas2/:id2", function (req, res) {
    medidaController.buscarUltimasMedidas2(req, res);
});

router.get("/tempo-real2/:id2", function (req, res) {
    medidaController.buscarMedidasEmTempoReal2(req, res);
})


// DASH 3 ---------------------------------------------------------------------------------------------------------------------------------

router.get("/ultimas3/:id3", function (req, res) {
    medidaController.buscarUltimasMedidas3(req, res);
});

router.get("/tempo-real3/:id3", function (req, res) {
    medidaController.buscarMedidasEmTempoReal3(req, res);
})

module.exports = router;