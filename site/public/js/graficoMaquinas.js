var contadorRegistro = 0;
var contadorDadoEstavel = 0;
var usoDisco = 0;
var totalDisco = 0;


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

            conectado = 0
            fetch(`/componentes/usb/${fkRobo}/${conectado}`, {
                cache: "no-store",
            })
                .then(function (response) {
                    if (response.ok) {
                        response.json().then(function (resposta) {
                            console.log(resposta);
        
                            resposta.forEach((registro) => {
                                usb_desconectado.innerHTML += `<h2>${registro.nome} - ${registro.dataHora}<h2>`
                            })
                        });
                    } else {
                        console.error("Nenhum dado encontrado ou erro na API");
                    }
                })
                .catch(function (error) {
                    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
                });
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

    // ----------------------------------------------------------------------------------
    // CRIANDO GRÁFICO DA REDE
    let labelRede = [];

    // Criando estrutura para plotar gráfico - dados
    let dadosRede = {
        labels: labelRede,
        datasets: [
            {
                label: "Latencia em milissegundos (ms)",
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
    let contadorRegistro = 0;
    let contadorDadoEstavel = 0;

    resposta.forEach((registro) => {
        if (registro.nomeComponente == "Latencia de Rede") {
            labelRede.push(registro.HorarioFormatado);
            dadosRede.datasets[0].data.push(registro.dado);
            contadorRegistro++;

            if (registro.dado > 80) {
                rede_estado_geral.innerHTML = "Crítico";
                rede_estado_geral.style.color = "red";
            } else if (registro.dado > 50) {
                rede_estado_geral.innerHTML = "Instável";
                rede_estado_geral.style.color = "orange";
            } else {
                contadorDadoEstavel++;
            }

            if (contadorDadoEstavel >= 7) {
                rede_estado_geral.innerHTML = "Estável";
                rede_estado_geral.style.color = "green";
                contadorDadoEstavel = 0; // Reinicialize o contador de dados estáveis
            }
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
    const configRede = {
        type: "line",
        data: dadosRede,
    };
    var grafico4 = document.getElementById(`myChartCanvas4`);

    if (Chart.getChart(grafico4)) {
        Chart.getChart(grafico4).destroy();
    }

    // Adicionando gráfico criado em div na tela
    let myChart4 = new Chart(
        document.getElementById(`myChartCanvas4`),
        configRede
    );

    setTimeout(
        () =>
            atualizarGrafico(
                fkRobo,
                dadosCpu,
                dadosMemoria,
                dadosRede,
                myChart,
                myChart2,
                myChart4
            ),
        10000
    );
}

function plotarGraficoDisco(usoDisco, discoTotal){
    let labelDisco = [];

    // Criando estrutura para plotar gráfico - dados
    let dadosDisco = {
        labels: [
            'Disco Utilizado',
            'Disco Livre'
          ],
        datasets: [
            {
                label: "",
                data: [],
                fill: true,
                backgroundColor: [
                    '#3E838C',
                    '#78bec8'
                  ],
                tension: 0.1,
            },
        ],
    };

    console.log("----------------------------------------------");
    console.log(
        'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
    );
    
    dadosDisco.datasets[0].data.push(usoDisco);
    dadosDisco.datasets[0].data.push(discoTotal - usoDisco);
    
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
    console.log(labelDisco);
    console.log("Dados:");
    console.log(dadosDisco);
    console.log("----------------------------------------------");

    // Criando estrutura para plotar gráfico - config
    const configDisco = {
        type: "doughnut",
        data: dadosDisco,
    };

    var grafico3 = document.getElementById(`myChartCanvas3`);

    if (Chart.getChart(grafico3)) {
        Chart.getChart(grafico3).destroy();
    }

    // Adicionando gráfico criado em div na tela
    let myChart3 = new Chart(
        document.getElementById(`myChartCanvas3`),
        configDisco
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
    dadosRede,
    myChart,
    myChart2,
    myChart4
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
                            } else if (registro.nomeComponente == "Latencia de Rede") {
                                if (
                                    registro.HorarioFormatado ==
                                    dadosRede.labels[dadosRede.labels.length - 1]
                                ) {
                                    console.log(
                                        "Como não há dados novos para captura de rede, o gráfico não atualizará."
                                    );
                                } else {
                                    // tirando e colocando valores no gráfico
                                    dadosRede.labels.shift(); // apagar o primeiro
                                    dadosRede.labels.push(registro.HorarioFormatado); // incluir um novo momento
    
                                    dadosRede.datasets[0].data.shift(); // apagar o primeiro de umidade
                                    dadosRede.datasets[0].data.push(registro.dado); // incluir uma nova medida de umidade
    
                                    myChart4.update();
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
                                    dadosRede,
                                    myChart,
                                    myChart2,
                                    myChart4
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
                                dadosRede,
                                myChart,
                                myChart2,
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
    usb_desconectado.innerHTML = ''
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
