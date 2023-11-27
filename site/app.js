process.env.AMBIENTE_PROCESSO = "desenvolvimento";
//process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "producao" ? 80 : 80;

var app = express();


var usuarioRouter = require("./src/routes/usuarios");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");
var componentesRouter = require("./src/routes/componentes");
var hospitalRouter = require("./src/routes/hospital");
var cargoRouter = require("./src/routes/cargo");
var funcionarioRouter = require("./src/routes/funcionario");
var funcionarioAssociadoRouter = require("./src/routes/funcionarioAssociado");
var janelasRouter = require("./src/routes/janelas");
var roboRouter = require("./src/routes/robos"); 
var alertasRouter = require("./src/routes/alertas")
var empresasRouter = require("./src/routes/empresas");
var cirurgiaRouter = require("./src/routes/cirurgia");
var salaRouter = require("./src/routes/salas");
var cirurgiaComponente = require("./src/routes/cirurgiaComponente");
var individualDaniloRouter = require("./src/routes/daniloIndividual")

var redeRouter = require("./src/routes/rede")


// // Defina o mecanismo de visualização e o diretório de visualizações
// app.set('view engine', 'ejs'); // Use o EJS como mecanismo de visualização
// app.set('views', path.join(__dirname, 'views')); // Especifique o diretório de visualizações

// Resto da configuração do seu aplicativo

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

// app.get('/', (req, res) => {
//     // Lógica para lidar com a solicitação da página inicial
//     res.render('nome_do_arquivo_de_visualizacao');
//   });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());


app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter);
app.use("/empresas", empresasRouter);
app.use("/componentes", componentesRouter);
app.use("/hospital", hospitalRouter);
app.use("/cargo", cargoRouter);
app.use("/funcionario", funcionarioRouter);
app.use("/funcionarioAssociado", funcionarioAssociadoRouter);
app.use("/janelas", janelasRouter);
app.use("/robo", roboRouter);
app.use("/alertas", alertasRouter)
app.use("/cirurgia", cirurgiaRouter)
app.use("/sala", salaRouter)
app.use("/cirurgiaComponente", cirurgiaComponente)
app.use("/danilo", individualDaniloRouter)
app.use("/rede", redeRouter)

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
