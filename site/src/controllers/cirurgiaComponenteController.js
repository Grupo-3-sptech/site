var cirurgiaComponenteModel = require("../models/cirurgiaComponenteModel");
const { spawn } = require('child_process');


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

function listarMetricas(req, res) {

    cirurgiaComponenteModel.listarMetricas()
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

function getLinearRegression(req, res) {
    const roboId = req.params.roboId;
    const nomeComponente = req.params.nomeComponente;
    const limite_linhas = req.params.limite_linhas;
    const pythonProcess = spawn('C:\Users\Administrator\AppData\Local\Programs\Python\Python311\\python.exe',
        ['./individual-boos.py',
            roboId.toString(),
            nomeComponente,
            limite_linhas.toString()
        ]);

    pythonProcess.stdout.on('data', (data) => {
        const result = data.toString();
        res.send(result);
    });


    pythonProcess.stderr.on('data', (data) => {
        console.error(`Erro no script Python: ${data}`);
        res.status(500).send('Erro ao executar o script Python');
    });
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
    listarMetricas,
    getLinearRegression,
    listar,
    // autenticar,
    // cadastrar
}
