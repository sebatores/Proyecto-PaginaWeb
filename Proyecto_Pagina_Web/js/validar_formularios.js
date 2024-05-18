$(document).ready(function() {

    // Métodos de Validación

        // Validar Rut

    $.validator.addMethod("rutChileno", function(value, element) {

        // Validar que el RUT tenga el formato correcto (8 o 9 dígitos + guión + dígito verificador)
        var rutPattern = /^\d{7,8}-[\dK]$/;
        if (!rutPattern.test(value)) {
            return false;
        }
    
        // Validar el dígito verificador
        var rutSinGuion = value.replace("-", "");
        var rut = rutSinGuion.slice(0, -1);
        var dv = rutSinGuion.slice(-1);
        var factor = 2;
        var sum = 0;
        for (var i = rut.length - 1; i >= 0; i--) {
            sum += parseInt(rut.charAt(i)) * factor;
            factor = factor === 7 ? 2 : factor + 1;
        }
        var dvCalculado = 11 - (sum % 11);
        dvCalculado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();
    
        return dv === dvCalculado;
        }, "El RUT no es válido (escriba sin puntos y con guión)");

        // El siguiente Javascript obliga a que la caja de texto del rut, siempre escriba la letra "K" en mayúscula
    $('rut').on('keyup', function() {
        $(this).val($(this).val().toUpperCase());
    });


        // Validar Correo

    $.validator.addMethod("emailCompleto", function(value, element) {

        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;
    
        return regex.test(value);
    
      }, 'El formato del correo no es válido');


        // Validar Nombre y Apellido

    $.validator.addMethod("soloLetras", function(value, element) {

        return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
    
        }, "Sólo se permiten letras y espacios en blanco.");


    // Seleccionar una imagen y mostrarla en el elemento img

    $('#foto').change(function(event) {

        var archivo = event.target.files[0];
        
        var urlImagen = URL.createObjectURL(archivo);
        
        $('#imagen').attr('src', urlImagen);

    });

    
    // Validadores para el formulario PRODUCTOS
    
    $("#formulario-productos").validate({
        rules: {
            id: {
                required: true
            },
            categoria: {
                required: true
            },
            nombre: {
                required: true
            },
            descripcion: {
                required: true
            },
            precio: {
                required: true
            },
            descuento_suscripcion: {
                required: true
            },
            descuento_oferta: {
                required: true
            },
            foto: {
                required: true
            },
        },
        messages: {
            id: {
                required: "El id es un campo requerido."
            },
            categoria: {
                required: "La categoria es un campo requerido."
            },
            nombre: {
                required: "El nombre es un campo requerido."
            },
            descripcion: {
                required: "La descripcion es un campo requerido."
            },
            precio: {
                required: "El precio es un campo requerido."
            },
            descuento_suscripcion: {
                required: "El descuento por suscripcion es un campo requerido."
            },
            foto: {
                required: "La foto es un campo requerido."
            },
        },
    }),


    // Validador para el formulario USUARIOS

    $("#formulario-usuarios").validate({

        rules: {
            id: {
                required: true
            },
            tipo_usuario: {
                required: true
            },
            rut: {
                required: true,
                rutChileno: true
            },
            nombres: {
                required: true,
                soloLetras: true
            },
            apellidos: {
                required: true,
                soloLetras: true
            },
            correo: {
                required: true,
                emailCompleto: true
            },
            direccion: {
                required: true
            },
            contrasena: {
                required: true,
                minlength: 5,
                maxlength: 15,
            },
            foto: {
                required: true
            },
        },
        messages: {
            id: {
                required: "El id es un campo requerido."
            },
            tipo_usuario: {
                required: "Seleccione el tipo de usuario"
            },
            rut: {
                required: "El rut es un campo requerido.",
                rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
            },
            nombres: {
                required: "Los nombres son un campo requerido.",
                soloLetras: "El nombre sólo puede contener letras y espacios en blanco."
            },
            apellidos: {
                required: "Los apellidos son un campo requerido.",
                soloLetras: "El apellido sólo puede contener letras y espacios en blanco."
            },
            correo: {
                required: "El correo es un campo requerido.",
                emailCompleto: "El formato del correo no es válido."
            },
            direccion: {
                required: "La dirección es un campo requerido."
            },
            contrasena: {
                required: "La contraseña es un campo requerido.",
                minlength: "La contraseña debe tener un mínimo de 5 caracteres",
                maxlength: "La contraseña debe tener un máximo de 15 caracteres",
            },
            foto: {
                required: "La foto es un campo requerido."
            },
        },
    })
    
});