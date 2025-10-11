$(document).ready(function () {

    const elementoSlaveUmRosca = document.getElementById('graficoSlaveUmRoscaMonitoramento');
    const elementoSlaveUmLinha = document.getElementById('graficoSlaveUmLinhaMonitoramento');
    const elementoSlaveDoisRosca = document.getElementById('graficoSlaveDoisRoscaMonitoramento');
    const elementoSlaveDoisLinha = document.getElementById('graficoSlaveDoisLinhaMonitoramento');
    const elementoMasterRosca = document.getElementById('graficoMasterRoscaMonitoramento');
    const elementoMasterLinha = document.getElementById('graficoMasterLinhaMonitoramento');

    const meses = [
        'Janeiro', 'Fevereiro',
        'Março', 'Abril',
        'Maio', 'Junho',
        'Julho', 'Agosto',
        'Setembro', 'Outubro',
        'Novembro', 'Dezembro'
    ];

    //Gráficos do Slave Um
    //Dados referentes ao Primeiro Gráfico (Rosquinha)
    const dadosSlaveUmRosca = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgba(18, 53, 32, 1)',
                'rgb(54, 162, 235)',
                'rgba(51, 184, 126, 1)'
            ],
            hoverOffset: 4
        }]
    };

    //Inicialização do Primeiro Gráfico (Rosquinha)
    const graficoSlaveUmRosca = new Chart(elementoSlaveUmRosca, {
        type: 'doughnut',
        data: dadosSlaveUmRosca,
    });

    //Dados referentes ao Segundo Gráfico (Linhas)  
    const dadosSlaveUmLinha = {
        labels: meses,
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    //Inicialização do Segundo Gráfico (Linhas)
    const graficoSlaveUmLinha = new Chart(elementoSlaveUmLinha, {
        type: 'line',
        data: dadosSlaveUmLinha,
    });
    //----------------------------------------//

    //Gráficos do Slave Dois
    //Dados referentes ao Primeiro Gráfico (Rosquinha)
    const dadosSlaveDoisRosca = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgba(18, 53, 32, 1)',
                'rgb(54, 162, 235)',
                'rgba(51, 184, 126, 1)'
            ],
            hoverOffset: 4
        }]
    };

    //Inicialização do Primeiro Gráfico (Rosquinha)
    const graficoSlaveDoisRosca = new Chart(elementoSlaveDoisRosca, {
        type: 'doughnut',
        data: dadosSlaveDoisRosca,
    });

    //Dados referentes ao Segundo Gráfico (Linhas)
    const dadosSlaveDoisLinha = {
        labels: meses,
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    //Inicialização do Segundo Gráfico (Linhas)
    const graficoSlaveDoisLinha = new Chart(elementoSlaveDoisLinha, {
        type: 'line',
        data: dadosSlaveDoisLinha,
    });
    //----------------------------------------//

    //Gráficos do Master
    //Dados referentes ao Primeiro Gráfico (Rosquinha)
    const dadosMasterRosca = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgba(18, 53, 32, 1)',
                'rgb(54, 162, 235)',
                'rgba(51, 184, 126, 1)'
            ],
            hoverOffset: 4
        }]
    };

    //Inicialização do Primeiro Gráfico (Rosquinha)
    const graficoMasterRosca = new Chart(elementoMasterRosca, {
        type: 'doughnut',
        data: dadosMasterRosca,
    });

    //Dados referentes ao Segundo Gráfico (Linhas)
    const dadosMasterLinha = {
        labels: meses,
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    //Inicialização do Segundo Gráfico (Linhas)
    const graficoMasterLinha = new Chart(elementoMasterLinha, {
        type: 'line',
        data: dadosMasterLinha,
    });
    //----------------------------------------//

});