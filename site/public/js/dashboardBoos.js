// function obterDadosGrafico(fkMaquina, tempoHistorico) {
//     console.log("Passei por aqui" + fkMaquina + tempoHistorico)
//     fetch(`/componentes/medidas/${fkMaquina}/${tempoHistorico}/7`, {
//         cache: "no-store",
//     })
//         .then(function (response) {
//             if (response.ok) {
//                 response.json().then(function (resposta) {
//                     console.log(resposta);

//                     // plotarGrafico(resposta, fkMaquina);
//                 });
//             } else {
//                 console.error("Nenhum dado encontrado ou erro na API");
//             }
//         })
//         .catch(function (error) {
//             console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
//         });
// }

function obterDadosGrafico() {
    fkMaquina = sessionStorage.fk_maquina_alerta_componente
    nomeComponente = sessionStorage.fk_nome_componente
    console.log("Passei pela Obter Dados Gráfico Atual" + fkMaquina)
    var elementoTempo = document.getElementById("tempo-historico")

    if (elementoTempo.value == "cirurgia") {
        fetch(`/componentes/medidasPorComponente/${fkMaquina}/cirurgia/${nomeComponente}/7`, {
            cache: "no-store",
        })
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (resposta) {
                        console.log(resposta);

                        plotarGraficoCirurgia(resposta, fkMaquina, nomeComponente);
                    });
                } else {
                    console.error("Nenhum dado encontrado ou erro na API");
                }
            })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
    }

    if (elementoTempo.value == "atual") {
        fetch(`/componentes/medidasPorComponente/${fkMaquina}/atual/${nomeComponente}/30`, {
            cache: "no-store",
        })
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (resposta) {
                        console.log(resposta);

                        plotarGraficoGeral(resposta, fkMaquina, nomeComponente);
                    });
                } else {
                    console.error("Nenhum dado encontrado ou erro na API");
                }
            })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
    }

}

function plotarGraficoCirurgia(resposta, fkMaquina, nomeComponente) {
    // CRIANDO GRÁFICO CPU
    let labelDados = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labelDados,
        datasets: [
            {
                label: nomeComponente,
                data: [],
                fill: true,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgb(75, 192, 192, 0.400)",
                tension: 0.1
            },
        ],
    };

    resposta.forEach((registro) => {
        labelDados.push(registro.HorarioFormatado);
        dados.datasets[0].data.push(registro.dado);
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
    console.log(labelDados);
    console.log("Dados:");
    console.log(dados);
    console.log("----------------------------------------------");

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: "line",
        data: dados,
        options: {
            scales: {
                x: {
                    ticks: {
                        fontSize: 1, // Ajuste o tamanho da fonte do eixo x aqui
                    },
                },
            },
        },
    };

    var grafico1 = document.getElementById(`myChartCanvas1`);

    if (Chart.getChart(grafico1)) {
        Chart.getChart(grafico1).destroy();
    }

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(document.getElementById(`myChartCanvas1`), config);

    // setTimeout(
    //     () =>
    //         atualizarGrafico(
    //             fkMaquina,
    //             dadosCpu,
    //             dadosMemoria,
    //             dadosRede,
    //             myChart,
    //             myChart2,
    //             myChart4
    //         ),
    //     10000
    // );
}

function plotarGraficoCirurgia(resposta, fkMaquina, nomeComponente) {
    // CRIANDO GRÁFICO CPU
    let labelDados = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labelDados,
        datasets: [
            {
                label: nomeComponente,
                data: [],
                fill: true,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgb(75, 192, 192, 0.400)",
                tension: 0.1
            },
        ],
    };

    resposta.forEach((registro) => {
        labelDados.push(registro.HorarioFormatado);
        dados.datasets[0].data.push(registro.dado);
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
    console.log(labelDados);
    console.log("Dados:");
    console.log(dados);
    console.log("----------------------------------------------");

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: "line",
        data: dados,
        options: {
            scales: {
                x: {
                    ticks: {
                        fontSize: 1, // Ajuste o tamanho da fonte do eixo x aqui
                    },
                },
            },
        },
    };

    var grafico1 = document.getElementById(`myChartCanvas1`);

    if (Chart.getChart(grafico1)) {
        Chart.getChart(grafico1).destroy();
    }

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(document.getElementById(`myChartCanvas1`), config);

    // setTimeout(
    //     () =>
    //         atualizarGrafico(
    //             fkMaquina,
    //             dadosCpu,
    //             dadosMemoria,
    //             dadosRede,
    //             myChart,
    //             myChart2,
    //             myChart4
    //         ),
    //     10000
    // );
}

function plotarGraficoCirurgia(resposta, fkMaquina, nomeComponente) {
    // CRIANDO GRÁFICO CPU
    let labelDados = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labelDados,
        datasets: [
            {
                label: nomeComponente,
                data: [],
                fill: true,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgb(75, 192, 192, 0.400)",
                tension: 0.1
            },
        ],
    };

    resposta.forEach((registro) => {
        labelDados.push(registro.HorarioFormatado);
        dados.datasets[0].data.push(registro.dado);
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
    console.log(labelDados);
    console.log("Dados:");
    console.log(dados);
    console.log("----------------------------------------------");

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: "line",
        data: dados,
        options: {
            scales: {
                x: {
                    ticks: {
                        fontSize: 1, // Ajuste o tamanho da fonte do eixo x aqui
                    },
                },
            },
        },
    };

    var grafico1 = document.getElementById(`myChartCanvas1`);

    if (Chart.getChart(grafico1)) {
        Chart.getChart(grafico1).destroy();
    }

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(document.getElementById(`myChartCanvas1`), config);

    // setTimeout(
    //     () =>
    //         atualizarGrafico(
    //             fkMaquina,
    //             dadosCpu,
    //             dadosMemoria,
    //             dadosRede,
    //             myChart,
    //             myChart2,
    //             myChart4
    //         ),
    //     10000
    // );
}

function plotarGraficoGeral(resposta, fkMaquina, nomeComponente) {
    // CRIANDO GRÁFICO CPU
    let labelDados = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labelDados,
        datasets: [
            {
                label: nomeComponente,
                data: [],
                fill: true,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgb(75, 192, 192, 0.400)",
                tension: 0.1
            },
        ],
    };

    resposta.forEach((registro) => {
        labelDados.push(registro.HorarioFormatado);
        dados.datasets[0].data.push(registro.dado);
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
    console.log(labelDados);
    console.log("Dados:");
    console.log(dados);
    console.log("----------------------------------------------");

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: "line",
        data: dados,
        options: {
            scales: {
                x: {
                    ticks: {
                        fontSize: 1, // Ajuste o tamanho da fonte do eixo x aqui
                    },
                },
            },
        },
    };

    var grafico1 = document.getElementById(`myChartCanvas1`);

    if (Chart.getChart(grafico1)) {
        Chart.getChart(grafico1).destroy();
    }

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(document.getElementById(`myChartCanvas1`), config);

    // setTimeout(
    //     () =>
    //         atualizarGrafico(
    //             fkMaquina,
    //             dadosCpu,
    //             dadosMemoria,
    //             dadosRede,
    //             myChart,
    //             myChart2,
    //             myChart4
    //         ),
    //     10000
    // );
}

