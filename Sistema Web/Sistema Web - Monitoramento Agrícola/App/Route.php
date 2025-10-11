<?php

namespace App;

use FW\Init\Boostrap;

class Route extends Boostrap
{

    public function initRoutes()
    {
        
        //Não excluir a Rota abaixo
        $routes['error-404'] = [
            'route' => '/error404',
            'controller' => 'ErrorController',
            'action' => 'error404'
        ];

        include 'Routes/Routes_Monitoramento.php';

        $this->setRoutes($routes);
        
    }
}
