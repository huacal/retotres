const msgAlert = document.getElementById('valid-feedback');
const formRegister = document.getElementById('registerUser');
const inputs = document.querySelectorAll('#registerUser input');

const expresionsFields = {
    identificacionField: /^\d{6,10}$/,
    nameField: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    direccionField: /^[A-Za-z0-9'\.\-\s\,]/,
    telefonoField: /^\d{7,10}$/,
    emailField: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    passwordField: /^.{4,12}$/,
    zonaField: /^[a-zA-Z\s0-9_]{1,16}$/

}

const fields = {
    identificacion: false,
    names: false,
    direccion: false,
    telefono: false,
    email: false,
    password: false,
    zona: false,
}

const validateInputs = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
        case "identificacion":
            validFields(expresionsFields.identificacionField, e.target, 'identificacion');
            break;
        case "names":
            validFields(expresionsFields.nameField, e.target, 'names');
            break;
        case "direccion":
            validFields(expresionsFields.direccionField, e.target, 'direccion');
            break
        case "telefono":
            validFields(expresionsFields.telefonoField, e.target, 'telefono');
            break
        case "email":
            validFields(expresionsFields.emailField, e.target, 'email');
            break;
        case "password":
            validFields(expresionsFields.passwordField, e.target, 'password');
            validPasswordConf();
            break;
        case "passwordConf":
            validPasswordConf();
            break;
        case "zona":
            validFields(expresionsFields.zonaField, e.target, 'zona');
            break;
    }
} 

const validFields = (expresionsFields, input, campo) => {
    if (expresionsFields.test(input.value)) {
        document.getElementById("#inputGroup-identificacion .form-control").classList.remove("invalid")
    } else {
        document.getElementById("#inputGroup-identificacion .form-control").classList.add("invalid")
    }
}

const validPasswordConf = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('passwordConf');

    if (inputPassword1.value !== inputPassword2.value) {

        document.getElementById(`inputGroup-passwordConf`).classList.add('invalid');
        document.querySelector(`#inputGroup-passwordConf .text-alert-input`).classList.add('text-alert-input-activo');
        fields[password] = false;
    } else {
        document.getElementById(`inputGroup-passwordConf`).classList.remove('invalid');
        document.querySelector(`#inputGroup-passwordConf .text-alert-input`).classList.remove('text-alert-input-activo');
        fields[password] = true;
    }
}




const saveUser = () => {
    let id = document.getElementById('id').value.trim();
    let identificacion = document.getElementById('identificacion').value.trim();
    let names = document.getElementById('names').value.trim();
    let direcccion = document.getElementById('direccion').value.trim();
    let telefono = document.getElementById('telefono').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let passwordConf = document.getElementById('passwordConf').value.trim();
    let zona = document.getElementById('zona').value.trim();
    let typeUser = document.getElementById('tipo').value.trim();
    if (id != "" && identificacion != "" && names != "" && direcccion != "" && telefono != "" && email != "" && password != "" && passwordConf != "" && zona != "" && typeUser != "") {
        if (password != passwordConf) {
            msgAlert.innerHTML = '<span class="error"><i class="fas fa-exclamation-circle"></i> Las contraseñas no coinciden</span>'
        } else {
            let newUser = {
                "id": id,
                "identification": identificacion,
                "name": names,
                "address": direcccion,
                "cellPhone": telefono,
                "email": email,
                "password": password,
                "zone": zona,
                "type": typeUser
            }
            console.log(newUser);
            $.ajax({
                type: 'POST',
                url: 'http://144.22.33.96:8080/api/user/new',
                data: JSON.stringify(newUser),
                contentType: 'application/json',
                dataType: 'json',
                error: function(response) {
                    msgAlert.innerHTML = '<span class="error"> <i class="fas fa-exclamation-circle"></i>No se puede guardar el usuario</span>'
                    console.log(response);
                },
                success: function(result) {
                    console.log(result);
                    if (result.id == null) {
                        msgAlert.innerHTML = '<span class="error"><i class="fas fa-exclamation-circle"></i> No se puede crear la cuenta</span>'
                        return email
                            /* $(":input").value = " "; */
                            /* $("#names").focus();
                            $("#email").focus(); */
                    } else {
                        msgAlert.innerHTML = '<span class="sucess"><i class="fas fa-check-circle"></i> Usuario creado exitosamente</span>'
                        setTimeout(() => {
                            msgAlert.innerHTML = " "
                        }, 4000);
                    }


                }
            });
        }
    }
    return false;

}

(function() {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function(form) {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()





/* inputs.forEach((input) => {
    console.log(input);
    input.addEventListener('keyup', validateInputs);
    input.addEventListener('blur', validateInputs);
}); */

formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    saveUser();


    c
    /* onsole.log(fields.value)
        if (fields.identificacion && fields.names && fields.direccion && fields.telefono && fields.email && fields.password && fields.zona) {
            saveUser();
            formRegister.reset(); 
        } else {
            msgAlert.innerHTML = '<span class="error"><i class="fas fa-window-close"></i>  Rellene todos los campos*</span>';
            setTimeout(() => {
                msgAlert.innerHTML = " "
            }, 4000);
        } */
});

/* formRegister.addEventListener('change', (e) => {
    e.preventDefault();
    console.log(e.target)
}); */


/* Inventarios productos */


const mostrarUsuarios = (idUser) => {
    let tableUsers = $("#registerUsers");

    $.ajax({
        url: "http://144.22.33.96:8080/api/user/all",
        type: 'GET',
        datatype: 'json',
        success: function(respuesta) {
            console.log(respuesta);
            for (i = 0; i < respuesta.length; i++) {
                tableUsers.append('<tr><td>' +
                    respuesta[i].identification +
                    '</td><td>' +
                    respuesta[i].name +
                    '</td><td>' +
                    respuesta[i].address +
                    '</td><td>' +
                    respuesta[i].cellPhone +
                    '</td><td>' +
                    respuesta[i].email +
                    '</td><td>' +
                    respuesta[i].password +
                    '</td><td>' +
                    respuesta[i].zone +
                    '</td><td>' +
                    respuesta[i].type +
                    '</td>' +
                    '<td>' +
                    '<button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="itemEspecificoUser();"> Editar</button><button type="button" class="btn btn-danger"> Eliminar</button>' +
                    '</td></tr>'
                )


            }

            return id = idUser;
        },
        error: function(response) {

        }

    });
}



const itemEspecificoUser = (idUser) => {

    console.log(idUser)
    $.ajax({
        dateType: 'json',
        url: 'http://144.22.33.96:8080/api/user/' + idUser,
        type: 'GET',
        success: function(id) {
            $("#id").val(idUser.id);
            $("#identificacion2").val(idUser.identification);
            $("#names2").val(idUser.name);
            $("#direccion2").val(idUser.address);
            $("#telefono2").val(idUser.cellPhone);
            $("#password2").val(idUser.password);
            $("#zona2").val(idUser.zone);
            $("#tipo2").val(idUser.type);

        },
        error: function(xhr, status) {
            /*console.log(xhr);*/

        }
    });
}






/* tableUsers.append("<tr>");

                tableUsers.append("<td>" + respuesta[i].identification + "</td>");
                tableUsers.append("<td>" + respuesta[i].name + "</td>");
                tableUsers.append("<td>" + respuesta[i].direcccion + "</td>");
                tableUsers.append("<td>" + respuesta[i].telefono + "</td>");
                tableUsers.append("<td>" + respuesta[i].email + "</td>");
                tableUsers.append("<td>" + respuesta[i].password + "</td>");
                tableUsers.append("<td>" + respuesta[i].zone + "</td>");
                tableUsers.append("<td>" + respuesta[i].type + "</td>");
                tableUsers.append('<td><th scope="col"><button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"> Editar</button><button type="button" class="btn btn-danger"> Eliminar</button></th></td>');

                tableUsers.append("</tr>"); */

/* datesUsers = "<tr>" +
                    "<td>" + respuesta[i].identification + "</td>" +
                    "<td>" + respuesta[i].name + "</td>" +
                    "<td>" + respuesta[i].direcccion + "</td>" +
                    "<td>" + respuesta[i].telefono + "</td>" +
                    "<td>" + respuesta[i].email + "</td>" +
                    "<td>" + respuesta[i].password + "</td>" +
                    "<td>" + respuesta[i].zone + "</td>" +
                    "<td>" + respuesta[i].type + "</td>" +
                    '<td><th scope="col"><button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"> Editar</button><button type="button" class="btn btn-danger"> Eliminar</button></th></td>' +
                    "<tr>";

                tableUsers.innerHTML = datesUsers; */

/* const printProducts = () => {


} */