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

function capturarTemperatura(fkRobo){
    var instrucaoTemperatura = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoTemperatura = `
            select * from registros 
            where fkComponente = 5 
            and fkRoboRegistro = ${fkRobo};
            

        `;

        console.log("Executando a instrução SQL: \n" + instrucaoTemperatura);
        return database.executar(instrucaoTemperatura);
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoTemperatura = `

        select * from registros 
        where fkComponente = 5 
        and fkRoboRegistro = ${fkRobo};

        `;

        console.log("Executando a instrução SQL: \n" + instrucaoTemperatura);
        return database.executar(instrucaoTemperatura);

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
}

function getIdRobo(fkRobo) {
    var instrucaoIdRobo = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoIdRobo = `
            select idProcess 
            from RoboCirurgiao 
            where idRobo = ${fkRobo};

        `;

        console.log("Executando a instrução SQL: \n" + instrucaoIdRobo);
        return database.executar(instrucaoIdRobo);

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoIdRobo = `

            select idProcess 
            from RoboCirurgiao 
            where idRobo = ${fkRobo};

        `;

        console.log("Executando a instrução SQL: \n" + instrucaoIdRobo);
        return database.executar(instrucaoIdRobo);

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
}

function capturarPorcentagem(fkRobo) {
    var instrucaoPorcentagem = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoPorcentagem = `
            SELECT TOP 1 *
            FROM registros
            WHERE fkComponente = 1 
                AND fkRoboRegistro = ${fkRobo}
            ORDER BY HorarioDado DESC;
        

        `;

        console.log("Executando a instrução SQL: \n" + instrucaoPorcentagem);
        return database.executar(instrucaoPorcentagem);

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoPorcentagem = `

        select * from registros 
            where fkComponente = 1 
            and fkRoboRegistro = ${fkRobo}
            ORDER BY HorarioDado DESC
            LIMIT 1;

        `;

        console.log("Executando a instrução SQL: \n" + instrucaoPorcentagem);
        return database.executar(instrucaoPorcentagem);

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

        select TOP 30  dado from registros where fkComponente = 6 and fkRoboRegistro = ${fkRobo};

        `;

        instrucaoSql2 = `
        select TOP 30 dado from registros where fkComponente = 2 and fkRoboRegistro = ${fkRobo} ;

        `;

        instrucaoSql3 = `
        SELECT MAX(dado) AS dado
            FROM registros
            WHERE fkComponente = 5 AND fkRoboRegistro = ${fkRobo}
            AND HorarioDado >= DATEADD(MINUTE, -1, SYSDATETIME()) AND HorarioDado <= SYSDATETIME();

        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `

        select dado from registros where fkComponente = 6 and fkRoboRegistro = ${fkRobo} LIMIT 30;

        `;

        instrucaoSql2 = `
        select dado from registros where fkComponente = 2 and fkRoboRegistro =${fkRobo} LIMIT 30 ;

        `;

        instrucaoSql3 = `
        
            SELECT MAX(dado) AS dado
            FROM registros
            WHERE fkComponente = 5 AND fkRoboRegistro = ${fkRobo}
            AND HorarioDado BETWEEN DATE_ADD(NOW(), INTERVAL -1 MINUTE) AND NOW();

        `;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql + instrucaoSql2 + instrucaoSql3);


    return executarQueryEDevolverObjetoJSON(instrucaoSql, instrucaoSql2, instrucaoSql3)

}

function buscarUltimosAlertasGrafico(fkRobo, limite_linhas) {

    var instrucaoTemp = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoTemp = `

            SELECT TOP ${limite_linhas} *
            FROM registros
            WHERE fkComponente = 22 
            AND fkRoboRegistro = ${fkRobo}
            ORDER BY HorarioDado DESC;

        `;

        console.log("Executando a instrução SQL: \n" + instrucaoTemp);
        return database.executar(instrucaoTemp);

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoTemp = `

            select dado, DATE_FORMAT(HorarioDado, '%H:%i:%s') AS HorarioDado from registros 
            where fkComponente = 5
            and fkRoboRegistro = ${fkRobo}
            ORDER BY HorarioDado DESC
            LIMIT ${limite_linhas};

        `;

        console.log("Executando a instrução SQL: \n" + instrucaoTemp);
        return database.executar(instrucaoTemp);

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

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

async function executarQueryEDevolverObjetoJSONGrafico(instrucaoSql, instrucaoSql2, instrucaoSql3) {

    const processosGrafico = await database.executar(instrucaoSql)
    const temperaturaGrafico = await database.executar(instrucaoSql2)
    const cpuGrafico = await database.executar(instrucaoSql3)

    // console.log(`DEBUG Processos: ${processos}`)
    // console.log(`DEBUG velocidade: ${velocidade}`)
    // console.log(`DEBUG pico_temperatura: ${pico_temperatura}`)

    return {
        processosGrafico: processosGrafico,
        temperaturaGrafico: temperaturaGrafico,
        cpuGrafico: cpuGrafico
    }
}




module.exports = {
    listarProcessos,
    buscarUltimosAlertasGrafico,
    buscarUltimosAlertas,
    capturarPorcentagem,
    getIdRobo, 
    capturarTemperatura

}
