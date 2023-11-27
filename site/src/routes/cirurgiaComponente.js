var express = require("express");
var router = express.Router();

var cirurgiaComponenteController = require("../controllers/cirurgiaComponenteController");

//Recebendo os dados do html e direcionando para a função cadastrar de cirurgiaComponenteController.js
// router.post("/cadastrar", function (req, res) {
//     cirurgiaComponenteController.cadastrar(req, res);
// })

// router.post("/autenticar", function (req, res) {
//     cirurgiaComponenteController.autenticar(req, res);
// });

router.get("/listar/:hospital", function (req, res) {
    cirurgiaComponenteController.listar(req, res);
});
router.get("/listarMetricas", function (req, res) {
    cirurgiaComponenteController.listarMetricas(req, res);
});

router.get("/getLinearRegression/:roboId/:nomeComponente/:limite_linhas", function (req, res) {
    cirurgiaComponenteController.getLinearRegression(req, res);
});

// router.delete("/deletar", function (req, res) {
//     cirurgiaComponenteController.deletar(req, res);
// });

// router.put("/editar", function (req, res) {
//     cirurgiaComponenteController.editar(req, res);
// });

module.exports = router;