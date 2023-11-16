var database = require("../database/config")

// function autenticar(email, senha) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
//     var instrucao = `
//     SELECT u.nome, u.email, u.CPF as cpf, u.telefone, u.fkHospital, h.nomeFantasia,e.cargo FROM Usuario u
//     JOIN EscalonamentoUsuario e ON u.fkEscalonamento = e.idEscalonamento
//     JOIN Hospital h ON u.fkHospital = h.idHospital
//     WHERE u.email = '${email}' AND u.senha = '${senha}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }



// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome_medico, data_inicio, horario_inicio,duracao, nome_paciente, fkRoboCirurgia, categoria, risco) {
    var instrucao = `
    INSERT INTO cirurgia (nomeMedico, dataInicio, duracao, nomePaciente, fkRoboCirurgia, tipo, fkCategoria) VALUES 
    ('${nome_medico}', '${data_inicio} ${horario_inicio}', '${duracao}', '${nome_paciente}', ${fkRoboCirurgia}, '${categoria}', ${risco});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listar() {
    console.log("ACESSEI O associado MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT idCirurgia,nomeMedico, DATE_FORMAT(dataInicio, '%Y-%m-%d') AS dataInicio, DATE_FORMAT(dataInicio, '%H:%i:%s') AS dataHorario, duracao, nomePaciente, tipo, numero as sala, fkCategoria FROM cirurgia c
    JOIN RoboCirurgiao r ON r.idRobo = c.fkRoboCirurgia
    JOIN categoriaCirurgia g ON g.idCategoria = c.fkCategoria
    JOIN salacirurgiao s ON s.fkRoboSala = r.idRobo;
    `;
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

function editar(nome_medico, data_inicio, horario_inicio,duracao, nome_paciente, fkRoboCirurgia, categoria, risco, idCirurgia) {
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