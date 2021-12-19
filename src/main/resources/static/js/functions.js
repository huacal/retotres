/* Registro UsuarioNuevo */

const button = document.getElementById('submitRegister');
const msgAlert = document.getElementById('msgAlert');
const formRegister = document.getElementById('formRegistrer');
const inputs = document.querySelectorAll('#formRegistrer input');
const inputsLogin = document.querySelectorAll('#form2 input');
const form2 = document.getElementById('form2');

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

const validateEmail = (e) => {
    /* console.log(e.target); */
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
    console.log(campo.value)
    if (expresionsFields.test(input.value)) {
        document.getElementById(`inputGroup-${campo}`).classList.remove('invalid');
        document.querySelector(`#inputGroup-${campo} .text-alert-input`).classList.remove('text-alert-input-activo');
        fields[campo] = true;

    } else {
        document.getElementById(`inputGroup-${campo}`).classList.add('invalid');
        document.querySelector(`#inputGroup-${campo} .text-alert-input`).classList.add('text-alert-input-activo');
        fields[campo] = false;
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
    let identificacion = document.getElementById('identificacion').value.trim();
    let names = document.getElementById('names').value.trim();
    let direcccion = document.getElementById('direccion').value.trim();
    let telefono = document.getElementById('telefono').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let passwordConf = document.getElementById('passwordConf').value.trim();
    let zona = document.getElementById('zona').value.trim();
    let typeUser = document.getElementById('typeUser').value.trim();
    if (identificacion != "" && names != "" && direcccion != "" && telefono != "" && email != "" && password != "" && passwordConf != "" && zona != "" && typeUser != "") {
        if (password != passwordConf) {
            msgAlert.innerHTML = '<span class="red"><i class="fas fa-exclamation-circle"></i> Las contraseñas no coinciden</span>'
        } else {
            let newUser = {

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
                url: 'http://localhost:8080/api/user/new',
                /* http://144.22.33.96:8080/api/user/new */
                data: JSON.stringify(newUser),
                contentType: 'application/json',
                dataType: 'json',
                error: function(response) {
                    msgAlert.innerHTML = '<span class="red"> <i class="fas fa-exclamation-circle"></i>No se puede guardar el usuario</span>'
                    console.log(response);
                },
                success: function(result) {
                    console.log(result);
                    if (result.id == null) {
                        msgAlert.innerHTML = '<span class="red"><i class="fas fa-exclamation-circle"></i> No se puede crear la cuenta</span>'
                        return email
                            /* $(":input").value = " "; */
                            /* $("#names").focus();
                            $("#email").focus(); */
                    } else {
                        msgAlert.innerHTML = '<span class="green"><i class="fas fa-check-circle"></i> Usuario creado exitosamente</span>'
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

/*Login Usuario Registrado*/
const login = () => {

    let emailLogin = document.getElementById('email').value.trim();
    let passwordLogin = document.getElementById('password').value.trim();

    if (emailLogin != "" && passwordLogin != "") {
        $.ajax({
            url: 'http://144.22.33.96:8080/api/user/' + emailLogin + '/' + passwordLogin,
            contenType: 'application/json',
            dataType: 'json',
            error: function(response) {
                msgAlert.innerHTML = '<span class="red"><i class="fas fa-exclamation-circle"></i> Correo eléctronico no existe</span>'
            },

            success: function(result) {
                if (result.id == null) {
                    msgAlert.innerHTML = '<span class="red"><i class="fas fa-exclamation-circle"></i> No existe un usuario con estos datos</span>'

                } else {
                    setTimeout(function() {
                        window.location.href = "main.html";
                    }, 2000);
                    /* alert("Se ha registrado correctamente" + result.name); */
                }

            }

        });
        return false;
    }

}


inputs.forEach((input) => {
    input.addEventListener('keyup', validateEmail);
    input.addEventListener('blur', validateEmail);
});

/* inputsLogin.forEach((input) => {
    input.addEventListener('keyup', validateEmail);
}); */