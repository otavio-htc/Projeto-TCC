// Captação de elementos pelo id para inserção dos dados do Slave Um.
const elementoNivelAltoSlaveUm = document.getElementById('nivelAltoSlaveUm');
const elementoNivelMedioSlaveUm = document.getElementById('nivelMedioSlaveUm');
const elementoNivelBaixoSlaveUm = document.getElementById('nivelBaixoSlaveUm');

// Captação de elementos pelo id para inserção dos dados do Slave Dois.
const elementoNivelAltoSlaveDois = document.getElementById('nivelAltoSlaveDois');
const elementoNivelMedioSlaveDois = document.getElementById('nivelMedioSlaveDois');
const elementoNivelBaixoSlaveDois = document.getElementById('nivelBaixoSlaveDois');

// Captação de elementos pelo id para inserção dos dados do Master.
const elementoNivelAltoMaster = document.getElementById('nivelAltoMaster');
const elementoNivelMedioMaster = document.getElementById('nivelMedioMaster');
const elementoNivelBaixoMaster = document.getElementById('nivelBaixoMaster');

const elementoTempo = document.getElementById('ultimaLeitura');

// Credenciais referentes ao Realtime Database Do Projeto.
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

// Inicialização do Realtime Database e armazenamento da referência para o serviço.
const databaseInicial = firebase.database();

// Variável para armazenamento das informações recebidas do banco a partir da raiz "/registros".
var registrosBaseRef = databaseInicial.ref('registros');

// Armazenamento de informações recebidas a partir da raiz, limitada à ultima inserção.
var dadosBaseRef = registrosBaseRef.orderByKey().limitToLast(1);

// Captação de elementos pelo id para inserção do gráfico correspondente.
const elementoSlaveUmLinha = document.getElementById('graficoSlaveUmLinhaMonitoramento');
const elementoSlaveDoisLinha = document.getElementById('graficoSlaveDoisLinhaMonitoramento');
const elementoMasterLinha = document.getElementById('graficoMasterLinhaMonitoramento');

// Variáveis responsáveis pelo armazenamento da inicialização dos gráficos.
let graficoSlaveUmLinha;
let graficoSlaveDoisLinha;
let graficoMasterLinha;

// Constantes responsáveis pela captação de elementos por id usando jQuery.
const exportarMaster = $('#exportarMaster');
const exportarSlaveUm = $('#exportarSlaveUm');
const exportarSlaveDois = $('#exportarSlaveDois');

// Relatórios Gráficos utilizando a Biblioteca Charts.js.
$(document).ready(function () {

    // Gráficos do Slave Um.
    // Dados referentes ao Gráfico (Linhas).
    const dadosSlaveUmLinha = {
        labels: [],
        datasets: [{
            label: 'Superfície',
            data: [],
            fill: false,
            borderColor: 'rgba(69, 176, 76, 1)',
            tension: 0.1
        },
        {
            label: 'Intermediário',
            data: [],
            fill: false,
            borderColor: 'rgba(255, 179, 0, 1)',
            tension: 0.1
        },
        {
            label: 'Profundo',
            data: [],
            fill: false,
            borderColor:'rgba(177, 49, 49, 1)',
            tension: 0.1
        }],
    };

    // Inicialização do Gráfico (Linhas).
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
    // Geração de Planilha do Slave Um.
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

    // Gráficos do Slave Dois.
    // Dados referentes ao Gráfico (Linhas).
    const dadosSlaveDoisLinha = {
        labels: [],
        datasets: [{
            label: 'Superfície',
            data: [],
            fill: false,
            borderColor: 'rgba(69, 176, 76, 1)',
            tension: 0.1
        },
        {
            label: 'Intermediário',
            data: [],
            fill: false,
            borderColor: 'rgba(255, 179, 0, 1)',
            tension: 0.1
        },
        {
            label: 'Profundo',
            data: [],
            fill: false,
            borderColor:'rgba(177, 49, 49, 1)',
            tension: 0.1
        }],
    };

    // Inicialização do Segundo Gráfico (Linhas).
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
    // Geração de Planilha do Master.
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

    // Gráficos do Master.
    // Dados referentes ao Gráfico (Linhas).
    const dadosMasterLinha = {
        labels: [],
        datasets: [{
            label: 'Superfície',
            data: [],
            fill: false,
            borderColor: 'rgba(69, 176, 76, 1)',
            tension: 0.1
        },
        {
            label: 'Intermediário',
            data: [],
            fill: false,
            borderColor: 'rgba(255, 179, 0, 1)',
            tension: 0.1
        },
        {
            label: 'Profundo',
            data: [],
            fill: false,
            borderColor:'rgba(177, 49, 49, 1)',
            tension: 0.1
        }],
    };

    // Inicialização do Gráfico (Linhas).
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

    // Geração de Planilha do Master.
    exportarMaster.on('click', function() {
        if (!graficoMasterLinha) {
            alert("O gráfico ainda não foi carregado.");
            return;
        }
        
        // Armazena os atributos label e dataset do gráfico correspondente.
        const labels = graficoMasterLinha.data.labels;
        const datasets = graficoMasterLinha.data.datasets;

        // Array responsável por armazenar os dados que serão inseridos na planilha.
        const dadosParaPlanilha = [];

        // Percorre as labels e os datasets, armazenando os dados recebidos.
        // na constante "linha"
        labels.forEach((label, index) => {
            const linha = {
                'Horário': label
            };

            datasets.forEach(dataset => {
                linha[dataset.label] = dataset.data[index];
            });

            // Insere os dados no array.
            dadosParaPlanilha.push(linha);
        });

        if (dadosParaPlanilha.length === 0) {
            alert("Não há dados no gráfico para exportar.");
            return;
        }

        // Converte os dados de .json para dados de planilha.
        const worksheet = XLSX.utils.json_to_sheet(dadosParaPlanilha);

        // Cria uma nova "Pasta de Trabalho"
        const workbook = XLSX.utils.book_new();

        // Insere os dados na pasta de trabalho
        XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório de Leituras");

        // Cria o arquivo para download
        XLSX.writeFile(workbook, "relatorio_grafico_master.xlsx");
    });

});

// Responsável por "escutar" constantemente as mudanças de valor no Firebase.
dadosBaseRef.on('value', (snapshot) => {

    // Armazena os dados recebidos no "Snapshot"
    let dados = snapshot.val();

    // Percorre o "Snapshot".
    snapshot.forEach((childSnapshot) => {
        // Armazena a data.
        keyDataDados = childSnapshot.key;
        // Armazena os valores em cada horário.
        dataDados = childSnapshot.val();
    });

    // Armazena o valor de cada horário presente no "Snapshot".
    const keyHoraDados = Object.keys(dataDados);
    // Armazena o ultimo valor de horário recebido.
    const horaDados = keyHoraDados[keyHoraDados.length - 1];

    // Insere diretamente no HTML a data e o horário correspondente a última consulta.
    elementoTempo.innerHTML = keyDataDados + " / " + horaDados;

    // Armazena os dados recebidos pelo Master.
    // 'A' --> Superfície.
    // 'M' --> Intermediário.
    // 'B' --> Profundo.
    var dadosMaster = {
        'A': dados[keyDataDados][horaDados]['tipo']['master']['nivelAlto'],
        'M': dados[keyDataDados][horaDados]['tipo']['master']['nivelMedio'],
        'B': dados[keyDataDados][horaDados]['tipo']['master']['nivelBaixo']

    };
    
    // Armazena os dados recebidos pelo Slave Um.
    // 'A' --> Superfície.
    // 'M' --> Intermediário.
    // 'B' --> Profundo.
    var dadosSlaveUm = {
        'A': dados[keyDataDados][horaDados]['tipo']['slave_1']['nivelAlto'],
        'M': dados[keyDataDados][horaDados]['tipo']['slave_1']['nivelMedio'],
        'B': dados[keyDataDados][horaDados]['tipo']['slave_1']['nivelBaixo']
    }

    // Armazena os dados recebidos pelo Slave Dois.
    // 'A' --> Superfície.
    // 'M' --> Intermediário.
    // 'B' --> Profundo.
    var dadosSlaveDois = {
        'A': dados[keyDataDados][horaDados]['tipo']['slave_2']['nivelAlto'],
        'M': dados[keyDataDados][horaDados]['tipo']['slave_2']['nivelMedio'],
        'B': dados[keyDataDados][horaDados]['tipo']['slave_2']['nivelBaixo']
    }

    // Insere os dados no Gráfico do Master.
    graficoMasterLinha.data.labels.push(horaDados);
    graficoMasterLinha.data.datasets[0].data.push(dadosMaster['A']);
    graficoMasterLinha.data.datasets[1].data.push(dadosMaster['M']);
    graficoMasterLinha.data.datasets[2].data.push(dadosMaster['B']);

    // Atualiza o Gráfico a cada nova inserção.
    graficoMasterLinha.update();

    // Insere os dados no Gráfico do Slave Um.
    graficoSlaveUmLinha.data.labels.push(horaDados);
    graficoSlaveUmLinha.data.datasets[0].data.push(dadosSlaveUm['A']);
    graficoSlaveUmLinha.data.datasets[1].data.push(dadosSlaveUm['M']);
    graficoSlaveUmLinha.data.datasets[2].data.push(dadosSlaveUm['B']);

    // Atualiza o Gráfico a cada nova inserção.
    graficoSlaveUmLinha.update();

    // Insere os dados no Gráfico do Slave Dois.
    graficoSlaveDoisLinha.data.labels.push(horaDados);
    graficoSlaveDoisLinha.data.datasets[0].data.push(dadosSlaveDois['A']);
    graficoSlaveDoisLinha.data.datasets[1].data.push(dadosSlaveDois['M']);
    graficoSlaveDoisLinha.data.datasets[2].data.push(dadosSlaveDois['B']);

    // Atualiza o Gráfico a cada nova inserção.
    graficoSlaveDoisLinha.update();

    // Insere os dados recebidos do Master na página.
    elementoNivelAltoMaster.innerHTML = dadosMaster['A'] == '-1' ? "Sem dados" : dadosMaster['A'] + "%";
    elementoNivelMedioMaster.innerHTML = dadosMaster['M'] == '-1' ? "Sem dados" : dadosMaster['M'] + "%";
    elementoNivelBaixoMaster.innerHTML = dadosMaster['B'] == '-1' ? "Sem dados" : dadosMaster['B'] + "%";

    // Insere os dados recebidos do Slave Um na página.
    elementoNivelAltoSlaveUm.innerHTML = dadosSlaveUm['A'] == '-1' ? "Sem dados" : dadosSlaveUm['A'] + "%";
    elementoNivelMedioSlaveUm.innerHTML = dadosSlaveUm['M'] == '-1' ? "Sem dados" : dadosSlaveUm['M'] + "%";
    elementoNivelBaixoSlaveUm.innerHTML = dadosSlaveUm['B'] == '-1' ? "Sem dados" : dadosSlaveUm['B'] + "%";

    // Insere os dados recebidos do Slave Dois na página.
    elementoNivelAltoSlaveDois.innerHTML = dadosSlaveDois['A'] == '-1' ? "Sem dados" : dadosSlaveDois['A'] + "%";
    elementoNivelMedioSlaveDois.innerHTML = dadosSlaveDois['M'] == '-1' ? "Sem dados" : dadosSlaveDois['M'] + "%";
    elementoNivelBaixoSlaveDois.innerHTML = dadosSlaveDois['B'] == '-1' ? "Sem dados" : dadosSlaveDois['B'] + "%";

});

