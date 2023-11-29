var modelDanilo = require("../models/daniloIndividualModels");

async function capturarComponentes(req, res) {
    try {
        var data = await modelDanilo.capturarComponentes();

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

async function dadosConsultaMedico(req, res) {
    try {
        var nomeUsuario = req.body.nomeUsuario
        console.log(`Estou na controller e este é o nome do usuário: ${nomeUsuario}`)
        var data = await modelDanilo.dadosConsultaMedico(nomeUsuario);

        console.log(`DEBUG tipo da response dentro da controller: ${typeof data}`)

        if (data.length > 0) {
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

async function capturarKPIS(req, res) {
    try {
        var fkRobo = req.params.fkRobo
        var data = await modelDanilo.capturarKPIS(fkRobo);
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


module.exports = {
    capturarComponentes,
    dadosConsultaMedico,
    capturarKPIS
}
