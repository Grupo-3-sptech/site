var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome_medico, data_inicio, horario_inicio, duracao, nome_paciente, fkRoboCirurgia, categoria, risco) {
    var instrucao = `
    INSERT INTO cirurgia (nomeMedico, dataInicio, duracao, nomePaciente, fkRoboCirurgia, tipo, fkCategoria) VALUES 
    ('${nome_medico}', '${data_inicio} ${horario_inicio}', '${duracao}', '${nome_paciente}', ${fkRoboCirurgia}, '${categoria}', ${risco});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listar(fkHospital) {
    console.log("ACESSEI O associado MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    if(process.env.AMBIENTE_PROCESSO == "producao"){
        var instrucao = `WITH AlertasNumerados AS (
            SELECT 
                a.tipo_alerta,
                a.dado,
                a.fkRobo,
                DATE_FORMAT(a.dtHora, '%d/%m/%Y %H:%i:%s') as dtHoraComponente,
                a.nome_componente,
                cn.unidade,
                s.numero,
                DATE_FORMAT(c.dataInicio, '%d/%m/%Y %H:%i:%s') as dtHoraCirurgia,
                DATE_FORMAT(TIMESTAMPADD(MINUTE, c.duracao, c.dataInicio), '%d/%m/%Y %H:%i:%s') as dtHoraFimCirurgia,
                c.duracao,
                c.nomePaciente,
                c.nomeMedico,
                c.tipo,
                cr.niveisPericuloridade as risco,
                ROW_NUMBER() OVER (PARTITION BY a.nome_componente ORDER BY a.dado DESC) AS numAlerta
            FROM 
                alerta a
            JOIN 
                salaCirurgiao s ON s.fkRoboSala = a.fkRobo
            JOIN 
                cirurgia c ON a.dtHora BETWEEN c.dataInicio AND TIMESTAMPADD(MINUTE, c.duracao, c.dataInicio)
            JOIN 
                RoboCirurgiao r ON r.fkHospital = ${fkHospital}
            JOIN 
                categoriaCirurgia cr ON c.fkCategoria = cr.idCategoria
            JOIN 
                componentes cn ON a.nome_componente = cn.nome
        )
        SELECT 
            tipo_alerta,
            dado,
            fkRobo,
            dtHoraComponente,
            nome_componente,
            unidade,
            numero,
            dtHoraCirurgia,
            dtHoraFimCirurgia,
            duracao,
            nomePaciente,
            nomeMedico,
            tipo,
            risco
        FROM 
            AlertasNumerados
        WHERE 
            numAlerta <= 1;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        WITH AlertasNumerados AS (
            SELECT 
                a.tipo_alerta,
                a.dado,
                a.fkRobo,
                DATE_FORMAT(a.dtHora, '%d/%m/%Y %H:%i:%s') as dtHoraComponente,
                a.nome_componente,
                cn.unidade,
                s.numero,
                DATE_FORMAT(c.dataInicio, '%d/%m/%Y %H:%i:%s') as dtHoraCirurgia,
                DATE_FORMAT(TIMESTAMPADD(MINUTE, c.duracao, c.dataInicio), '%d/%m/%Y %H:%i:%s') as dtHoraFimCirurgia,
                c.duracao,
                c.nomePaciente,
                c.nomeMedico,
                c.tipo,
                cr.niveisPericuloridade as risco,
                ROW_NUMBER() OVER (PARTITION BY a.nome_componente ORDER BY a.dado DESC) AS numAlerta
            FROM 
                alerta a
            JOIN 
                salaCirurgiao s ON s.fkRoboSala = a.fkRobo
            JOIN 
                cirurgia c ON a.dtHora BETWEEN c.dataInicio AND TIMESTAMPADD(MINUTE, c.duracao, c.dataInicio)
            JOIN 
                RoboCirurgiao r ON r.fkHospital = ${fkHospital}
            JOIN 
                categoriaCirurgia cr ON c.fkCategoria = cr.idCategoria
            JOIN 
                componentes cn ON a.nome_componente = cn.nome
        )
        SELECT 
            tipo_alerta,
            dado,
            fkRobo,
            dtHoraComponente,
            nome_componente,
            unidade,
            numero,
            dtHoraCirurgia,
            dtHoraFimCirurgia,
            duracao,
            nomePaciente,
            nomeMedico,
            tipo,
            risco
        FROM 
            AlertasNumerados
        WHERE 
            numAlerta <= 1;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idCirurgia) {
    console.log("ACESSEI O associado MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
        DELETE FROM cirurgia WHERE idCirurgia  = '${idCirurgia}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(nome_medico, data_inicio, horario_inicio, duracao, nome_paciente, fkRoboCirurgia, categoria, risco, idCirurgia) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `

    UPDATE cirurgia SET nomeMedico = "${nome_medico}", dataInicio = "${data_inicio} ${horario_inicio}", duracao = "${duracao}", nomePaciente = "${nome_paciente}", fkRoboCirurgia = "${fkRoboCirurgia}",
    tipo = '${categoria}', fkCategoria = "${risco}" WHERE idCirurgia = ${idCirurgia};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    editar,
    deletar,
    listar,
    cadastrar
};

// SELECT 
//     a.tipo_alerta,
//     a.dado,
//     a.fkRobo,
//     DATE_FORMAT(a.dtHora, '%d/%m/%Y %H:%i:%s') as dtHoraComponente,
//     a.nome_componente,
//     s.numero,
//     DATE_FORMAT(c.dataInicio, '%d/%m/%Y %H:%i:%s') as dtHoraCirurgia,
//     DATE_FORMAT(TIMESTAMPADD(MINUTE, c.duracao, c.dataInicio), '%d/%m/%Y %H:%i:%s') as dtHoraFimCirurgia,
//     c.duracao,
//     c.nomePaciente,
//     c.nomeMedico,
//     c.tipo,
//     cr.niveisPericuloridade as risco
//         FROM 
//             alerta a
//         JOIN 
//             salaCirurgiao s ON s.fkRoboSala = a.fkRobo
//         JOIN 
//             cirurgia c ON a.dtHora BETWEEN c.dataInicio AND TIMESTAMPADD(MINUTE, c.duracao, c.dataInicio)
// 		JOIN 
// 			RoboCirurgiao r ON r.fkHospital = 1
//         JOIN 
//             categoriaCirurgia cr ON c.fkCategoria = cr.idCategoria;