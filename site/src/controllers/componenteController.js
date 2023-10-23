var componenteModel = require("../models/componenteModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = req.params.linhas;
    const tempo = req.params.tempo;
    var id = req.params.id;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    componenteModel.buscarUltimasMedidas(id, tempo, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasResumo(req, res) {

    const tempo = req.params.tempo;
    var id = req.params.id;

    componenteModel.buscarMedidasResumo(id, tempo).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUsb(req, res) {

    var idRobo = req.params.id;

    componenteModel.buscarUsb(idRobo).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


// function buscarMedidasEmTempoReal(req, res) {

//     var id = req.params.id;

//     console.log(`Recuperando medidas em tempo real`);

//     componenteModel.buscarMedidasEmTempoReal(id).then(function (resultado) {
//         if (resultado.length > 0) {
//             res.status(200).json(resultado);
//         } else {
//             res.status(204).send("Nenhum resultado encontrado!")
//         }
//     }).catch(function (erro) {
//         console.log(erro);
//         console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
//         res.status(500).json(erro.sqlMessage);
//     });
// }

module.exports = {
    buscarUltimasMedidas,
    // buscarMedidasEmTempoReal,
    buscarMedidasResumo,
    buscarUsb
}