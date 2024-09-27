<?php
    session_start();
    if (!isset($_SESSION['dniProfesor'])) {
        header('Location: ../index.php');
        exit;
    }
    include('../../php/conexion.php');
    $idSalida = $_SESSION['idSalida'];
    $hijos = isset($_SESSION['hijos']) ? $_SESSION['hijos'] : [];
    $error = isset($_SESSION['error']) ? $_SESSION['error'] : null;
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Menu de Salidas</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="../../css/menuSalida.css">
    </head>
    <body>
        <nav class="navbar navbar-custom">
            <div class="container-fluid d-flex align-items-center">
                <a onclick="window.history.back();" class="btn btn-warning ms-auto" style="color: white;">Atrás</a>
            </div>
        </nav>

        <div class="container">
            <h1>
                <?php
                    echo $_SESSION['denominacionProyecto'];
                ?>
            </h1>
            <div class="row mt-5">
                <div class="col-md-6">
                    <h3>Formularios</h3>
                    <hr>
                    <ul>
                        <li><a href="formularioAnexosCompletos.php" class="btn form-control botones w-100 mb-3">Anexos 5/8/9/10</a></li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <h3>Documentos (PDF)</h3>
                    <hr>
                    <ul>
                        <li><a href="../pdf/plantillaAnexoIV.php" class="btn form-control botones w-100 mb-3">Anexo 4</a></li>
                        <li><a href="../pdf/plantillaAnexoV.php" class="btn form-control botones w-100 mb-3">Anexo 5</a></li>
                        <?php include('../../php/menuSalidaTraerPDF.php'); ?>
                    </ul>
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>
</html>
