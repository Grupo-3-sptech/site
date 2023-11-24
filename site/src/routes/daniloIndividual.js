var express = require("express");
var router = express.Router();

var daniloIndiviudalController = require("../controllers/daniloIndiviudalController");

//Recebendo os dados do html e direcionando para a função cadastrar de cirurgiaController.js
router.get("/capturar/:fkRobo", function (req, res) {
    daniloIndiviudalController.capturar(req, res);
})


module.exports = router;