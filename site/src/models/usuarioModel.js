var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    SELECT u.nome, u.email, u.CPF as cpf, u.telefone, u.fkHospital, h.nomeFantasia,e.cargo FROM Usuario u
    JOIN EscalonamentoUsuario e ON u.fkEscalonamento = e.idEscalonamento
    JOIN Hospital h ON u.fkHospital = h.idHospital
    WHERE u.email = '${email}' AND u.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha,cpf, telefone, hospital, cargo) {
    var instrucao = `
        INSERT INTO Usuario (nome, email, senha, cpf, telefone, fkHospital, fkEscalonamento) VALUES ('${nome}', '${email}', '${senha}', '${cpf}', '${telefone}', '${hospital}', '${cargo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar() {
    console.log("ACESSEI O associado MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT u.fkEscalonamento as idCargo ,u.idUsuario, u.nome, u.email, u.CPF as cpf, u.telefone, u.senha, u.fkHospital, h.nomeFantasia, e.cargo FROM Usuario u
    JOIN EscalonamentoUsuario e ON u.fkEscalonamento = e.idEscalonamento
    JOIN Hospital h ON u.fkHospital = h.idHospital;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idUsuario) {
    console.log("ACESSEI O associado MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
        DELETE FROM Usuario WHERE idUsuario  = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(email, senha, nome, cargo, telefone, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha, nome, cargo, telefone, idUsuario)
    var instrucao = `
    UPDATE Usuario SET email = "${email}", senha = "${senha}", nome = "${nome}", telefone = "${telefone}",
    fkEscalonamento = ${cargo} WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    editar,
    deletar,
    listar,
    autenticar,
    cadastrar
};