var express = require("express");
var router = express.Router();

var funcionarioAssociadoController = require("../controllers/funcionarioAssociadoController");

router.get("/", function (req, res) {
    funcionarioAssociadoController.testar(req, res);
});

router.get("/listar", function (req, res) {
    funcionarioAssociadoController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    funcionarioAssociadoController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    funcionarioAssociadoController.entrar(req, res);
});

router.get("/verificar/:idHospital", function (req, res) {
    funcionarioAssociadoController.verificarEmails(req, res);
})

router.delete("/deletar", function (req, res) {
    funcionarioAssociadoController.deletar(req, res);
});



module.exports = router;