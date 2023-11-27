var janelasModel = require("../models/janelasModel");


function fechar(req, res) {
    var janela = req.body.janelaServer;   
    var id = req.body.idMaquinaServer

    console.log("janela a fechar", janela)



    if (janela == undefined) {
        res.status(400).send("não fechou a janela");
    } else {
        
        janelasModel.fechar(janela, id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        `\n não foi capaz de inserir a ${janela} `,
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarUltimasMedidasJa(req, res) {

    const limite_linhas = req.params.linhas;
    var id = req.params.id;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    janelasModel.buscarUltimasMedidas(id).then(function (resultado) {
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


function colJanela(req, res) {

    var id = req.body.idMaquinaServer

    console.log(`Recuperando medidas em tempo real`);

    janelasModel.colJanela(id).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas janelas do sistema.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidasJa,
    colJanela,
    fechar
}