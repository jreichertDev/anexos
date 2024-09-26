<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <title>Document</title>
    <style>
        ol {
            list-style-type: lower-alpha; /* Cambia el estilo de la lista a letras minúsculas */
        }
    </style>
</head>
<body>
    <button type="button" class="btn btn-primary" id="btnCrearPdf">Crear PDF</button>

    <div id="plantilla" class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-12 d-flex">
                <div style="padding-left: 40px;" class="col-6 d-flex justify-content-start">
                    <img src="../../../imagenes/eest.webp" style="width: 100px;" alt="">
                </div>
                <div class="col-6 d-flex justify-content-end" style="align-items: center;">
                    <img src="../../../imagenes/logoProvincia.jpg" alt="">
                </div>
            </div>
            <div class="col-12 d-flex justify-content-end mt-5">
                <p>Corresponde al Expediente N° 5802-1701421/17</p>
            </div>
            <div class="col-12 d-flex justify-content-center">
                <p class="m-0 p-0 fw-bold">ANEXO VII</p>
            </div>
            <div class="col-12 d-flex justify-content-center">
                <p class="fw-medium m-0 p-0">PLANILLA DE SALUD PARA SALIDA EDUCATIVA/SALIDA DE REPRESENTACION INSTITUCIONAL</p>
            </div>
            <div class="row d-flex justify-content-center">    
                <div class="col-12 fw-medium">
                    <p class="m-0 p-0">Fecha:</p>
                    <p class="m-0 p-0">Apellido y Nombres Alumno:</p>
                    <p class="m-0 p-0">Apellido y Nombre del Padre, Madre, Tutor o Representante  Legal</p>
                    <span>Dirección</span>
                    <span>Teléfono:</span>
                    <p class="m-0 p-0">Lugar a Viajar:</p>
                </div>
            </div>


            <div style="width: 1120px; margin-left: 20px;" class="row">
                <div class="col-12 fw-medium">
                    <span>1. ¿Es alérgico?</span> 
                    <span style="border: 1px solid black;">SI</span>
                     - 
                    <span style="border: 1px solid black;">NO</span>
                    <span>(tachar lo que no corresponda).</span>
                    <p>En caso de respuesta positiva ¿a que?</p>
                </div>
                <div class="col-12 fw-medium">
                    <span>2. ¿Ha sufrio en los último 30 días?</span> 
                    <span>(marcar con una X)</span>
                    <ol>
                        <li>Procesos Inflamatorios ()</li>
                        <li>Fracturas o esguinces ()</li>
                        <li>Enfermedades infecto-contagiosas ()</li>
                        <li>Otras:</li>
                    </ol>
                </div>
                <div class="col-12 fw-medium">
                    <span>3. ¿Está tomando alguna medicación?</span>
                    <span style="border: 1px solid black;">SI</span>
                     - 
                    <span style="border: 1px solid black;">NO</span>
                    <span>(tachar lo que no corresponda).</span>
                    <p>En caso de respuesta positiva: ¿Cuál?</p>
                </div>
                <div class="col-12 fw-medium">
                    <span>4. Deje constancia de cualquier indicación que estime necesario deba conocer el personal médico y docente a cargo:</span>
                </div>
                <div class="col-12 fw-medium">
                    <span>5. ¿Tiene Obra Social?</span>
                    <span style="border: 1px solid black;">SI</span>
                     - 
                    <span style="border: 1px solid black;">NO</span>
                    <span>(tachar lo que no corresponda).</span>
                    <span>En caso de respuesta positiva deberá acompañar la presente planilla con carnet o copia del carnet.</span>
                </div>
            </div>


            <div class="row">
                <div class="col-12 fw-medium">
                    <p>Dejo constancia de haber cumplimentado la planilla de salud de mi hijo/a……………………………….. en…………………….. a los ………………. días del mes de ………………….. autorizando por la presente a actuar en caso de emergencia, según lo dispongan profesionales médicos.
                        La presente se realiza bajo forma de declaración jurada con relación a los datos consignados arriba.</p>
                </div>
                <div class="col-12 mt-1 d-flex">
                    <div class="col-6 mt-1 pt-1">
                        <div class="col-12 d-flex justify-content-center">
                            <span class="fw-bold">Firma Padre, Madre, Tutor o</span>
                        </div>
                        <div class="col-12 d-flex justify-content-center">
                            <span class="fw-bold">Representante Legal</span>
                        </div>
                    </div>
                    <div class="col-6 mt-1 pt-1">
                        <div class="col-12 d-flex justify-content-center">
                            <span class="fw-bold">Aclaración de firma</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        document.getElementById("btnCrearPdf").addEventListener("click", function() {
            var element = document.getElementById('plantilla');
            html2pdf()
                .set({
                    margin: [0.2, 1, 0.2, 1],
                    filename: 'anexoVI.pdf',
                    image: {
                        type: 'jpeg',
                        quality: 0.98
                    },
                    html2canvas: {
                        scale: 3,
                        letterRendering: true,
                    },
                    jsPDF: {
                        unit: "in",
                        format: "a4",
                        orientation: 'portrait'
                    }
                })
                .from(element)
                .save();
        });
    </script>
</body>
</html>