var cirurgiaModel = require("../models/cirurgiaModel");
var aquarioModel = require("../models/aquarioModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var nome_medico = req.body.nome_medicoServer;
    var data_inicio = req.body.data_inicioServer;
    var horario_inicio = req.body.horario_inicioServer;
    var duracao = req.body.duracaoServer;
    var nome_paciente = req.body.nome_pacienteServer;
    var fkRoboCirurgia = req.body.fkRoboCirurgiaServer;
    var categoria = req.body.categoriaServer;
    var risco = req.body.riscoServer;

    // Faça as validações dos valores
    if (nome_medico == undefined) {
        res.status(400).send("Nome médico está undefined!");
    } else if (data_inicio == undefined) {
        res.status(400).send("Data início está undefined!");
    } else if (horario_inicio == undefined) {
        res.status(400).send("Horário Inicio está undefined!");
    } else if (duracao == undefined) {
        res.status(400).send("Duração está undefined!");
    } else if (nome_paciente == undefined) {
        res.status(400).send("Nome do paciente está undefined!");
    } else if (fkRoboCirurgia == undefined) {
        res.status(400).send("fkRoboCirurgia está undefined!");
    }else if (categoria == undefined) {
        res.status(400).send("Categoria está undefined!");
    }else if (risco == undefined) {
        res.status(400).send("Risco está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        cirurgiaModel.cadastrar(nome_medico, data_inicio, horario_inicio,duracao, nome_paciente, fkRoboCirurgia, categoria, risco )
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editar(req, res) {
    var nome_medico = req.body.nome_medicoServer
    var data_inicio = req.body.data_inicioServer
    var horario_inicio = req.body.horario_inicioServer
    var duracao = req.body.duracaoServer
    var nome_paciente = req.body.nome_pacienteServer
    var categoria = req.body.categoriaServer
    var risco = req.body.riscoServer
    var idCirurgia = req.body.cirurgiaServer
    var fkRoboCirurgia = req.body.fkRoboCirurgiaServer

    // Faça as validações dos valores
    if (nome_medico == undefined) {
        res.status(400).send("Nome médico está undefined!");
    } else if (data_inicio == undefined) {
        res.status(400).send("Data início está undefined!");
    } else if (idCirurgia == undefined) {
        res.status(400).send("Data início está undefined!");
    }else if (horario_inicio == undefined) {
        res.status(400).send("Horário Inicio está undefined!");
    } else if (duracao == undefined) {
        res.status(400).send("Duração está undefined!");
    } else if (nome_paciente == undefined) {
        res.status(400).send("Nome do paciente está undefined!");
    } else if (categoria == undefined) {
        res.status(400).send("Categoria está undefined!");
    }else if (risco == undefined) {
        res.status(400).send("Risco está undefined!");
    }else if (fkRoboCirurgia == undefined) {
        res.status(400).send("Risco está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        cirurgiaModel.editar(nome_medico, data_inicio, horario_inicio,duracao, nome_paciente, fkRoboCirurgia,categoria, risco, idCirurgia )
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listar(req, res) {
    cirurgiaModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function deletar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idUsuario = req.body.idServer;


    // Faça as validações dos valores
    if (idUsuario == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo funcionarioAssociadoModel.js
        cirurgiaModel.deletar(idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    erro = "esse email ja foi cadastrado"
                    res.status(500).json(erro);
                }
            );
    }
}

module.exports = {
    editar,
    deletar,
    listar,
    cadastrar
}