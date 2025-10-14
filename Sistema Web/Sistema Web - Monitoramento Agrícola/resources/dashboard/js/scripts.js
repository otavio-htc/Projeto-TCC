const elementoNivelAltoSlaveUm = document.getElementById('nivelAltoSlaveUm');
const elementoNivelMedioSlaveUm = document.getElementById('nivelMedioSlaveUm');
const elementoNivelBaixoSlaveUm = document.getElementById('nivelBaixoSlaveUm');

const elementoNivelAltoSlaveDois = document.getElementById('nivelAltoSlaveDois');
const elementoNivelMedioSlaveDois = document.getElementById('nivelMedioSlaveDois');
const elementoNivelBaixoSlaveDois = document.getElementById('nivelBaixoSlaveDois');

const elementoNivelAltoMaster = document.getElementById('nivelAltoMaster');
const elementoNivelMedioMaster = document.getElementById('nivelMedioMaster');
const elementoNivelBaixoMaster = document.getElementById('nivelBaixoMaster');

const elementoTempo = document.getElementById('ultimaLeitura');

//Credenciais referentes ao Realtime Database Do Projeto.
const firebaseConfig =
{
    apiKey: "AIzaSyAP4ZiS0AHTReVWpU-oX_eJ-60454x7zSU",
    authDomain: "projetotcc-espnow.firebaseapp.com",
    databaseURL: "https://projetotcc-espnow-default-rtdb.firebaseio.com",
    projectId: "projetotcc-espnow",
    storageBucket: "projetotcc-espnow.firebasestorage.app",
    messagingSenderId: "844655080516",
    appId: "1:844655080516:web:e718d9fc67dbb2bc8db811"
};

// Inicialização do Firebase
const db = firebase.initializeApp(firebaseConfig);

//Inicialização do Realtime Database e armazenamento da referência para o serviço
const databaseInicial = firebase.database();

var registrosBaseRef = databaseInicial.ref('registros');

var dadosBaseRef = registrosBaseRef.orderByKey().limitToLast(1);

//Constantes responsáveis por armazenar os elementos presentes no documento a partir do Id
//Cada elemento representa um gráfico diferente.
const elementoSlaveUmLinha = document.getElementById('graficoSlaveUmLinhaMonitoramento');
const elementoSlaveDoisLinha = document.getElementById('graficoSlaveDoisLinhaMonitoramento');
const elementoMasterLinha = document.getElementById('graficoMasterLinhaMonitoramento');

let graficoSlaveUmLinha;
let graficoSlaveDoisLinha;
let graficoMasterLinha;

const exportarMaster = $('#exportarMaster');
const exportarSlaveUm = $('#exportarSlaveUm');
const exportarSlaveDois = $('#exportarSlaveDois');

//Relatórios Gráficos utilizando a Biblioteca Charts.js
$(document).ready(function () {

    //Gráficos do Slave Um
    //Dados referentes ao Gráfico (Linhas)  
    const dadosSlaveUmLinha = {
        labels: [],
        datasets: [{
            label: 'Superfície',
            data: [],
            fill: false,
            borderColor: 'rgba(177, 49, 49, 1)',
            tension: 0.1
        },
        {
            label: 'Intermediário',
            data: [],
            fill: false,
            borderColor: 'rgba(69, 176, 76, 1)',
            tension: 0.1
        },
        {
            label: 'Profundo',
            data: [],
            fill: false,
            borderColor: 'rgba(255, 179, 0, 1)',
            tension: 0.1
        }],
    };

    //Inicialização do Gráfico (Linhas)
    graficoSlaveUmLinha = new Chart(elementoSlaveUmLinha, {
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
    //Geração de Planilha do Slave Um
    exportarSlaveUm.on('click', function() {
        if (!graficoSlaveUmLinha) {
            alert("O gráfico ainda não foi carregado.");
            return;
        }

        const labels = graficoSlaveUmLinha.data.labels;
        const datasets = graficoSlaveUmLinha.data.datasets;

        const dadosParaPlanilha = [];

        labels.forEach((label, index) => {
            const linha = {
                'Horário': label
            };

            datasets.forEach(dataset => {
                linha[dataset.label] = dataset.data[index];
            });

            dadosParaPlanilha.push(linha);
        });

        if (dadosParaPlanilha.length === 0) {
            alert("Não há dados no gráfico para exportar.");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(dadosParaPlanilha);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório de Leituras");

        XLSX.writeFile(workbook, "relatorio_grafico_slave_1.xlsx");
    });
    //----------------------------------------//

    //Gráficos do Slave Dois
    //Dados referentes ao Gráfico (Linhas)
    const dadosSlaveDoisLinha = {
        labels: [],
        datasets: [{
            label: 'Superfície',
            data: [],
            fill: false,
            borderColor: 'rgba(177, 49, 49, 1)',
            tension: 0.1
        },
        {
            label: 'Intermediário',
            data: [],
            fill: false,
            borderColor: 'rgba(69, 176, 76, 1)',
            tension: 0.1
        },
        {
            label: 'Profundo',
            data: [],
            fill: false,
            borderColor: 'rgba(255, 179, 0, 1)',
            tension: 0.1
        }],
    };

    //Inicialização do Segundo Gráfico (Linhas)
    graficoSlaveDoisLinha = new Chart(elementoSlaveDoisLinha, {
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
    //Geração de Planilha do Master
    exportarSlaveDois.on('click', function() {
        if (!graficoSlaveDoisLinha) {
            alert("O gráfico ainda não foi carregado.");
            return;
        }

        const labels = graficoSlaveDoisLinha.data.labels;
        const datasets = graficoSlaveDoisLinha.data.datasets;

        const dadosParaPlanilha = [];

        labels.forEach((label, index) => {
            const linha = {
                'Horário': label
            };

            datasets.forEach(dataset => {
                linha[dataset.label] = dataset.data[index];
            });

            dadosParaPlanilha.push(linha);
        });

        if (dadosParaPlanilha.length === 0) {
            alert("Não há dados no gráfico para exportar.");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(dadosParaPlanilha);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório de Leituras");

        XLSX.writeFile(workbook, "relatorio_grafico_slave_2.xlsx");
    });
    //----------------------------------------//

    //Gráficos do Master
    //Dados referentes ao Gráfico (Linhas)
    const dadosMasterLinha = {
        labels: [],
        datasets: [{
            label: 'Superfície',
            data: [],
            fill: false,
            borderColor: 'rgba(177, 49, 49, 1)',
            tension: 0.1
        },
        {
            label: 'Intermediário',
            data: [],
            fill: false,
            borderColor: 'rgba(69, 176, 76, 1)',
            tension: 0.1
        },
        {
            label: 'Profundo',
            data: [],
            fill: false,
            borderColor: 'rgba(255, 179, 0, 1)',
            tension: 0.1
        }],
    };

    //Inicialização do Gráfico (Linhas)
    graficoMasterLinha = new Chart(elementoMasterLinha, {
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

    //Geração de Planilha do Master
    exportarMaster.on('click', function() {
        if (!graficoMasterLinha) {
            alert("O gráfico ainda não foi carregado.");
            return;
        }

        const labels = graficoMasterLinha.data.labels;
        const datasets = graficoMasterLinha.data.datasets;

        const dadosParaPlanilha = [];

        labels.forEach((label, index) => {
            const linha = {
                'Horário': label
            };

            datasets.forEach(dataset => {
                linha[dataset.label] = dataset.data[index];
            });

            dadosParaPlanilha.push(linha);
        });

        if (dadosParaPlanilha.length === 0) {
            alert("Não há dados no gráfico para exportar.");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(dadosParaPlanilha);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório de Leituras");

        XLSX.writeFile(workbook, "relatorio_grafico_master.xlsx");
    });

});

dadosBaseRef.on('value', (snapshot) => {

    let dados = snapshot.val();

    snapshot.forEach((childSnapshot) => {
        keyDataDados = childSnapshot.key;
        dataDados = childSnapshot.val();
    });

    const keyHoraDados = Object.keys(dataDados);
    const horaDados = keyHoraDados[keyHoraDados.length - 1];

    elementoTempo.innerHTML = keyDataDados + " / " + horaDados;

    var dadosMaster = {
        'A': dados[keyDataDados][horaDados]['tipo']['master']['nivelAlto'],
        'M': dados[keyDataDados][horaDados]['tipo']['master']['nivelMedio'],
        'B': dados[keyDataDados][horaDados]['tipo']['master']['nivelBaixo']

    };
    

    var dadosSlaveUm = {
        'A': dados[keyDataDados][horaDados]['tipo']['slave_1']['nivelAlto'],
        'M': dados[keyDataDados][horaDados]['tipo']['slave_1']['nivelMedio'],
        'B': dados[keyDataDados][horaDados]['tipo']['slave_1']['nivelBaixo']
    }

    var dadosSlaveDois = {
        'A': dados[keyDataDados][horaDados]['tipo']['slave_2']['nivelAlto'],
        'M': dados[keyDataDados][horaDados]['tipo']['slave_2']['nivelMedio'],
        'B': dados[keyDataDados][horaDados]['tipo']['slave_2']['nivelBaixo']
    }

    graficoMasterLinha.data.labels.push(horaDados);
    graficoMasterLinha.data.datasets[0].data.push(dadosMaster['A']);
    graficoMasterLinha.data.datasets[1].data.push(dadosMaster['M']);
    graficoMasterLinha.data.datasets[2].data.push(dadosMaster['B']);

    graficoMasterLinha.update();

    graficoSlaveUmLinha.data.labels.push(horaDados);
    graficoSlaveUmLinha.data.datasets[0].data.push(dadosSlaveUm['A']);
    graficoSlaveUmLinha.data.datasets[1].data.push(dadosSlaveUm['M']);
    graficoSlaveUmLinha.data.datasets[2].data.push(dadosSlaveUm['B']);

    graficoSlaveUmLinha.update();

    graficoSlaveDoisLinha.data.labels.push(horaDados);
    graficoSlaveDoisLinha.data.datasets[0].data.push(dadosSlaveDois['A']);
    graficoSlaveDoisLinha.data.datasets[1].data.push(dadosSlaveDois['M']);
    graficoSlaveDoisLinha.data.datasets[2].data.push(dadosSlaveDois['B']);

    graficoSlaveDoisLinha.update();

    elementoNivelAltoMaster.innerHTML = dadosMaster['A'] == '-1' ? "Sem dados" : dadosMaster['A'] + "%";
    elementoNivelMedioMaster.innerHTML = dadosMaster['M'] == '-1' ? "Sem dados" : dadosMaster['M'] + "%";
    elementoNivelBaixoMaster.innerHTML = dadosMaster['B'] == '-1' ? "Sem dados" : dadosMaster['B'] + "%";


    elementoNivelAltoSlaveUm.innerHTML = dadosSlaveUm['A'] == '-1' ? "Sem dados" : dadosSlaveUm['A'] + "%";
    elementoNivelMedioSlaveUm.innerHTML = dadosSlaveUm['M'] == '-1' ? "Sem dados" : dadosSlaveUm['M'] + "%";
    elementoNivelBaixoSlaveUm.innerHTML = dadosSlaveUm['B'] == '-1' ? "Sem dados" : dadosSlaveUm['B'] + "%";

    elementoNivelAltoSlaveDois.innerHTML = dadosSlaveDois['A'] == '-1' ? "Sem dados" : dadosSlaveDois['A'] + "%";
    elementoNivelMedioSlaveDois.innerHTML = dadosSlaveDois['M'] == '-1' ? "Sem dados" : dadosSlaveDois['M'] + "%";
    elementoNivelBaixoSlaveDois.innerHTML = dadosSlaveDois['B'] == '-1' ? "Sem dados" : dadosSlaveDois['B'] + "%";




});

