var express = require("express");
var router = express.Router();

var hospitalController = require("../controllers/hospitalController");

router.get("/", function (req, res) {
    hospitalController.testar(req, res);
});

router.get("/listar", function (req, res) {
    hospitalController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    hospitalController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    hospitalController.entrar(req, res);
});

module.exports = router;