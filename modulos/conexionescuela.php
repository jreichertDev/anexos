<?php
    // Datos de la base de datos
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "escuela";
    
    // Crear conexión
    $conexion = new mysqli($servername, $username, $password, $database);
    
    // Verificar conexión
    if ($conexion->connect_error) {
        die("Conexión fallida: " . $conexion->connect_error);
    } else {
        // echo "Conexión exitosa";
    }
    
?>