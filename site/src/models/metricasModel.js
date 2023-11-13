var database = require("../database/config");

function buscarMetricas() {

  instrucaoSql = `SELECT 
  componentes.fkMetrica,
  componentes.nome,
  Metrica.alerta,
  Metrica.urgente,
  Metrica.critico,
  Metrica.idMetrica,
  componentes.idComponentes,
  componentes.unidade
  FROM componentes
  RIGHT JOIN Metrica 
  ON idMetrica = fkMetrica;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function updateMetricas(fkMetrica, alerta, urgente, critico){
  instrucaoSql = `
  UPDATE metrica SET alerta = 
  ${alerta}, 
  urgente = ${urgente},
  critico = ${critico}
  WHERE idMetrica = ${fkMetrica}; 
  `
  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

function excluirMetricas(idMetrica){
 instrucaoSql = 
  `
  DELETE FROM Metrica where idMetrica = ${idMetrica}
  `
  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}


module.exports = {
    buscarMetricas,
    updateMetricas,
    excluirMetricas
}
