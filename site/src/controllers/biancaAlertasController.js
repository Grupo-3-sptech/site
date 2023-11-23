var medidaModel = require("../models/biancaAlertasModel");

async function listarProcessos(req, res) {

    var fkRobo = req.params.fkRobo;
    try {
        var data = await medidaModel.listarProcessos(fkRobo);

    
        console.log(`DEBUG tipo da response dentro da controller: ${typeof data}`)
        
        if (data.length > 0) {
            res.status(200).json(data);
            console.log(`Estou na controller, e a resposta foi bem-sucedida!`);
            console.log(`DEBUG processos: ${data}`)
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
            console.log(`Estou na controller, mas a consulta não retornou resultados.`);
        }
    } catch (error) {
        console.error("Houve um erro ao buscar as últimas medidas:", error);
        res.status(500).json({ error: "Houve um erro no servidor." });
    }
}

async function buscarUltimosAlertas(req, res) {

    var fkRobo = req.params.fkRobo;
    try {
        var data = await medidaModel.buscarUltimosAlertas(fkRobo);

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

async function executarQueryEDevolverObjetoJSON(instrucaoSql, instrucaoSql2, instrucaoSql3) {
    try {
        const processos = await database.executar(instrucaoSql);
        const velocidade = await database.executar(instrucaoSql2);
        const pico_temperatura = await database.executar(instrucaoSql3);

        // console.log("DEBUG Processos:", processos);
        // console.log("DEBUG Velocidade:", velocidade);
        // console.log("DEBUG Pico Temperatura:", pico_temperatura);

        return {
            processos: processos,
            velocidade: velocidade,
            pico_temperatura: pico_temperatura
        };
    } catch (error) {
        console.error("Houve um erro ao executar a query:", error);
        throw error; // Rejogue o erro para ser tratado no bloco catch em buscarUltimosAlertas
    }
}


module.exports = {
    //buscarQuantidadeDeAlertas,
    buscarUltimosAlertas,
    executarQueryEDevolverObjetoJSON, 
    listarProcessos
   
}
