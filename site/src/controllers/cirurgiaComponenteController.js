var cirurgiaComponenteModel = require("../models/cirurgiaComponenteModel");
const { spawn } = require('child_process');
// function autenticar(req, res) {
//     var email = req.body.emailServer;
//     var senha = req.body.senhaServer;

//     if (email == undefined) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está indefinida!");
//     } else {

//         cirurgiaComponenteModel.autenticar(email, senha)
//             .then(
//                 function (resultadoAutenticar) {
//                     console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
//                     console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

//                     if (resultadoAutenticar.length == 1) {
//                         console.log(resultadoAutenticar);
//                         res.json(resultadoAutenticar[0]);
//                     } else if (resultadoAutenticar.length == 0) {
//                         res.status(403).send("Email e/ou senha inválido(s)");
//                     } else {
//                         res.status(403).send("Mais de um usuário com o mesmo login e senha!");
//                     }
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }

// }

// function cadastrar(req, res) {
//     // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
//     var nome = req.body.nomeServer;
//     var email = req.body.emailServer;
//     var senha = req.body.senhaServer;
//     var cpf = req.body.cpfServer;
//     var telefone = req.body.telefoneServer;
//     var hospital = req.body.hospitalServer;
//     var cargo = req.body.cargoServer;
//     // Faça as validações dos valores
//     if (nome == undefined) {
//         res.status(400).send("Seu nome está undefined!");
//     } else if (email == undefined) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está undefined!");
//     } else if (cpf == undefined) {
//         res.status(400).send("Seu cpf está undefined!");
//     } else if (telefone == undefined) {
//         res.status(400).send("Seu telefone está undefined!");
//     } else if (hospital == undefined) {
//         res.status(400).send("Seu hospital está undefined!");
//     }else if (cargo == undefined) {
//         res.status(400).send("Seu cargo está undefined!");
//     }else {

//         // Passe os valores como parâmetro e vá para o arquivo cirurgiaComponenteModel.js
//         cirurgiaComponenteModel.cadastrar(nome, email, senha,cpf, telefone, hospital, cargo )
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao realizar o cadastro! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }
// }

// function editar(req, res) {
//     var email = req.body.emailServer;
//     var senha = req.body.senhaServer;
//     var nome = req.body.nomeServer;
//     var cargo = req.body.cargoServer;
//     var telefone = req.body.telefoneServer;
//     var idUsuario = req.body.idUsuarioServer;

//     if (email == undefined) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está indefinida!");
//     } else if (nome == undefined) {
//         res.status(400).send("Sua senha está indefinida!");
//     } else if (cargo == undefined) {
//         res.status(400).send("Sua senha está indefinida!");
//     } else if (telefone == undefined) {
//         res.status(400).send("Sua senha está indefinida!");
//     }else {

//         cirurgiaComponenteModel.editar(email, senha, nome, cargo, telefone, idUsuario)
//             .then(
//                 function (resultadoAutenticar) {
//                     console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
//                     console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String


//                         console.log(resultadoAutenticar);
//                         res.json(resultadoAutenticar);

//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }

// }

function listar(req, res) {
    fkHospital = req.params.hospital

    cirurgiaComponenteModel.listar(fkHospital)
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



// function deletar(req, res) {
//     // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
//     var idUsuario = req.body.idServer;


//     // Faça as validações dos valores
//     if (idUsuario == undefined) {
//         res.status(400).send("Seu nome está undefined!");
//     } else {
//         // Passe os valores como parâmetro e vá para o arquivo funcionarioAssociadoModel.js
//         cirurgiaComponenteModel.deletar(idUsuario)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao realizar o cadastro! Erro: ",
//                         erro.sqlMessage
//                     );
//                     erro = "esse email ja foi cadastrado"
//                     res.status(500).json(erro);
//                 }
//             );
//     }
// }

module.exports = {
    // editar,
    // deletar,
    listar,
    // autenticar,
    // cadastrar
}