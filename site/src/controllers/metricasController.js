var metricasModel = require("../models/metricasModel");

async function buscarMetricas(req, res) {

    try {
        var data = await metricasModel.buscarMetricas();

        console.log(`DEBUG tipo da response dentro da controller: ${typeof data}`)

        if (Object.keys(data).length > 0) {
            res.status(200).json(data);
            console.log(`Estou na controller, e a resposta foi bem-sucedida!`);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
            console.log(`Estou na controller, mas a consulta não retornou resultados.`);
        }
    } catch (error) {
        console.error("Houve um erro ao buscar as últimas medidas:", error);
        res.status(500).json({ error: "Houve um erro no servidor." });
    }
}

function updateMetricas(req, res) {
    var fkMetrica = req.params.fkMetrica;
    var alerta = req.params.alerta;
    var urgente = req.params.urgente;
    var critico = req.params.critico;

    console.log(`fkMetrica: ${fkMetrica}`)
    console.log(`alerta: ${alerta}`)
    console.log(`urgnete: ${urgente}`)
    console.log(`critico: ${critico}`)

    // Certifique-se de que os dados foram recebidos corretamente
    if (fkMetrica === undefined || alerta === undefined || urgente === undefined || critico === undefined) {
        return res.status(400).json({ error: 'Dados incompletos na requisição' });
    }

    // Realize a lógica de atualização no banco de dados aqui
    // Certifique-se de que o modelo 'metricasModel' está configurado corretamente

    metricasModel.updateMetricas(fkMetrica, alerta, urgente, critico)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });

         
}

function excluirMetricas(req, res) {
    var idMetrica = req.params.idMetrica;

    metricasModel.excluirMetricas(idMetrica)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });

         
}


module.exports = {
    buscarMetricas,
    updateMetricas,
    excluirMetricas
}