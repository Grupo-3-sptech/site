var database = require("../database/config");

function buscarUltimasMedidas(id, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT r.*
        FROM Registros r
        JOIN componentes c ON r.fkComponente = c.idComponentes
        WHERE c.nome = 'cpu'
        AND r.fkRoboRegistro = ${id}
                    order by r.idRegistro desc limit ${limite_linhas}`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `WITH LinhasComponentes AS (
            SELECT
              r.idRegistro,
              DATE_FORMAT(r.HorarioDado, '%d/%m/%Y') AS HorarioFormatado,
              r.dado,
              c.nome AS nomeComponente,
              ROW_NUMBER() OVER (PARTITION BY c.nome ORDER BY r.idRegistro DESC) AS linha_num
            FROM Registros r
            JOIN componentes c ON r.fkComponente = c.idComponentes
            WHERE r.fkRoboRegistro = ${id}
          )
          SELECT
            idRegistro,
            HorarioFormatado,
            dado,
            nomeComponente
          FROM LinhasComponentes WHERE linha_num <= ${limite_linhas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function buscarMedidasEmTempoReal(id) {

//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "producao") {
//         instrucaoSql = `SELECT r.*
//         FROM Registros r
//         JOIN componentes c ON r.fkComponente = c.idComponentes
//         WHERE c.nome = 'cpu'
//         AND r.fkRoboRegistro = ${id}
//                     order by r.idRegistro desc limit ${limite_linhas}`;

//     } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `SELECT r.*
//         FROM Registros r
//         JOIN componentes c ON r.fkComponente = c.idComponentes
//         WHERE c.nome = 'cpu'
//         AND r.fkRoboRegistro = ${id}
//                     order by r.idRegistro desc limit ${limite_linhas}`;
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }


module.exports = {
    buscarUltimasMedidas
    // buscarMedidasEmTempoReal
}
