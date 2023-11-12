var database = require("../database/config");

function buscarMetricas() {

  instrucaoSql = `SELECT 
  componentes.fkMetrica,
  componentes.nome,
  Metrica.alerta,
  Metrica.urgente,
  Metrica.critico,
  componentes.unidade
  FROM componentes
  JOIN Metrica 
  ON idMetrica = fkMetrica;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
    buscarMetricas
}
