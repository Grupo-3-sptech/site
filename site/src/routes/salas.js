var express = require("express");
var router = express.Router();

var salaController = require("../controllers/salaController");

router.get("/", function (req, res) {
    salaController.testar(req, res);
});

router.get("/listar", function (req, res) {
    salaController.listar(req, res);
});
router.get("/robo/:id", function (req, res) {
    salaController.pegarRobo(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
// router.post("/cadastrar", function (req, res) {
//     salaController.cadastrar(req, res);
// })

// router.post("/autenticar", function (req, res) {
//     salaController.entrar(req, res);
// });

module.exports = router;