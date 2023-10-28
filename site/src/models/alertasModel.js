var database = require("../database/config");

function buscarUltimosAlertas() {

    var instrucaoSql = ''
    var instrucaoSql2 = ''
    var instrucaoSql3 = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT
            *,
        DATE_FORMAT(dtHora, '%d/%m/%Y %H:%i:%s') AS data_formatada
        FROM Alerta
        WHERE
        tipo_alerta = 'critico'
        AND dtHora >= DATE_SUB(NOW(), INTERVAL 1 MINUTE);

        `;

        instrucaoSql2 = `
        SELECT
            *,
        DATE_FORMAT(dtHora, '%d/%m/%Y %H:%i:%s') AS data_formatada
        FROM Alerta
        WHERE
        tipo_alerta = 'urgente'
        AND dtHora >= DATE_SUB(NOW(), INTERVAL 1 MINUTE);

        `;

        instrucaoSql3 = `
        SELECT
            *,
        DATE_FORMAT(dtHora, '%d/%m/%Y %H:%i:%s') AS data_formatada
        FROM Alerta
        WHERE
        tipo_alerta = 'alerta'
        AND dtHora >= DATE_SUB(NOW(), INTERVAL 1 MINUTE);

        `;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql + instrucaoSql2 + instrucaoSql3);


    return executarQueryEDevolverObjetoJSON(instrucaoSql, instrucaoSql2, instrucaoSql3)

}

function buscarQuantidadeDeAlertas(intervalo) {

    var instrucaoSql = ''
    var instrucaoSql2 = ''
    var instrucaoSql3 = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
            dht11_temperatura as temperatura, 
            dht11_umidade as umidade,  
                            momento,
                            FORMAT(momento, 'HH:mm:ss') as momento_grafico
                        from medida
                        where fk_aquario = ${idAquario}
                        order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
            SELECT COUNT(idQuantidadeAlerta) as alertas FROM quantidadeAlerta 
            WHERE dtHora <= date_sub(now(), INTERVAL 1 ${intervalo})
            AND tipo_alerta = "critico"
            `;

        instrucaoSql2 = `
            SELECT COUNT(idQuantidadeAlerta) as alertas FROM quantidadeAlerta 
            WHERE dtHora <= date_sub(now(), INTERVAL 1 ${intervalo})
            AND tipo_alerta = "urgente"
            `;

        instrucaoSql3 = `
            SELECT COUNT(idQuantidadeAlerta) as alertas FROM quantidadeAlerta 
            WHERE dtHora <= date_sub(now(), INTERVAL 1 ${intervalo})
            AND tipo_alerta = "alerta"
            `;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    return executarQueryEDevolverObjetoJSON(instrucaoSql, instrucaoSql2, instrucaoSql3)
}

async function executarQueryEDevolverObjetoJSON(instrucaoSql, instrucaoSql2, instrucaoSql3) {

    const atencao = await database.executar(instrucaoSql)
    const urgente = await database.executar(instrucaoSql2)
    const critico = await database.executar(instrucaoSql3)

    console.log(`DEBUG atencao: ${atencao}`)
    console.log(`DEBUG urgente: ${urgente}`)
    console.log(`DEBUG critico: ${critico}`)

    return {
        atencao: atencao,
        urgente: urgente,
        critico: critico
    }
}




module.exports = {
    buscarUltimosAlertas,
    buscarQuantidadeDeAlertas
}
