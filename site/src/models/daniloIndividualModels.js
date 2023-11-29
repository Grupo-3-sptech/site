var database = require("../database/config");

function capturarComponentes(fkRobo) {

    var instrucaoSql = ''
    var instrucaoSql2 = ''
    var instrucaoSql3 = ''
    var instrucaoSql4 = ''
    var instrucaoSql5 = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select * from registros where fkComponente = 19 and fkRoboRegistro = 1;
        `;

        instrucaoSql2 = `
        select * from registros where fkComponente = 8 and fkRoboRegistro = 1;

        `;

        instrucaoSql3 = `
        select * from registros where fkComponente = 13 and fkRoboRegistro = 1;

        `;

        instrucaoSql4 = `
        select * from registros where fkComponente = 1 and fkRoboRegistro = 1;
        `;

        instrucaoSql5 = `
        select * from registros where fkComponente = 5 and fkRoboRegistro = 1;

        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` 
        select * from registros where fkComponente = 19 and fkRoboRegistro = 1;
        `;

        instrucaoSql2 = `
        select * from registros where fkComponente = 8 and fkRoboRegistro = 1;

        `;

        instrucaoSql3 = `
        select * from registros where fkComponente = 13 and fkRoboRegistro = 1;

        `;

        instrucaoSql4 = `
        select * from registros where fkComponente = 1 and fkRoboRegistro = 1;

        `;

        instrucaoSql5 = `
        select * from registros where fkComponente = 5 and fkRoboRegistro = 1;

        `;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql + instrucaoSql2 + instrucaoSql3 + instrucaoSql4 + instrucaoSql5);


    return executarQueryEDevolverObjetoJSON(instrucaoSql, instrucaoSql2, instrucaoSql3, instrucaoSql4, instrucaoSql5)

}

async function executarQueryEDevolverObjetoJSON(instrucaoSql, instrucaoSql2, instrucaoSql3, instrucaoSql4, instrucaoSql5) {

    const latencia = await database.executar(instrucaoSql)
    const ram = await database.executar(instrucaoSql2)
    const disco = await database.executar(instrucaoSql3)
    const cpu = await database.executar(instrucaoSql4)
    const temperatura = await database.executar(instrucaoSql5)

    console.log(`DEBUG Latencia de internet: ${latencia}`)
    console.log(`DEBUG RAM: ${ram}`)
    console.log(`DEBUG Disco: ${disco}`)
    console.log(`DEBUG CPU: ${cpu}`)
    console.log(`DEBUG Temperatura: ${temperatura}`)

    return {
        latencia: latencia,
        ram: ram,
        disco: disco,
        cpu: cpu,
        temperatura: temperatura
    }
}

function dadosConsultaMedico(nomeUsuario) {
    var instrucaoSql = ""
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT * FROM VW_Cirurgia
        WHERE nomeMedico LIKE ${nomeUsuario}
        AND nome LIKE ${nomeUsuario};`

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` 
        SELECT * FROM VW_Cirurgia
        WHERE nomeMedico LIKE ${nomeUsuario}
        AND nome LIKE ${nomeUsuario};`
    }
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);


    return database.executar(instrucaoSql);

    

}

module.exports = {
    capturarComponentes,
    dadosConsultaMedico
}
