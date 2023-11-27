var contadorRegistro = 0;
var contadorDadoEstavel = 0;
var usoDisco = 0;
var totalDisco = 0;
var janelaAtualGlobal = ""


function fecharJanela(){ 
    fkRobo = document.getElementById("maquinas-ativas").value;
fetch("/janelas/fechar", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        janelaServer: janelaAtualGlobal,
        idMaquinaServer: fkRobo

    })
}).then(function (resposta) {

    console.log("resposta: ", resposta);

    if (resposta.ok) {

        setTimeout(() => {
            window.location.reload();
        }, "2000")
        
    } else {
        throw ("Houve um erro ao tentar cadastrar o ganhador");
    }
}).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
return false;
// finalizarAguardar();
});
}

function colJanela(fkRobo) {
    fkRobo = document.getElementById("maquinas-ativas").value;
    console.log(fkRobo);
    fetch("/janelas/colJanela", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idMaquinaServer: fkRobo
        })
    })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                const janelaAtual = resposta[0].Janela_atual;
                janelas.innerHTML = janelaAtual;
                janelaAtualGlobal = janelaAtual
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
}


function obterDadosGrafico() {
    fkRobo = document.getElementById("maquinas-ativas").value;
    tempoHistorico = document.getElementById("tempo-historico").value;
    const selectedOption =
        document.getElementById("maquinas-ativas").options[
        document.getElementById("maquinas-ativas").selectedIndex
        ];
    const idProcess = selectedOption.getAttribute("data-info");
    id_maquina.innerHTML = idProcess;

    fetch(`/componentes/medidas/${fkRobo}/${tempoHistorico}/7`, {
        cache: "no-store",
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(resposta);

                    plotarGrafico(resposta, fkRobo);
                });
            } else {
                console.error("Nenhum dado encontrado ou erro na API");
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


function obterDadosResumo() {
    fkRobo = document.getElementById("maquinas-ativas").value;
    tempoHistorico = document.getElementById("tempo-historico").value;
    
    fetch(`/componentes/resumo/${fkRobo}/${tempoHistorico}`, {
        cache: "no-store",
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(resposta);

                    plotarResumo(resposta, fkRobo, tempoHistorico);
                });
            } else {
                console.error("Nenhum dado encontrado ou erro na API");
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        })
        .finally(function () {
            // Defina o próximo intervalo de busca após a conclusão da solicitação atual
            setTimeout(obterDadosResumo, 5000);
        });
}

function plotarResumo(resposta, fkRobo, tempoHistorico) {
    console.log(resposta);
    var elementos = document.getElementsByClassName("resumo_data_titulo");

    var elementos = document.getElementsByClassName("resumo_data_titulo");

    if (tempoHistorico == "atual") {
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].innerHTML = "";
            elementos[i].style.display = "none";
        }
    } else if (tempoHistorico == "dia") {
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].style.display = "block";
            elementos[i].innerHTML = "Média dia: " + resposta[0].DiaFormatado;
        }
    } else if (tempoHistorico == "mes") {
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].style.display = "block";
            elementos[i].innerHTML = "Média mês: " + resposta[0].MesFormatado;
        }
    } else if (tempoHistorico == "ano") {
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].style.display = "block";
            elementos[i].innerHTML = "Média ano: " + resposta[0].AnoFormatado;
        }
    }

    resposta.forEach((registro) => {
        if (registro.nomeComponente == "Porcentagem da CPU") {
            cpu_uso.innerHTML = registro.dado + "%";
            cpu_disponivel.innerHTML = Math.floor(100 - registro.dado) + "%";
        } else if (registro.nomeComponente == "Velocidade da CPU") {
            cpu_velocidade.innerHTML = registro.dado + "GHz";
        } else if (registro.nomeComponente == "Processos da CPU") {
            cpu_processos.innerHTML = Math.floor(registro.dado);
        } else if (registro.nomeComponente == "Tempo no sistema da CPU") {
            const dado = registro.dado;

            const horas = Math.floor(dado / 3600);
            const minutos = Math.floor((dado - horas * 3600) / 60);
            const segundos = Math.round(dado - (horas * 3600 + minutos * 60));
            cpu_tempo.innerHTML = horas + "h" + minutos + "m" + segundos + "s";
        } else if (registro.nomeComponente == "Uso da Memoria") {
            memoria_uso.innerHTML = registro.dado + "GB";
        } else if (registro.nomeComponente == "Total da Memoria") {
            memoria_disponivel.innerHTML = registro.dado + "GB";
        } else if (registro.nomeComponente == "Porcentagem da Memoria Swap") {
            memoria_porcentagem_swap.innerHTML = registro.dado + "%";
        } else if (registro.nomeComponente == "Uso da Memoria Swap") {
            memoria_uso_swap.innerHTML = registro.dado + "GB";
        } else if (registro.nomeComponente == "Uso do Disco") {
            disco_uso.innerHTML = registro.dado + "GB";
            usoDisco = registro.dado
        } else if (registro.nomeComponente == "Total do Disco") {
            disco_total.innerHTML = registro.dado + "GB";
            discoTotal = registro.dado;
        } else if (registro.nomeComponente == "Porcentagem do Disco") {
            disco_porcentagem.innerHTML = Math.floor(registro.dado) + "%";
        } else if (registro.nomeComponente == "Tempo de Leitura do Disco") {
            disco_velocidade_leitura.innerHTML = Math.floor(registro.dado) + "s";
        } else if (registro.nomeComponente == "Tempo de Escrita do Disco") {
            disco_velocidade_escrita.innerHTML = Math.floor(registro.dado) + "s";
        } else if (registro.nomeComponente == "Bytes recebidos") {
            rede_bytes_recebidos.innerHTML = Math.floor(registro.dado);
        } else if (registro.nomeComponente == "Bytes enviados") {
            rede_bytes_enviados.innerHTML = Math.floor(registro.dado);
        } else if (registro.nomeComponente == "Status da Rede") {
            if (registro.dado == "1") {
                rede_status.innerHTML = "Conectado";
            } else {
                rede_status.innerHTML = "Desconectado";
                rede_status.style = "color: red;";
            }
        }
    });
    plotarGraficoDisco(usoDisco, discoTotal)
}

function plotarUsb(fkRobo){
    var conectado = 1
    fkRobo = document.getElementById("maquinas-ativas").value;
    console.log(fkRobo)
    fetch(`/componentes/usb/${fkRobo}/${conectado}`, {
        cache: "no-store",
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(resposta);

                    resposta.forEach((registro) => {
                        usb_conectado.innerHTML += `<h2>${registro.nome} - ${registro.dataHora}<h2>`
                    })
                });
            } else {
                console.error("Nenhum dado encontrado ou erro na API");
            }

            // conectado = 0
            // fetch(`/componentes/usb/${fkRobo}/${conectado}`, {
            //     cache: "no-store",
            // })
            //     .then(function (response) {
            //         if (response.ok) {
            //             response.json().then(function (resposta) {
            //                 console.log(resposta);
        
            //                 // resposta.forEach((registro) => {
            //                 //     usb_desconectado.innerHTML += `<h2>${registro.nome} - ${registro.dataHora}<h2>`
            //                 // })
            //             });
            //         } else {
            //             console.error("Nenhum dado encontrado ou erro na API");
            //         }
            //     })
            //     .catch(function (error) {
            //         console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            //     });
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGrafico(resposta, fkRobo) {
    // CRIANDO GRÁFICO CPU
    let labelCpu = [];

    // Criando estrutura para plotar gráfico - dados
    let dadosCpu = {
        labels: labelCpu,
        datasets: [
            {
                label: "Cpu",
                data: [],
                fill: true,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgb(75, 192, 192, 0.400)",
                tension: 0.1,
            },
        ],
    };

    resposta.forEach((registro) => {
        if (registro.nomeComponente == "Porcentagem da CPU") {
            labelCpu.push(registro.HorarioFormatado);
            dadosCpu.datasets[0].data.push(registro.dado);
        }
    });
    // Inserindo valores recebidos em estrutura para plotar o gráfico
    // for (i = 0; i < resposta.length; i++) {
    //     var registro = resposta[i];
    //     labels.push(registro.HorarioDado);
    //     dados.datasets[0].data.push(registro.dado);
    //     // dados.datasets[1].data.push(registro.temperatura);
    // }

    console.log("----------------------------------------------");
    console.log("O gráfico de CPU será plotado com os respectivos valores:");
    console.log("Labels:");
    console.log(labelCpu);
    console.log("Dados:");
    console.log(dadosCpu);
    console.log("----------------------------------------------");

    // Criando estrutura para plotar gráfico - config
    const configCpu = {
        type: "line",
        data: dadosCpu,
    };

    var grafico1 = document.getElementById(`myChartCanvas1`);

    if (Chart.getChart(grafico1)) {
        Chart.getChart(grafico1).destroy();
    }

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(document.getElementById(`myChartCanvas1`), configCpu);

    console.log("iniciando plotagem do gráfico Memória ...");

    // ----------------------------------------------------------------------------------
    // CRIANDO GRÁFICO DA MEMÓRIA
    let labelMemoria = [];

    // Criando estrutura para plotar gráfico - dados
    let dadosMemoria = {
        labels: labelMemoria,
        datasets: [
            {
                label: "Memória",
                data: [],
                fill: true,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgb(75, 192, 192, 0.400)",
                tension: 0.1,
            },
        ],
    };

    console.log("----------------------------------------------");
    console.log(
        'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
    );
    resposta.forEach((registro) => {
        if (registro.nomeComponente == "Porcentagem da Memoria") {
            labelMemoria.push(registro.HorarioFormatado);
            dadosMemoria.datasets[0].data.push(registro.dado);
        }
    });
    // Inserindo valores recebidos em estrutura para plotar o gráfico
    // for (i = 0; i < resposta.length; i++) {
    //     var registro = resposta[i];
    //     labels.push(registro.HorarioDado);
    //     dados.datasets[0].data.push(registro.dado);
    //     // dados.datasets[1].data.push(registro.temperatura);
    // }

    console.log("----------------------------------------------");
    console.log("O gráfico será plotado com os respectivos valores:");
    console.log("Labels:");
    console.log(labelMemoria);
    console.log("Dados:");
    console.log(dadosMemoria);
    console.log("----------------------------------------------");

    // Criando estrutura para plotar gráfico - config
    const configMemoria = {
        type: "line",
        data: dadosMemoria,
    };

    var grafico2 = document.getElementById(`myChartCanvas2`);

    if (Chart.getChart(grafico2)) {
        Chart.getChart(grafico2).destroy();
    }
    // Adicionando gráfico criado em div na tela
    let myChart2 = new Chart(
        document.getElementById(`myChartCanvas2`),
        configMemoria
    );

    let labelProcesso = []; // NOME DOS DO GRÁFICO, FICA VAZIO POIS ELE VAI RECEBER OS HORARIOS

    // Criando estrutura para plotar gráfico - dados
    let dadosProcesso = {
        labels: labelProcesso,
        datasets: [
            {
                label: "Quantidade de Processos",
                data: [], // FICA VAZIO POIS VAI SER PREENCHIDO PELOS DADOS RECEBIDOS
                fill: true,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgb(75, 192, 192, 0.400)",
                tension: 0.1,
            },
        ],
    };

    console.log("----------------------------------------------");
    console.log(
        'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
    );
    resposta.forEach((registro) => {
        if (registro.nomeComponente == "Processos da CPU") {
            labelProcesso.push(registro.HorarioFormatado);
            dadosProcesso.datasets[0].data.push(registro.dado);
        }
    });
    // Inserindo valores recebidos em estrutura para plotar o gráfico
    // for (i = 0; i < resposta.length; i++) {
    //     var registro = resposta[i];
    //     labels.push(registro.HorarioDado);
    //     dados.datasets[0].data.push(registro.dado);
    //     // dados.datasets[1].data.push(registro.temperatura);
    // }

    console.log("----------------------------------------------");
    console.log("O gráfico será plotado com os respectivos valores:");
    console.log("Labels:");
    console.log(labelProcesso);
    console.log("Dados:");
    console.log(dadosProcesso);
    console.log("----------------------------------------------");

    // Criando estrutura para plotar gráfico - config
    const configProcesso = {
        type: "line",
        data: dadosProcesso,
    };

    var grafico3 = document.getElementById(`myChartCanvas3`);

    if (Chart.getChart(grafico3)) {
        Chart.getChart(grafico3).destroy();
    }
    // Adicionando gráfico criado em div na tela
    let myChart3 = new Chart(
        document.getElementById(`myChartCanvas3`),
        configProcesso
    );


    setTimeout(
        () =>
            atualizarGrafico(
                fkRobo,
                dadosCpu,
                dadosMemoria,
                dadosProcesso,
                myChart,
                myChart2,
                myChart3 //descomentar aqui e configurar a att
            ),
        10000
    );
}



// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas,

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico(
    fkRobo,
    dadosCpu,
    dadosMemoria,
    dadosProcesso,
    myChart,
    myChart2,
    myChart3
) {

    if(tempoHistorico == "atual"){
        fetch(`/componentes/medidas/${fkRobo}/${tempoHistorico}/1`, {
            cache: "no-store",
        })
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (novoRegistro) {
                        console.log(`Dados atuais do gráfico:`);
                        console.log(novoRegistro);
                        novoRegistro.forEach((registro) => {
                            if (registro.nomeComponente == "Porcentagem da CPU") {
                                if (
                                    registro.HorarioFormatado ==
                                    dadosCpu.labels[dadosCpu.labels.length - 1]
                                ) {
                                    console.log(
                                        "Como não há dados novos para captura de cpu, o gráfico não atualizará."
                                    );
                                } else {
                                    // tirando e colocando valores no gráfico
                                    dadosCpu.labels.shift(); // apagar o primeiro
                                    dadosCpu.labels.push(registro.HorarioFormatado); // incluir um novo momento
    
                                    dadosCpu.datasets[0].data.shift(); // apagar o primeiro de umidade
                                    dadosCpu.datasets[0].data.push(registro.dado); // incluir uma nova medida de umidade
    
                                    myChart.update();
                                }
                            } else if (registro.nomeComponente == "Porcentagem da Memoria") {
                                if (
                                    registro.HorarioFormatado ==
                                    dadosMemoria.labels[dadosMemoria.labels.length - 1]
                                ) {
                                    console.log(
                                        "Como não há dados novos para captura de memória, o gráfico não atualizará."
                                    );
                                } else {
                                    // tirando e colocando valores no gráfico
                                    dadosMemoria.labels.shift(); // apagar o primeiro
                                    dadosMemoria.labels.push(registro.HorarioFormatado); // incluir um novo momento
    
                                    dadosMemoria.datasets[0].data.shift(); // apagar o primeiro de umidade
                                    dadosMemoria.datasets[0].data.push(registro.dado); // incluir uma nova medida de umidade
    
                                    myChart2.update();
                                }
                            } 
                            else if (registro.nomeComponente == "Processos da CPU") {
                                if (
                                    registro.HorarioFormatado ==
                                    dadosProcesso.labels[dadosProcesso.labels.length - 1]
                                ) {
                                    console.log(
                                        "Como não há dados novos para captura de memória, o gráfico não atualizará."
                                    );
                                } else {
                                    // tirando e colocando valores no gráfico
                                    dadosProcesso.labels.shift(); // apagar o primeiro
                                    dadosProcesso.labels.push(registro.HorarioFormatado); // incluir um novo momento
    
                                    dadosProcesso.datasets[0].data.shift(); // apagar o primeiro de umidade
                                    dadosProcesso.datasets[0].data.push(registro.dado); // incluir uma nova medida de umidade
    
                                    myChart3.update();
                                }
                            } 
                        });
    
                        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                        setTimeout(
                            () =>
                                atualizarGrafico(
                                    fkRobo,
                                    dadosCpu,
                                    dadosMemoria,
                                    dadosProcesso,
                                    myChart,
                                    myChart2,
                                    myChart3
                                ),
                            10000
                        );
                    });
                } else {
                    console.error("Nenhum dado encontrado ou erro na API");
                    // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                    setTimeout(
                        () =>
                            atualizarGrafico(
                                fkRobo,
                                dadosCpu,
                                dadosMemoria,
                                dadosProcesso,
                                myChart,
                                myChart2,
                                myChart3,
                                myChart4
                            ),
                        10000
                    );
                }
            })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
    } else{
        obterDadosGrafico()
    }
    
}

function limparDados(){
    var grafico1 = document.getElementById(`myChartCanvas1`);
    var grafico2 = document.getElementById(`myChartCanvas2`);
    var grafico4 = document.getElementById(`myChartCanvas4`);
    if (Chart.getChart(grafico2)) {
        Chart.getChart(grafico2).destroy();
    }

    if (Chart.getChart(grafico1)) {
        Chart.getChart(grafico1).destroy();
    }

    if (Chart.getChart(grafico4)) {
        Chart.getChart(grafico4).destroy();
    }

    usb_conectado.innerHTML = '';
    cpu_uso.innerHTML = "Indefinido";
    cpu_disponivel.innerHTML = "Indefinido";
    cpu_velocidade.innerHTML = "Indefinido";
    cpu_processos.innerHTML = "Indefinido";
    cpu_tempo.innerHTML = "Indefinido";
    memoria_uso.innerHTML = "Indefinido";
    memoria_disponivel.innerHTML = "Indefinido";
    memoria_porcentagem_swap.innerHTML = "Indefinido";
    memoria_uso_swap.innerHTML = "Indefinido";
    disco_uso.innerHTML = "Indefinido";
    disco_total.innerHTML = "Indefinido";
    disco_porcentagem.innerHTML = "Indefinido";
    disco_velocidade_leitura.innerHTML = "Indefinido";
    disco_velocidade_escrita.innerHTML = "Indefinido";
    rede_bytes_recebidos.innerHTML = "Indefinido";
    rede_bytes_enviados.innerHTML = "Indefinido";
    rede_status.innerHTML = "Indefinido";
}
