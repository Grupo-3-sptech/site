var database = require("../database/config");

function buscarUltimosAlertas() {

    var instrucaoSql = ''
    var instrucaoSql2 = ''
    var instrucaoSql3 = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT
            *,
        FORMAT(dtHora, 'dd/MM/yyyy HH:mm:ss') AS data_formatada
        FROM Alerta
        WHERE
        tipo_alerta = 'critico'
        AND dtHora >= DATEADD(MINUTE, -1, GETDATE())

        `;

        instrucaoSql2 = `
        SELECT
            *,
        FORMAT(dtHora, 'dd/MM/yyyy HH:mm:ss') AS data_formatada
        FROM Alerta
        WHERE
        tipo_alerta = 'urgente'
        AND dtHora >= DATEADD(MINUTE, -1, GETDATE())

        `;

        instrucaoSql3 = `
        SELECT
            *,
        FORMAT(dtHora, 'dd/MM/yyyy HH:mm:ss') AS data_formatada
        FROM Alerta
        WHERE
        tipo_alerta = 'alerta'
        AND dtHora >= DATEADD(MINUTE, -1, GETDATE())

        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT
            *,
        DATE_FORMAT(dtHora, 'dd/MM/yyyy HH:mm:ss') AS data_formatada
        FROM Alerta
        WHERE
        tipo_alerta = 'alerta'
        AND dtHora >= DATE_SUB(NOW(), INTERVAL 1 MINUTE)

        `;

        instrucaoSql2 = `
        SELECT
            *,
        DATE_FORMAT(dtHora, 'dd/MM/yyyy HH:mm:ss') AS data_formatada
        FROM Alerta
        WHERE
        tipo_alerta = 'urgente'
        AND dtHora >= DATE_SUB(NOW(), INTERVAL 1 MINUTE)

        `;

        instrucaoSql3 = `
        SELECT
            *,
        DATE_FORMAT(dtHora, 'dd/MM/yyyy HH:mm:ss') AS data_formatada
        FROM Alerta
        WHERE
        tipo_alerta = 'critico'
        AND dtHora >= DATE_SUB(NOW(), INTERVAL 1 MINUTE)

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
        instrucaoSql = `
            SELECT count(idAlerta) as alertas FROM Alerta WHERE 
            tipo_alerta = "alerta"
            AND dtHora >=  DATEADD(${intervalo}, -1, GETDATE())
            `;

        instrucaoSql2 = `
            SELECT count(idAlerta) as alertas FROM Alerta WHERE 
            tipo_alerta = "urgente"
            AND dtHora >=  DATEADD(${intervalo}, -1, GETDATE())
            `;

        instrucaoSql3 = `
            SELECT count(idAlerta) as alertas FROM Alerta WHERE 
            tipo_alerta = "critico"
            AND dtHora >= DATEADD(${intervalo}, -1, GETDATE())
            `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
            SELECT COUNT(idQuantidadeAlerta) as alertas FROM quantidadeAlerta 
            WHERE dtHora >= date_sub(now(), INTERVAL 1 ${intervalo})
            AND tipo_alerta = "alerta"
            `;

        instrucaoSql2 = `
            SELECT COUNT(idQuantidadeAlerta) as alertas FROM quantidadeAlerta 
            WHERE dtHora >= date_sub(now(), INTERVAL 1 ${intervalo})
            AND tipo_alerta = "urgente"
            `;

        instrucaoSql3 = `
            SELECT COUNT(idQuantidadeAlerta) as alertas FROM quantidadeAlerta 
            WHERE dtHora >= date_sub(now(), INTERVAL 1 ${intervalo})
            AND tipo_alerta = "critico"
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
