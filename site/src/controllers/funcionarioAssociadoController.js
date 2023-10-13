var funcionarioAssociadoModel = require("../models/funcionarioAssociadoModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    funcionarioAssociadoModel.listar()
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

function entrar(req, res) {
    var email = req.body.emailServer;


    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        
        funcionarioAssociadoModel.entrar(email)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var email = req.body.emailServer;
    var fkHospital = req.body.idHospitalServer;
    var fkEscalonamentoFuncionario = req.body.idEscalonamentoServer;


    // Faça as validações dos valores
    if (email == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (fkHospital == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (fkEscalonamentoFuncionario == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo funcionarioAssociadoModel.js
        funcionarioAssociadoModel.cadastrar(email, fkHospital, fkEscalonamentoFuncionario)
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


function verificarEmails(req, res) {

    var idHospital = req.params.idHospital;

    console.log(`Recuperando medidas em tempo real`);

    funcionarioAssociadoModel.verificarEmails(idHospital).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function deletar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idAssociado = req.body.idServer;


    // Faça as validações dos valores
    if (idAssociado == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo funcionarioAssociadoModel.js
        funcionarioAssociadoModel.deletar(idAssociado)
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
    entrar,
    cadastrar,
    listar,
    testar,
    verificarEmails,
    deletar
}