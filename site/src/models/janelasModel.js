var database = require("../database/config");


function fechar(janela, id) {
    console.log("aqui aqui sou o id", id)

    console.log("ACESSEI O JANELAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", janela);

    var instrucaoSql1 = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql1 = `INSERT INTO Janela_fechada (janela_a_fechar, sinal_terminacao, fkMaquina1)
        VALUES ('${janela}', 1, ${id});
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql1 = `
            INSERT INTO Janela_fechada (janela_a_fechar, sinal_terminacao, fkMaquina1)
            VALUES ('${janela}', 1, ${id});

        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

function buscarUltimasMedidasJa(id) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function colJanela(id) {

  if (process.env.AMBIENTE_PROCESSO == "producao") {
      var instrucao = `SELECT Janela_atual
      FROM Janela
      WHERE fkMaquina = ${id}
      ORDER BY idJanela DESC
      LIMIT 1;`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      var instrucao = `SELECT Janela_atual
      FROM Janela
      WHERE fkMaquina = ${id}
      ORDER BY idJanela DESC
      LIMIT 1;`;
  } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
  }

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);

}
module.exports = {
    buscarUltimasMedidasJa,
    colJanela,
    fechar
}
