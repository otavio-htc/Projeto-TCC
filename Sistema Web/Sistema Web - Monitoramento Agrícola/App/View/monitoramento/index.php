<!-- Aqui deve ser inserido o conteúdo que será exibido na página -->
<div class="container-fluid">

    <!--Ínicio da Seção para inserção dos dados do Firebase-->
    <section class="mt-4">

        <!--Ínicio da Área de título da Leitura dos Sensores-->
        <div class="row">
            <div class="col-12 col-lg-12">
                <div class="title d-flex justify-content-center flex-column mt-5 mb-3">
                    <h2 class="text-center">Leitura dos Sensores</h2>
                    <div class="d-flex justify-content-center">
                        <span id="ultimaLeitura" class="text-white fs-3"></span>
                    </div>
                </div>
            </div>
        </div>
        <!--Fim da Área de título da Leitura dos Sensores-->

        <!--Ínicio da Área de Leitura dos Sensores-->
        <div class="row">
            <div class="col-md-6 col-lg-4">
                <div class="card">
                    <div class="card-header bg-black text-center">
                        <p><strong>Slave Um</strong></p>
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush mb-5">
                            <li class="list-group-item text-center">
                                <span class="badge rounded"><strong>Superficial:</strong></span>
                                <span id="nivelAltoSlaveUm"></span>
                            </li>
                            <li class="list-group-item text-center">
                                <span class="badge rounded"><strong>Intermediário:</strong></span>
                                <span id="nivelMedioSlaveUm"></span>
                            </li>
                            <li class="list-group-item text-center">
                                <span class="badge rounded"><strong>Profundo:</strong></span>
                                <span id="nivelBaixoSlaveUm"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card">
                    <div class="card-header bg-black text-center">
                        <p><strong>Master</strong></p>
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush mb-5">
                            <li class="list-group-item text-center">
                                <span class="badge rounded"><strong>Superficial:</strong></span>
                                <span id="nivelAltoMaster"></span>
                            </li>
                            <li class="list-group-item text-center">
                                <span class="badge rounded"><strong>Intermediário:</strong></span>
                                <span id="nivelMedioMaster"></span>
                            </li>
                            <li class="list-group-item text-center">
                                <span class="badge rounded"><strong>Profundo:</strong></span>
                                <span id="nivelBaixoMaster"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card">
                    <div class="card-header bg-black text-center">
                        <p><strong>Slave Dois</strong></p>
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush mb-5">
                            <li class="list-group-item text-center">
                                <span class="badge rounded"><strong>Superficial:</strong></span>
                                <span id="nivelAltoSlaveDois"></span>
                            </li>
                            <li class="list-group-item text-center">
                                <span class="badge rounded"><strong>Intermediário:</strong></span>
                                <span id="nivelMedioSlaveDois"></span>
                            </li>
                            <li class="list-group-item text-center">
                                <span class="badge rounded"><strong>Profundo:</strong></span>
                                <span id="nivelBaixoSlaveDois"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--Fim da Área de Leitura dos Sensores-->
    </section>
    <!--Fim da Seção para inserção dos dados do Firebase-->

    <!--Ínicio da Seção para Apresentação da Área de Relatórios -->
    <section class="mt-4">

        <!--Ínicio do Título da Área de Geração Gráfica de Relatório-->
        <div class="row">
            <div class="col-12 col-lg-12">
                <div class="title d-flex justify-content-center mb-3">
                    <h2>Relatório Gráfico</h2>
                </div>
            </div>
        </div>
        <!--Fim do Título da Área de Geração Gráfica de Relatório-->

        <!--Ínicio da Área de Geração Gráfica de Relatório-->
        <div class="row">
            <div class="col-12 col-lg-12">
                <div class="card mb-5">
                    <div class="card-header bg-black text-center">
                        <span><strong>Valores de Umidade</strong></span>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="d-flex justify-content-center">
                                    <canvas id="graficoSlaveUmLinhaMonitoramento"></canvas>
                                </div>
                                <div class="d-flex justify-content-center mt-4 mb-3">
                                    <button id="exportarSlaveUm" class="btn btn-primary">
                                        Gerar relatório individual
                                    </button>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="d-flex justify-content-center">
                                    <canvas id="graficoMasterLinhaMonitoramento"></canvas>
                                </div>
                                <div class="d-flex justify-content-center mt-4">
                                    <button id="exportarMaster" class="btn btn-primary">
                                        Gerar relatório individual
                                    </button>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="d-flex justify-content-center">
                                    <canvas id="graficoSlaveDoisLinhaMonitoramento"></canvas>
                                </div>
                                <div class="d-flex justify-content-center mt-4">
                                    <button id="exportarSlaveDois" class="btn btn-primary">
                                        Gerar relatório individual
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--Fim da Área de Geração Gráfica de Relatório-->

    </section>
    <!--Fim da Seção para Apresentação da Área de Relatórios -->

</div>