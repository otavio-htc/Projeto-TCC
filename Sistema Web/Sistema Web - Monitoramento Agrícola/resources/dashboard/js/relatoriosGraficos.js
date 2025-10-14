//Relatórios Gráficos utilizando a Biblioteca Charts.js
$(document).ready(function () {

    //Constantes responsáveis por armazenar os elementos presentes no documento a partir do Id
    //Cada elemento representa um gráfico diferente.
    const elementoSlaveUmRadar = document.getElementById('graficoSlaveUmRadarMonitoramento');
    const elementoSlaveUmLinha = document.getElementById('graficoSlaveUmLinhaMonitoramento');
    const elementoSlaveDoisRadar = document.getElementById('graficoSlaveDoisRadarMonitoramento');
    const elementoSlaveDoisLinha = document.getElementById('graficoSlaveDoisLinhaMonitoramento');
    const elementoMasterRadar = document.getElementById('graficoMasterRadarMonitoramento');
    const elementoMasterLinha = document.getElementById('graficoMasterLinhaMonitoramento');

    //Constante Array responsável por armazenar os meses do ano
    const meses = [
        'Janeiro', 'Fevereiro',
        'Março', 'Abril',
        'Maio', 'Junho',
        'Julho', 'Agosto',
        'Setembro', 'Outubro',
        'Novembro', 'Dezembro'
    ];

    //Gráficos do Slave Um
    //Dados referentes ao Primeiro Gráfico (Radar)
    const dadosSlaveUmRadar = {
        labels: meses,
        datasets: [{
            label: 'Registros por Mês',
            data: [
                2000, 5000, 1500,
                2000, 4000, 6000,
                2000, 1000, 3000,
                1200, 3000, 2000
            ],
            backgroundColor: 'rgba(23, 151, 76, 1)',
            borderColor: 'rgba(8, 37, 20, 1)',
            pointBackgroundColor: 'rgba(51, 184, 126, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    };

    //Inicialização do Primeiro Gráfico (Radar)
    const graficoSlaveUmRadar = new Chart(elementoSlaveUmRadar, {
        type: 'radar',
        data: dadosSlaveUmRadar,
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Slave Um',
                }
            }
        }
    });

    //Dados referentes ao Segundo Gráfico (Linhas)  
    const dadosSlaveUmLinha = {
        labels: meses,
        datasets: [{
            label: 'Média de Umidade por Mês',
            data: [65, 59, 80, 81, 56, 55, 40, 90, 40, 70, 38, 50],
            fill: false,
            borderColor: 'rgba(69, 176, 76, 1)',
            tension: 0.1
        }]
    };

    //Inicialização do Segundo Gráfico (Linhas)
    const graficoSlaveUmLinha = new Chart(elementoSlaveUmLinha, {
        type: 'line',
        data: dadosSlaveUmLinha,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Slave Um',
                }
            }
        }
    });
    //----------------------------------------//

    //Gráficos do Slave Dois
    //Dados referentes ao Primeiro Gráfico (Radar)
    const dadosSlaveDoisRadar = {
        labels: meses,
        datasets: [{
            label: 'Registros por Mês',
            data: [
                2000, 5000, 1500,
                2000, 4000, 6000,
                2000, 1000, 3000,
                1200, 3000, 2000
            ],
            backgroundColor: 'rgba(18, 53, 32, 1)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgba(51, 184, 126, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    };

    //Inicialização do Primeiro Gráfico (Radar)
    const graficoSlaveDoisRadar = new Chart(elementoSlaveDoisRadar, {
        type: 'radar',
        data: dadosSlaveUmRadar,
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Slave Dois',
                }
            }
        }
    });

    //Dados referentes ao Segundo Gráfico (Linhas)
    const dadosSlaveDoisLinha = {
        labels: meses,
        datasets: [{
            label: 'Média de Umidade por Mês',
            data: [65, 59, 80, 81, 56, 55, 40, 90, 40, 70, 38, 50],
            fill: false,
            borderColor: 'rgba(69, 176, 76, 1)',
            tension: 0.1
        }]
    };

    //Inicialização do Segundo Gráfico (Linhas)
    const graficoSlaveDoisLinha = new Chart(elementoSlaveDoisLinha, {
        type: 'line',
        data: dadosSlaveDoisLinha,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Slave Dois',
                }
            }
        }
    });
    //----------------------------------------//

    //Gráficos do Master
    //Dados referentes ao Primeiro Gráfico (Radar)
    const dadosMasterRadar = {
        labels: meses,
        datasets: [{
            label: 'Registros por Mês',
            data: [
                2000, 5000, 1500,
                2000, 4000, 6000,
                2000, 1000, 3000,
                1200, 3000, 2000
            ],
            backgroundColor: 'rgba(18, 53, 32, 1)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgba(51, 184, 126, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    };

    //Inicialização do Primeiro Gráfico (Radar)
    const graficoMasterRadar = new Chart(elementoMasterRadar, {
        type: 'radar',
        data: dadosSlaveUmRadar,
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Master',
                }
            }
        }
    });

    //Dados referentes ao Segundo Gráfico (Linhas)
    const dadosMasterLinha = {
        labels: meses,
        datasets: [{
            label: 'Média de Umidade por Mês',
            data: [65, 59, 80, 81, 56, 55, 40, 90, 40, 70, 38, 50],
            fill: false,
            borderColor: 'rgba(69, 176, 76, 1)',
            tension: 0.1
        }]
    };

    //Inicialização do Segundo Gráfico (Linhas)
    const graficoMasterLinha = new Chart(elementoMasterLinha, {
        type: 'line',
        data: dadosMasterLinha,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Master',
                }
            }
        }
    });
    //----------------------------------------//

});