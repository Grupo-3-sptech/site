var express = require("express");
var router = express.Router();

var roboController = require("../controllers/roboController");

router.get("/", function (req, res) {
    roboController.testar(req, res);
});

router.get("/listar/:idHospital", function (req, res) {
    roboController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    roboController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    roboController.entrar(req, res);
});

module.exports = router;