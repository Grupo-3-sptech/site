var database = require("../database/config");

function buscarUltimasMedidas(id, tempo, limite_linhas) {
  instrucaoSql = "";
  if (tempo == "atual") {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `WITH LinhasComponentes AS (
          SELECT
            r.idRegistro,
            FORMAT(r.HorarioDado, 'HH:mm:ss') AS HorarioFormatado,
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
      console.log(
        "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
      );
      return;
    }
  } else if (tempo == "dia") {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `SELECT
      FORMAT(HorarioDado, 'dd/MM/yyyy HH') as HorarioFormatado,
      ROUND(AVG(CONVERT(float, dado)), 2) AS dado,
      c.nome AS nomeComponente
  FROM Registros r
  JOIN componentes c ON r.fkComponente = c.idComponentes
  WHERE r.fkRoboRegistro = @id
      AND HorarioDado >= DATEADD(DAY, -1, SYSDATETIME()) AND HorarioDado <= SYSDATETIME()
  GROUP BY FORMAT(HorarioDado, 'dd/MM/yyyy HH'), c.nome
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
      console.log(
        "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
      );
      return;
    }
  } else if (tempo == "mes") {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `SELECT
      FORMAT(HorarioDado, 'dd/MM/yyyy') as HorarioFormatado,
      ROUND(AVG(CONVERT(float, dado)), 2) AS dado,
      c.nome AS nomeComponente
  FROM Registros r
  JOIN componentes c ON r.fkComponente = c.idComponentes
  WHERE r.fkRoboRegistro = @id
      AND HorarioDado >= DATEADD(MONTH, -1, SYSDATETIME()) AND HorarioDado <= SYSDATETIME()
  GROUP BY FORMAT(HorarioDado, 'dd/MM/yyyy'), c.nome
  ORDER BY HorarioFormatado
  OFFSET 0 ROWS
  FETCH NEXT 90 ROWS ONLY;
  `;
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
      console.log(
        "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
      );
      return;
    }
  } else if (tempo == "ano") {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `SELECT TOP 36
      FORMAT(HorarioDado, 'MM/yyyy') as HorarioFormatado,
      ROUND(AVG(CONVERT(float, dado)), 2) AS dado,
      c.nome AS nomeComponente
  FROM Registros r
  JOIN componentes c ON r.fkComponente = c.idComponentes
  WHERE r.fkRoboRegistro = ${id}
      AND HorarioDado >= DATEADD(YEAR, -1, SYSDATETIME()) AND HorarioDado <= SYSDATETIME()
  GROUP BY FORMAT(HorarioDado, 'MM/yyyy'), nomeComponente
  ORDER BY HorarioFormatado;
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
      console.log(
        "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
      );
      return;
    }
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasResumo(id, tempo) {
  instrucaoSql = "";
  if (tempo == "atual") {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `WITH LinhasComponentes AS (
    SELECT
        r.idRegistro,
        FORMAT(r.HorarioDado, 'HH:mm:ss') AS HorarioFormatado,
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
FROM LinhasComponentes
WHERE linha_num <= 1;
`;
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
              FROM LinhasComponentes WHERE linha_num <= 1;`;
    } else {
      console.log(
        "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
      );
      return;
    }
  } else if (tempo == "dia") {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `SELECT
      FORMAT(HorarioDado, 'dd/MM/yyyy') as DiaFormatado,
      ROUND(AVG(CONVERT(float, dado)), 2) AS dado,
      c.nome AS nomeComponente
  FROM Registros r
  JOIN componentes c ON r.fkComponente = c.idComponentes
  WHERE r.fkRoboRegistro = ${id}
      AND HorarioDado >= DATEADD(DAY, -1, SYSDATETIME()) AND HorarioDado <= SYSDATETIME()
  GROUP BY FORMAT(HorarioDado, 'dd/MM/yyyy'), c.nome
  ORDER BY DiaFormatado;
  `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `SELECT
          DATE_FORMAT(HorarioDado, '%d/%m/%Y') as DiaFormatado,
          round(AVG(dado), 2) AS dado,
          c.nome AS nomeComponente
        FROM Registros r
        JOIN componentes c ON r.fkComponente = c.idComponentes
        WHERE r.fkRoboRegistro = ${id}
          AND HorarioDado >= NOW() - INTERVAL 24 HOUR AND HorarioDado <= NOW()
        GROUP BY DiaFormatado, nomeComponente
        ORDER BY DiaFormatado;`;
    } else {
      console.log(
        "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
      );
      return;
    }
  } else if (tempo == "mes") {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `SELECT
      FORMAT(HorarioDado, 'MM/yyyy') as MesFormatado,
      ROUND(AVG(CONVERT(float, dado)), 2) AS dado,
      c.nome AS nomeComponente
  FROM Registros r
  JOIN componentes c ON r.fkComponente = c.idComponentes
  WHERE r.fkRoboRegistro = ${id}
      AND HorarioDado >= DATEADD(MONTH, -1, SYSDATETIME()) AND HorarioDado <= SYSDATETIME()
  GROUP BY FORMAT(HorarioDado, 'MM/yyyy'), c.nome
  ORDER BY MesFormatado;
  `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `SELECT
      DATE_FORMAT(HorarioDado, '%m/%Y') as MesFormatado,
      round(AVG(dado), 2) AS dado,
      c.nome AS nomeComponente
    FROM Registros r
    JOIN componentes c ON r.fkComponente = c.idComponentes
    WHERE r.fkRoboRegistro = ${id}
      AND HorarioDado >= NOW() - INTERVAL 30 DAY AND HorarioDado <= NOW()
    GROUP BY MesFormatado, nomeComponente
    ORDER BY MesFormatado;`;
    } else {
      console.log(
        "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
      );
      return;
    }
  } else if (tempo == "ano") {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `SELECT
      FORMAT(HorarioDado, 'yyyy') as AnoFormatado,
      ROUND(AVG(CONVERT(float, dado)), 2) AS dado,
      c.nome AS nomeComponente
  FROM Registros r
  JOIN componentes c ON r.fkComponente = c.idComponentes
  WHERE r.fkRoboRegistro = @id
      AND HorarioDado >= DATEADD(YEAR, -1, SYSDATETIME()) AND HorarioDado <= SYSDATETIME()
  GROUP BY FORMAT(HorarioDado, 'yyyy'), c.nome
  ORDER BY AnoFormatado;
  `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `SELECT
      DATE_FORMAT(HorarioDado, '%Y') as AnoFormatado,
      ROUND(AVG(dado), 2) AS dado,
      c.nome AS nomeComponente
    FROM Registros r
    JOIN componentes c ON r.fkComponente = c.idComponentes
    WHERE r.fkRoboRegistro = ${id}
      AND HorarioDado >= NOW() - INTERVAL 365 DAY AND HorarioDado <= NOW()
    GROUP BY AnoFormatado, nomeComponente
    ORDER BY AnoFormatado;`;
    } else {
      console.log(
        "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
      );
      return;
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


function buscarUltimasMedidasPorNome(id, tempo, limite_linhas, nomeComponente) {
  instrucaoSql = "";
  if (tempo == "atual") {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `WITH LinhasComponentes AS (
        SELECT
            r.idRegistro,
            FORMAT(r.HorarioDado, 'HH:mm:ss') AS HorarioFormatado,
            r.dado,
            c.nome AS nomeComponente,
            ROW_NUMBER() OVER (PARTITION BY c.nome ORDER BY r.dado DESC) AS linha_num
        FROM Registros r
        JOIN componentes c ON r.fkComponente = c.idComponentes
        JOIN cirurgia cr ON cr.fkRoboCirurgia = r.fkRoboRegistro
        WHERE r.fkRoboRegistro = ${id}
        AND c.nome = ${nomeComponente}
    )
    SELECT
        idRegistro,
        HorarioFormatado,
        dado,
        nomeComponente
    FROM LinhasComponentes
    WHERE linha_num <= ${limite_linhas}
    ORDER BY HorarioFormatado;
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `WITH LinhasComponentes AS (
        SELECT
          r.idRegistro,
          DATE_FORMAT(r.HorarioDado, '%H:%i:%s') AS HorarioFormatado,
          r.dado,
          c.nome AS nomeComponente,
          ROW_NUMBER() OVER (PARTITION BY c.nome ORDER BY r.dado DESC) AS linha_num
        FROM Registros r
        JOIN componentes c ON r.fkComponente = c.idComponentes
        JOIN cirurgia cr ON cr.fkRoboCirurgia = r.fkRoboRegistro
        WHERE r.fkRoboRegistro = ${id}
        AND c.nome = '${nomeComponente}'
      )
      SELECT
        idRegistro,
        HorarioFormatado,
        dado,
        nomeComponente
      FROM LinhasComponentes WHERE linha_num <= ${limite_linhas}
      ORDER BY HorarioFormatado;`;

    } else {
      console.log(
        "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
      );
      return;
    }
  } else if (tempo == "cirurgia") {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `WITH LinhasComponentes AS (
        SELECT
            r.idRegistro,
            FORMAT(r.HorarioDado, 'HH:mm:ss') AS HorarioFormatado,
            r.dado,
            c.nome AS nomeComponente,
            ROW_NUMBER() OVER (PARTITION BY c.nome ORDER BY r.dado DESC) AS linha_num
        FROM Registros r
        JOIN componentes c ON r.fkComponente = c.idComponentes
        JOIN cirurgia cr ON cr.fkRoboCirurgia = r.fkRoboRegistro
        WHERE r.fkRoboRegistro = ${id}
        AND c.nome = ${nomeComponente}
        AND r.HorarioDado BETWEEN cr.dataInicio AND DATEADD(MINUTE, cr.duracao, cr.dataInicio)
    )
    SELECT
        idRegistro,
        HorarioFormatado,
        dado,
        nomeComponente
    FROM LinhasComponentes
    WHERE linha_num <= ${limite_linhas}
    ORDER BY HorarioFormatado;
    
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `WITH LinhasComponentes AS (
        SELECT
          r.idRegistro,
          DATE_FORMAT(r.HorarioDado, '%H:%i:%s') AS HorarioFormatado,
          r.dado,
          c.nome AS nomeComponente,
          ROW_NUMBER() OVER (PARTITION BY c.nome ORDER BY r.dado DESC) AS linha_num
        FROM Registros r
        JOIN componentes c ON r.fkComponente = c.idComponentes
        JOIN cirurgia cr ON cr.fkRoboCirurgia = r.fkRoboRegistro
        WHERE r.fkRoboRegistro = ${id}
        AND c.nome = '${nomeComponente}'
        AND HorarioDado BETWEEN cr.dataInicio AND TIMESTAMPADD(MINUTE, cr.duracao, cr.dataInicio)
      )
      SELECT
        idRegistro,
        HorarioFormatado,
        dado,
        nomeComponente
      FROM LinhasComponentes WHERE linha_num <= ${limite_linhas}
      ORDER BY HorarioFormatado;`;
    } else {
      console.log(
        "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
      );
      return;
    }
  } else if (tempo == "dia") {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `SELECT
      FORMAT(HorarioDado, 'dd/MM/yyyy HH') as HorarioFormatado,
      ROUND(AVG(CONVERT(float, dado)), 2) AS dado,
      c.nome AS nomeComponente
  FROM Registros r
  JOIN componentes c ON r.fkComponente = c.idComponentes
  WHERE r.fkRoboRegistro = ${id}
      AND HorarioDado >= DATEADD(DAY, -1, SYSDATETIME()) AND HorarioDado <= SYSDATETIME()
  GROUP BY FORMAT(HorarioDado, 'dd/MM/yyyy HH'), c.nome
  ORDER BY HorarioFormatado;
  `;
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
      console.log(
        "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
      );
      return;
    }
  } else if (tempo == "mes") {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `SELECT TOP 90
      FORMAT(HorarioDado, 'dd/MM/yyyy') as HorarioFormatado,
      ROUND(AVG(CONVERT(float, dado)), 2) AS dado,
      c.nome AS nomeComponente
  FROM Registros r
  JOIN componentes c ON r.fkComponente = c.idComponentes
  WHERE r.fkRoboRegistro = @id
      AND HorarioDado >= DATEADD(MONTH, -1, SYSDATETIME()) AND HorarioDado <= SYSDATETIME()
  GROUP BY FORMAT(HorarioDado, 'dd/MM/yyyy'), c.nome
  ORDER BY HorarioFormatado;`;
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
      console.log(
        "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
      );
      return;
    }
  } else if (tempo == "ano") {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `SELECT TOP 36
      FORMAT(HorarioDado, 'MM/yyyy') as HorarioFormatado,
      ROUND(AVG(CONVERT(float, dado)), 2) AS dado,
      c.nome AS nomeComponente
  FROM Registros r
  JOIN componentes c ON r.fkComponente = c.idComponentes
  WHERE r.fkRoboRegistro = ${id}
      AND HorarioDado >= DATEADD(YEAR, -1, SYSDATETIME()) AND HorarioDado <= SYSDATETIME()
  GROUP BY FORMAT(HorarioDado, 'MM/yyyy'), c.nome
  ORDER BY HorarioFormatado;  
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
      console.log(
        "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
      );
      return;
    }
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarUsb(idRobo, conectado) {

  var instrucao = `
  SELECT DISTINCT nome, DATE_FORMAT(MAX(dataHora),'%d/%m/%Y %H:%i:%s') as dataHora FROM dispositivos_usb WHERE conectado = ${conectado} AND fkRoboUsb = ${idRobo}
  GROUP BY nome;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  buscarUltimasMedidas,
  // buscarMedidasEmTempoReal,
  buscarUltimasMedidasPorNome,
  buscarMedidasResumo,
  buscarUsb
};
