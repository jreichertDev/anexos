<?php
    session_start();
    if (!isset($_SESSION['dniProfesor']) || !isset($_SESSION['dniPadre']) || !isset($_SESSION['dniDirector'])) {
        header('Location: ../../index.php');
        exit;
    } else {
        include('../../php/conexion.php');
    }
?>