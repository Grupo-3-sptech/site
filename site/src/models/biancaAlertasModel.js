var database = require("../database/config");

function listarProcessos(fkRobo) {
    var instrucaoProcessos = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoProcessos = `
            SELECT DISTINCT nome, pid, processo_status, momento_inicio, fkRobo
            FROM Processos
            WHERE fkRobo = ${fkRobo};

        `;

        console.log("Executando a instrução SQL: \n" + instrucaoProcessos);
        return database.executar(instrucaoProcessos);

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoProcessos = `

        SELECT DISTINCT nome, pid, processo_status, momento_inicio, fkRobo
            FROM Processos
            WHERE fkRobo = ${fkRobo};

        `;

        console.log("Executando a instrução SQL: \n" + instrucaoProcessos);
        return database.executar(instrucaoProcessos);

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

}

function buscarUltimosAlertas(fkRobo) {

    var instrucaoSql = ''
    var instrucaoSql2 = ''
    var instrucaoSql3 = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `

        select dado from registros where fkComponente = 6 and fkRoboRegistro = ${fkRobo};

        `;

        instrucaoSql2 = `
        select dado from registros where fkComponente = 2 and fkRoboRegistro = ${fkRobo} ;

        `;

        instrucaoSql3 = `
        select dado from registros where fkComponente = 5 and fkRoboRegistro = ${fkRobo};

        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `

        select dado from registros where fkComponente = 6 and fkRoboRegistro = ${fkRobo};

        `;

        instrucaoSql2 = `
        select dado from registros where fkComponente = 2 and fkRoboRegistro = ${fkRobo} ;

        `;

        instrucaoSql3 = `
        select dado from registros where fkComponente = 5 and fkRoboRegistro = ${fkRobo};

        `;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    // console.log("Executando a instrução SQL: \n" + instrucaoSql + instrucaoSql2 + instrucaoSql3);


    return executarQueryEDevolverObjetoJSON(instrucaoSql, instrucaoSql2, instrucaoSql3)

}


async function executarQueryEDevolverObjetoJSON(instrucaoSql, instrucaoSql2, instrucaoSql3) {

    const processos = await database.executar(instrucaoSql)
    const velocidade = await database.executar(instrucaoSql2)
    const pico_temperatura = await database.executar(instrucaoSql3)

    // console.log(`DEBUG Processos: ${processos}`)
    // console.log(`DEBUG velocidade: ${velocidade}`)
    // console.log(`DEBUG pico_temperatura: ${pico_temperatura}`)

    return {
        processos: processos,
        velocidade: velocidade,
        pico_temperatura: pico_temperatura
    }
}


module.exports = {
    listarProcessos,
    buscarUltimosAlertas

}
