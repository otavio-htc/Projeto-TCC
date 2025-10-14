    <footer class="footer bg-black p-4">

        <div class="d-sm-flex justify-content-center">
            <span class="text-light text-center text-sm-left d-block d-sm-inline-block">
                Copyright © <?= date('Y'); ?> -
                <?= $_ENV['DEV_AUTHOR']; ?> -
                Todos os Direitos Reservados;
            </span>
        </div>

    </footer>

    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
        integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer">
    </script>

    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js">
    </script>

    <script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>

    <script src="https://www.gstatic.com/firebasejs/12.4.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/12.4.0/firebase-database-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/12.4.0/firebase-auth-compat.js"></script>

    <script src="<?= $_ENV['BASE_URL']; ?>resources/dashboard/js/scripts.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>


    </body>




    </html>