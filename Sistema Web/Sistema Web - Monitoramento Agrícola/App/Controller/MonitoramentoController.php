<?php 

    namespace App\Controller;

    use FW\Controller\Action;

    class MonitoramentoController extends Action{


        // Método responsável por renderizar a página principal.
        public function dashboard()
        {


            $this->render('/index', 'dashboard');

        }

        public function validaAutenticacao()
        {

        }

    }


?>