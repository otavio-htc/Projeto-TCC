<!-- Aqui deve ser inserido o conteúdo que será exibido na página -->
<div class="container-fluid">
    
    <!--Ínicio da Seção para inserção dos dados do Firebase-->
    <section class="mt-4">

        <!--Ínicio da Área de título da Leitura dos Sensores-->
        <div class="row">
            <div class="col-12 col-lg-12">
                <div class="title d-flex justify-content-center mt-5 mb-3">
                    <h2>Leitura dos Sensores</h2>
                </div>
            </div>
        </div>
        <!--Fim da Área de título da Leitura dos Sensores-->

        <!--Ínicio da Área de Leitura dos Sensores-->
        <div class="row">   
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card">
                    <div class="card-header bg-black text-center">
                        <p><strong>Slave Um</strong></p>
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush mb-5">
                            <li class="list-group-item text-center">
                                <span class ="badge rounded"><strong>Superficial:</strong></span>
                                Teste
                            </li>
                            <li class="list-group-item text-center">
                                <span class ="badge rounded"><strong>Intermediário:</strong></span>
                                Teste
                            </li>
                            <li class="list-group-item text-center">
                                <span class ="badge rounded"><strong>Profundo:</strong></span>
                                Teste
                            </li>
                        </ul>
                        <div class="d-flex justify-content-center">
                            <a href="#" class="btn btn-primary">Gerar relatório individual</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4"> 
                <div class="card">
                    <div class="card-header bg-black text-center">
                        <p><strong>Master</strong></p> 
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush mb-5">
                            <li class="list-group-item text-center">
                                <span class ="badge rounded"><strong>Superficial:</strong></span>
                                Teste
                            </li>
                            <li class="list-group-item text-center">
                                <span class ="badge rounded"><strong>Intermediário:</strong></span>
                                Teste
                            </li>
                            <li class="list-group-item text-center">
                                <span class ="badge rounded"><strong>Profundo:</strong></span>
                                Teste
                            </li>
                        </ul>
                        <div class="d-flex justify-content-center">
                            <a href="#" class="btn btn-primary">Gerar relatório individual</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card">
                    <div class="card-header bg-black text-center">
                        <p><strong>Slave Dois</strong></p>
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush mb-5">
                            <li class="list-group-item text-center">
                                <span class ="badge rounded"><strong>Superficial:</strong></span>
                                Teste
                            </li>
                            <li class="list-group-item text-center">
                                <span class ="badge rounded"><strong>Intermediário:</strong></span>
                                Teste
                            </li>
                            <li class="list-group-item text-center">
                                <span class ="badge rounded"><strong>Profundo:</strong></span>
                                Teste
                            </li>
                        </ul>
                        <div class="d-flex justify-content-center">
                            <a href="#" class="btn btn-primary">Gerar relatório individual</a>
                        </div>
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
                    <h2>Relatórios Gráficos</h2>
                </div>
            </div>
        </div>
        <!--Fim do Título da Área de Geração Gráfica de Relatório-->

        <!--Ínicio da Área de Geração Gráfica de Relatório-->
        <div class="row">
            <div class="col-12 col-lg-12">
                <div class="card mb-5">
                    <div class="card-header bg-black text-center">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button 
                                    class="nav-link active" 
                                    data-bs-toggle="tab" 
                                    data-bs-target="#graficoRosca" 
                                    type="button" 
                                    role="tab" 
                                    aria-controls="graficoRosca" 
                                    aria-selected="true">
                                    Gráfico em Rosca
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button 
                                    class="nav-link" 
                                    data-bs-toggle="tab" 
                                    data-bs-target="#graficoLinha" 
                                    type="button" 
                                    role="tab" 
                                    aria-controls="graficoLinha" 
                                    aria-selected="false">
                                    Gráfico de Linha
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content">
                            <div 
                                class="tab-pane fade show active" 
                                id="graficoRosca" 
                                role="tabpanel" 
                                aria-labelledby="home-tab" 
                                tabindex="0">

                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="d-flex justify-content-center mw-50">
                                            <canvas id="graficoSlaveUmRoscaMonitoramento"></canvas>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="d-flex justify-content-center mw-50">
                                            <canvas id="graficoMasterRoscaMonitoramento"></canvas>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="d-flex justify-content-center mw-50">
                                            <canvas id="graficoSlaveDoisRoscaMonitoramento"></canvas>
                                        </div>
                                    </div>
                                </div>

                            </div>
                                
                            <div 
                                class="tab-pane fade" 
                                id="graficoLinha" 
                                role="tabpanel" 
                                aria-labelledby="profile-tab" 
                                tabindex="0">

                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="d-flex justify-content-center mw-50">
                                            <canvas id="graficoSlaveUmLinhaMonitoramento"></canvas>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="d-flex justify-content-center mw-50">
                                            <canvas id="graficoMasterLinhaMonitoramento"></canvas>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="d-flex justify-content-center mw-50">
                                            <canvas id="graficoSlaveDoisLinhaMonitoramento"></canvas>
                                        </div>
                                    </div>
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