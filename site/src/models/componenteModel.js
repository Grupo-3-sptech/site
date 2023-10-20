var database = require("../database/config");

function buscarUltimasMedidas(id, tempo, limite_linhas) {

  instrucaoSql = ''
  if (tempo == "atual") {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `WITH LinhasComponentes AS (
          SELECT
            r.idRegistro,
            DATE_FORMAT(r.HorarioDado, '%HH:%mm:%ss') AS HorarioFormatado,
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
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `WITH LinhasComponentes AS (
            SELECT
              r.idRegistro,
              DATE_FORMAT(r.HorarioDado, '%HH:%mm:%ss') AS HorarioFormatado,
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
  } else if (tempo == "dia") {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `SELECT
      DATE_FORMAT(HorarioDado, '%d/%m/%Y %H') as HorarioFormatado,
      round(AVG(dado),2) AS dado,
      c.nome AS nomeComponente
    FROM Registros r
    JOIN componentes c ON r.fkComponente = c.idComponentes
    WHERE r.fkRoboRegistro = ${id}
    AND HorarioDado >= NOW() - INTERVAL 24 HOUR AND HorarioDado <= NOW()
    GROUP BY DATE_FORMAT(HorarioDado, '%d/%m/%Y %H'), nomeComponente
    ORDER BY HorarioFormatado;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `SELECT
      DATE_FORMAT(HorarioDado, '%d/%m/%Y %H') as HorarioFormatado,
      round(AVG(dado),2) AS dado,
      c.nome AS nomeComponente
    FROM Registros r
    JOIN componentes c ON r.fkComponente = c.idComponentes
    WHERE r.fkRoboRegistro = ${id}
    AND HorarioDado >= NOW() - INTERVAL 24 HOUR AND HorarioDado <= NOW()
    GROUP BY DATE_FORMAT(HorarioDado, '%d/%m/%Y %H'), nomeComponente
    ORDER BY HorarioFormatado ;`;
    } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
    }
  } else if (tempo == "mes"){
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `SELECT
      DATE_FORMAT(HorarioDado, '%d/%m/%Y') as HorarioFormatado,
      round(AVG(dado),2) AS dado,
      c.nome AS nomeComponente
    FROM Registros r
    JOIN componentes c ON r.fkComponente = c.idComponentes
    WHERE r.fkRoboRegistro = ${id}
    AND HorarioDado >= NOW() - INTERVAL 30 DAY AND HorarioDado <= NOW()
    GROUP BY DATE_FORMAT(HorarioDado, '%d/%m/%Y'), nomeComponente
    ORDER BY HorarioFormatado 
    LIMIT 90;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `SELECT
      DATE_FORMAT(HorarioDado, '%d/%m/%Y') as HorarioFormatado,
      round(AVG(dado),2) AS dado,
      c.nome AS nomeComponente
    FROM Registros r
    JOIN componentes c ON r.fkComponente = c.idComponentes
    WHERE r.fkRoboRegistro = ${id}
    AND HorarioDado >= NOW() - INTERVAL 30 DAY AND HorarioDado <= NOW()
    GROUP BY DATE_FORMAT(HorarioDado, '%d/%m/%Y'), nomeComponente
    ORDER BY HorarioFormatado 
    LIMIT 90;`;
    } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
    }
  } else if(tempo == "ano"){
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `SELECT
      DATE_FORMAT(HorarioDado, '%m/%Y') as HorarioFormatado,
      round(AVG(dado),2) AS dado,
      c.nome AS nomeComponente
    FROM Registros r
    JOIN componentes c ON r.fkComponente = c.idComponentes
    WHERE r.fkRoboRegistro = ${id}
    AND HorarioDado >= NOW() - INTERVAL 1 YEAR AND HorarioDado <= NOW()
    GROUP BY DATE_FORMAT(HorarioDado, '%m/%Y'), nomeComponente
    ORDER BY HorarioFormatado 
    LIMIT 36;
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `SELECT
      DATE_FORMAT(HorarioDado, '%m/%Y') as HorarioFormatado,
      round(AVG(dado),2) AS dado,
      c.nome AS nomeComponente
    FROM Registros r
    JOIN componentes c ON r.fkComponente = c.idComponentes
    WHERE r.fkRoboRegistro = ${id}
    AND HorarioDado >= NOW() - INTERVAL 1 YEAR AND HorarioDado <= NOW()
    GROUP BY DATE_FORMAT(HorarioDado, '%m/%Y'), nomeComponente
    ORDER BY HorarioFormatado 
    LIMIT 36;
    `;
    } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
    }
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
