var express = require("express");
var router = express.Router();

var cirurgiaController = require("../controllers/cirurgiaController");

//Recebendo os dados do html e direcionando para a função cadastrar de cirurgiaController.js
router.post("/cadastrar", function (req, res) {
    cirurgiaController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    cirurgiaController.autenticar(req, res);
});

router.get("/listar", function (req, res) {
    cirurgiaController.listar(req, res);
});

router.delete("/deletar", function (req, res) {
    cirurgiaController.deletar(req, res);
});

router.put("/editar", function (req, res) {
    cirurgiaController.editar(req, res);
});

module.exports = router;