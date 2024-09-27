$(document).ready(function(){
    cargarTablaPasajeros();

    $('#dniSearch, #agregarPersona').on('keydown', function(event){
        if (event.which === 13) {
            event.preventDefault();
            $("#agregarPersona").click();  
        }
    });

    $('#dniAcompañante, #nombreAcompañante, #edadAcompañante').on('keydown', function(event) {
        if (event.which === 13) {
            event.preventDefault();
            $('#cargarAcompañante').click(); 
        }
    });

    $("#dniSearch").keyup(function(event) {
        var dniPersona = $("#dniSearch").val();
        $.ajax({
            type: 'POST',
            url: '../../php/buscarPersona.php',
            data: {dniPersona: dniPersona},
            success: function(response){
                var select = document.getElementById('coincidenciaPersona');
                select.innerHTML = '';

                const personas = JSON.parse(response);

                if (personas.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: personas.error,
                    });
                    return;
                }

                const cargarPersona = function(persona) {
                    var option = document.createElement('option');
                    option.value = persona.dni;
                    option.textContent = `${persona.nombre} ${persona.apellido}`;
                    option.setAttribute('data-cargo', persona.cargo);
                    option.setAttribute('data-fechan', persona.fechan);
                    select.appendChild(option);
                }

                personas.forEach(cargarPersona);
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al buscar la persona.',
                });
            }
        });
    });

    $("#agregarPersona").click(function(){
        const select = document.getElementById('coincidenciaPersona');
        const selectedOption = select.options[select.selectedIndex];
        const dni = selectedOption.value;
        const nombreApellido = selectedOption.textContent;
        const cargo = selectedOption.getAttribute('data-cargo');
        const fechan = selectedOption.getAttribute('data-fechan');
        const idAnexoIV = salidaIDSesion;

        $.ajax({
            type: 'POST',
            url: '../../php/agregarPersonaAnexoV.php',
            data: {
                dni,
                nombreApellido,
                cargo,
                fechan,
                idAnexoIV,
                opcion: 'agregarPersona'
            },
            success: function(response) {
                const datos = JSON.parse(response);

                if (datos.status === 'success') {
                    cargarTablaPasajeros();
                    $('#dniSearch').val("");
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: datos.message,
                        timer: 1500,
                        showConfirmButton: false
                    });
                } else if (datos.status === 'error') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: datos.message,
                    });
                }
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al agregar la persona.',
                });
            }
        });
    });

    $('#cargarAcompañante').click(function() {
        const dniAcompañante = document.getElementById('dniAcompañante').value.trim();
        const nombreAcompañante = document.getElementById('nombreAcompañante').value.trim();
        const edadAcompañante = document.getElementById('edadAcompañante').value.trim();

        if (dniAcompañante === '' || nombreAcompañante === '' || edadAcompañante === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Campos vacíos',
                text: 'Por favor, complete todos los campos.',
            });
            return;
        }

        if (!/^\d{8}$/.test(dniAcompañante)) {
            Swal.fire({
                icon: 'warning',
                title: 'Formato incorrecto',
                text: 'El DNI debe tener 8 dígitos.',
            });
            return;
        }

        if (/\d/.test(nombreAcompañante)) { 
            Swal.fire({
                icon: 'warning',
                title: 'Formato incorrecto',
                text: 'El nombre del acompañante no puede contener números.',
            });
            return;
        }        

        if (edadAcompañante > 122) {
            Swal.fire({
                icon: 'warning',
                title: 'Formato incorrecto',
                text: 'La edad del acompañante no debe exceder los 122 años.',
            });
            return;
        }

        $.ajax({
            method: 'POST',
            url: '../../php/agregarPersonaAnexoV.php',
            data: {
                dniAcompañante,
                nombreAcompañante,
                edadAcompañante,
                opcion: 'agregarAcompañante'
            },
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    cargarTablaPasajeros();
                    document.getElementById('dniAcompañante').value = "";
                    document.getElementById('nombreAcompañante').value = "";
                    document.getElementById('edadAcompañante').value = "";
                    Swal.fire({
                        icon: 'success',
                        title: 'Acompañante agregado',
                        text: response.message,
                        timer: 1500,
                        showConfirmButton: false
                    });
                } else if (response.status === 'error') {
                    document.getElementById('dniAcompañante').value = "";
                    document.getElementById('nombreAcompañante').value = "";
                    document.getElementById('edadAcompañante').value = "";
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.message,
                    });
                }
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error en la comunicación con el servidor.',
                });
            }
        });
    });

    $('#selectAll').click(function() {
        const isChecked = $('.selectPersona').prop('checked') == false;
        $('.selectPersona').prop('checked', isChecked);
    });

    $(document).on('click', '#eliminarSeleccionados', function() {
        const seleccionados = [];
        $('.selectPersona:checked').each(function() {
            seleccionados.push($(this).val());
        });

        const eliminarBtn = $(this);
        eliminarBtn.prop('disabled', true);

        if (seleccionados.length > 0) {
            $.ajax({
                method: 'POST',
                url: '../../php/eliminarPersonaAnexoV.php',
                data: {dniList: seleccionados},
                success: function() {
                    Swal.fire({
                        icon: "success",
                        title: "Persona/s eliminada/s correctamente",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        cargarTablaPasajeros();
                        eliminarBtn.prop('disabled', false);
                    });
                },
                error: function() {
                    Swal.fire({
                        icon: "warning",
                        title: "Ocurrió un error al eliminar a las personas",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        eliminarBtn.prop('disabled', false);
                    });
                }
            });
        } else {
            Swal.fire({
                icon: "warning",
                title: "No se seleccionó ninguna persona",
                text: "Por favor, seleccione al menos una persona para eliminar.",
            });
            eliminarBtn.prop('disabled', false);
        }
    });

    const buscarPersonasGrupo = function(grupo, callback) {
        $.ajax({
            method: 'POST',
            url: '../../php/buscarPersonasGrupos.php',
            data: { grupo: grupo },
            success:function(response) {
                const pasajeros = JSON.parse(response);
                callback(true, pasajeros);
            },
            error:function() {
                callback(false);
            }
        });
    };

    const cargarGrupos = function(personas) {
        return $.ajax({
            method: 'POST',
            url: '../../php/agregarPersonaAnexoV.php',
            data: JSON.stringify({ personas: personas, opcion: 'agregarGrupo' }),
            contentType: 'application/json',
        });
    };

    $('#cargarGrupo').on('click', function () {
        const idGrupo = $('#grupos').val();
        
        buscarPersonasGrupo(idGrupo, function(result, pasajeros) {
            if (result) {
                cargarGrupos(pasajeros).then(function(response){
                    // console.log(response);
    
                    if (response.status === 'success') {
                        cargarTablaPasajeros();
                        Swal.fire({
                            icon: 'success',
                            title: 'Grupo agregado correctamente',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else if (response.status === 'error') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: response.message, 
                        });
                    } else {
                        // En caso de que el status no sea ni 'success' ni 'error'
                        Swal.fire({
                            icon: 'warning',
                            title: 'Aviso',
                            text: 'Respuesta inesperada del servidor.',
                        });
                    }
                }).catch(function() {
                    // Manejar cualquier error en la solicitud AJAX
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error en la solicitud para cargar los grupos.',
                    });
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al buscar personas del grupo.',
                });
            }
        });
    });

    function cargarTablaPasajeros() {
        $.ajax({
            method: 'GET',
            url: '../../php/traerPersonasAnexoV.php',
            success: function(response) {
                const pasajeros = JSON.parse(response);
                let tablaHTML = '';
                
                let cantidadMenores = 0;     
                let cantidadSemiMayores = 0;
                let cantidadMayores = 0;
                let cantidadDocentes = 0;
                let cantidadNoDocentes = 0;
                let total = pasajeros.length;
                let indice = 0;
                
                pasajeros.forEach(function(pasajero) {
                    let pasajeroEdad = pasajero.edad;
                    let alumno = '';
                    let docente = '';
                    let noDocente = '';
            
                    if (pasajeroEdad < 16) {
                        cantidadMenores += 1;
                    } else if (pasajeroEdad >= 16 && pasajeroEdad < 18) {
                        cantidadSemiMayores += 1;
                    } else if (pasajeroEdad >= 18 && parseInt(pasajero.cargo) != 2 && parseInt(pasajero.cargo) != 4) {
                        cantidadMayores += 1;
                    }
            
                    if (parseInt(pasajero.cargo) === 2) {
                        cantidadDocentes += 1;
                    }
                    if (parseInt(pasajero.cargo) === 4) {
                        cantidadNoDocentes += 1;
                    }
            
                    indice += 1;
                    switch (parseInt(pasajero.cargo)) {
                        case 2: docente = 'X'; break;
                        case 3: alumno = 'X'; break;
                        case 4: noDocente = 'X'; break;
                    }
            
                    tablaHTML += `<tr>
                                    <td>${indice}</td>
                                    <td>${pasajero.apellidoNombre}</td>
                                    <td>${pasajero.dni}</td>
                                    <td>${alumno}</td>
                                    <td>${pasajero.edad}</td>
                                    <td>${docente}</td>
                                    <td>${noDocente}</td>
                                    <td>
                                        <input type="checkbox" class="selectPersona" value="${pasajero.dni}">
                                    </td>
                                </tr>`;
                });
            
                let docentesMenores = Math.ceil(cantidadMenores / 12); 
                let docentesSemiMayores = Math.ceil(cantidadSemiMayores / 15);  
                let docentesMayores = cantidadMayores > 0 ? 1 : 0; 
            
                if (cantidadMenores % 12 !== 0 && cantidadMenores < 12) {
                    let sobrantesMenores = cantidadMenores % 12;
                    cantidadSemiMayores += sobrantesMenores;
                    docentesMenores = Math.floor(cantidadMenores / 12);
                    docentesSemiMayores = Math.ceil(cantidadSemiMayores / 15);
                }
            
                let totalDocentesRequeridos = docentesMenores + docentesSemiMayores + docentesMayores;
            
                if (totalDocentesRequeridos > 5) {
                    Swal.fire({
                        icon: "warning",
                        title: "Advertencia",
                        text: "Se recomienda agregar más docentes debido a la cantidad de alumnos.",
                    });
                }
            
                let alertaHtml = '';
                if (cantidadDocentes < totalDocentesRequeridos) {
                    alertaHtml = '<p class="alerta rojo">Anexo 5 no aprobable (Recomendación)</p>';
                } else {
                    alertaHtml = '<p class="alerta verde">Anexo 5 aprobable</p>';
                }
                
                let calculoDocentes = `
                    <h6>Cantidad de personas: ${total}</h6>
                    <h6>Menores de 16: ${cantidadMenores}</h6>
                    <h6>Entre 16 y 17: ${cantidadSemiMayores}</h6>
                    <h6>Mayores de 18: ${cantidadMayores}</h6>
                    <h6>Acompañantes (No Docentes): ${cantidadNoDocentes}</h6>
                    <h6>Docentes recomendados: ${totalDocentesRequeridos}</h6>
                    <h6>Docentes actuales: ${cantidadDocentes}</h6>
                `;
                
                $('#advice').html(alertaHtml + calculoDocentes);
                $('#tablaParticipantes').html(tablaHTML);
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ha ocurrido un error al obtener los pasajeros.',
                });
            }
        });
    }    
});
