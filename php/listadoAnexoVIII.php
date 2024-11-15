<?php
    session_start();
    include 'verificarSessionNoStart.php';

    include 'conexion.php';

    $sql = "SELECT * FROM `anexoVIII` WHERE fkAnexoIV = ".$_SESSION['idSalida']."";
    $result = mysqli_query($conexion, $sql);

    if (!$result) {
        die('Ocurrió un error: ' . mysqli_error($conexion));
    }

    $listado = [];

    if (mysqli_num_rows($result) > 0) {
        while($fila = mysqli_fetch_assoc($result)) {
            $datos = array(
                'nroRegistro' => $fila['nroRegistro'],
                'fechaHabilitacion' => $fila['fechaHabilitacion'],
                'tipoHabilitacion' => $fila['tipoHabilitacion'],
                'cantAsientos' => $fila['cantAsientos'],
                'vigenciaVTV' => $fila['vigenciaVTV'],
                'nroPoliza' => $fila['nroPoliza'],
                'tipoSeguro' => $fila['tipoSeguro'],
                'nombreConductor' => $fila['nombreConductor'],
                'dniConductor' => $fila['dniConductor'],
                'carnetConducir' => $fila['carnetConducir'],
                'vigenciaConductor' => $fila['vigenciaConductor']
            );
            $listado[] = $datos;
        }
        echo json_encode(['status' => 'registrosSI', 'data' => $listado]);
    }
    else {
        echo json_encode(['status' => 'registrosNO', 'data' => []]);
    }

    mysqli_free_result($result);
    mysqli_close($conexion);
?>
