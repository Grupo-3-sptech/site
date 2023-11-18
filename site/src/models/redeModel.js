var database = require("../database/config");


function buscarDadosRede() {

    var instrucaoSql = ''
    const listaInstrucao = []
   
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        i = 15
        while(i <= 19){
            instrucaoSql = `
            SELECT * FROM VW_dadosRede WHERE idComponentes = ${i}
            AND HorarioDado >= DATEADD(MINUTE, -1, GETDATE());
            `;
            i++
            listaInstrucao.push(instrucaoSql)
        }  
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        i = 15
        while(i <= 19){
            instrucaoSql = `
            SELECT * FROM VW_dadosRede WHERE idComponentes = ${i}
            AND HorarioDado >= DATE_SUB(NOW(), INTERVAL 1 MINUTE);
            `;
            i++
            listaInstrucao.push(instrucaoSql)
        }  
       

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
  
    return executarQueryEDevolverObjetoJSON(listaInstrucao)
}

async function executarQueryEDevolverObjetoJSON(listaInstrucao) {
    const statusRede = await database.executar(listaInstrucao[0])
    const latenciaRede = await database.executar(listaInstrucao[1])
    const bytesEnviados = await database.executar(listaInstrucao[2])
    const bytesRecebidos = await database.executar(listaInstrucao[3])
    const velocidadeRede = await database.executar(listaInstrucao[4])

    return {
        statusRede: statusRede,
        latenciaRede: latenciaRede,
        bytesEnviados: bytesEnviados,
        bytesRecebidos: bytesRecebidos,
        velocidadeRede: velocidadeRede
    }
}




module.exports = {
    buscarDadosRede
}
