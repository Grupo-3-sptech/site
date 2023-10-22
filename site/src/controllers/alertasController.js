var medidaModel = require("../models/alertasModel");

async function buscarUltimosAlertas(req, res) {
    try {
        var data = await medidaModel.buscarUltimosAlertas();

        console.log(`DEBUG tipo da response dentro da controller: ${typeof data}`)
        
        if (Object.keys(data).length > 0) {
            res.status(200).json(data);
            console.log(`Estou na controller, e a resposta foi bem-sucedida!`);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
            console.log(`Estou na controller, mas a consulta não retornou resultados.`);
        }
    } catch (error) {g
        console.error("Houve um erro ao buscar as últimas medidas:", error);
        res.status(500).json({ error: "Houve um erro no servidor." });
    }
}

module.exports = {
    buscarUltimosAlertas
}
