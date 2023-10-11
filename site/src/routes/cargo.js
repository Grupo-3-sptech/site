var express = require("express");
var router = express.Router();

var cargoController = require("../controllers/cargoController");

router.get("/", function (req, res) {
    cargoController.testar(req, res);
});

router.get("/listar", function (req, res) {
    cargoController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
// router.post("/cadastrar", function (req, res) {
//     cargoController.cadastrar(req, res);
// })

// router.post("/autenticar", function (req, res) {
//     cargoController.entrar(req, res);
// });

module.exports = router;