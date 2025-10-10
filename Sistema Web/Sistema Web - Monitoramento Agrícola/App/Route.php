<?php

namespace App;

use FW\Init\Boostrap;

class Route extends Boostrap
{

    public function initRoutes()
    {

        //Não excluir a Rota abaixo
        $routes['error-404'] = array(
            'route' => '/error404',
            'controller' => 'ErrorController',
            'action' => 'error404'
        );

        $routes['dashboard_render'] = [
            'route' => '/dashboard',
            'controller' => 'MonitoramentoController',
            'action' => 'dashboard'
        ];  


        include 'Routes/Routes_Alunos.php';

        $this->setRoutes($routes);
    }
}
