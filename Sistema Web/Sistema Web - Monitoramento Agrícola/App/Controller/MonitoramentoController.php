<?php 

    namespace App\Controller;

    use FW\Controller\Action;

    class MonitoramentoController extends Action{


        public function dashboard()
        {


            $this->render('/alunos/index', 'dashboard');

        }

        public function validaAutenticacao()
        {

        }

    }


?>