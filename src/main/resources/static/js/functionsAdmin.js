/* window.alert("funciona"); */
let responseRequest;
let tableUsers = document.getElementById("registrosUsers");
let formUser = document.getElementById("registerUser");
let inputs = document.querySelectorAll('#registerUser input');
let forms = document.querySelectorAll('.needs-validation');
let msgAlert = document.getElementsByClassName('msjInvalid');
let btnUpdate = document.getElementById('btnUpdateUser');
let btnDelete = document.getElementById('btnDelete');



const getUsers = () => {

    $.ajax({
        url: "http://144.22.33.96:8080/api/user/all",
        method: 'GET',
        datatype: 'json',
        success: function(respuesta) {

            for (let i = 0; i < respuesta.length; i++) {

                tableUsers.innerHTML += '<tr><td>' +
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
                    '<button type="button" class="btn btn-success btn-editar-abrir" data-bs-toggle="modal" data-bs-target="#editModal" "> Editar</button><button type="button" class="btn btn-danger" id="btnDelete"> Eliminar</button>' +
                    '</td></tr>'
            }

        },
        error: function() {
            console.log("error");
        }
    });

};


const saveUser = (_id) => {
    /* console.log("hace algo por lo menos"); */
    let forms = document.querySelectorAll('.needs-validation');

    let id = _id;
    let identificacion = document.getElementById('identificacion').value.trim();
    let names = document.getElementById('names');
    let direcccion = document.getElementById('direccion').value.trim();
    let telefono = document.getElementById('telefono').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let passwordConf = document.getElementById('passwordConf').value.trim();
    let zona = document.getElementById('zona').value.trim();
    let typeUser = document.getElementById('tipo').value.trim();

    if (id != "" && identificacion != "" && names != "" && direcccion != "" && telefono != "" && email != "" && password != "" && passwordConf != "" && zona != "" && typeUser != "") {
        if (password != passwordConf) {
            msgAlert.innerHTML = '<span><i class="fas fa-exclamation-circle"></i> Las contraseñas no coinciden</span>'
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
                method: 'POST',
                url: 'http://144.22.33.96:8080/api/user/new',
                data: JSON.stringify(newUser),
                contentType: 'application/json',
                dataType: 'json',
                error: function(response) {
                    console.log(newUser);
                    console.log(response);
                    msgAlert.innerHTML = '<span class="error"> <i class="fas fa-exclamation-circle"></i>No se puede guardar el usuario</span>'
                    
                },
                success: function(result) {
                    console.log(result);
                    if (result.id == null) {
                        msgAlert.innerHTML = '<span class="error"><i class="fas fa-exclamation-circle"></i> No se puede crear la cuenta</span>'
                        return email
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

const catchUsers = (correo, pass) => {
    $.ajax({
        url: "http://144.22.33.96:8080/api/user/" + correo + "/" + pass,
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            /* console.log("ID USUARIO =" + respuesta.id); */
            miIndice = respuesta.id;
            //fila = $(this).closest("tr");
            var id = respuesta.id;
            var identification = respuesta.identification;
            var name = respuesta.name;
            var address = respuesta.address;
            var cellPhone = respuesta.cellPhone;
            var email = respuesta.email;
            var password = respuesta.password;
            var zone = respuesta.zone;
            var type = respuesta.type;

            $("#identificacionEdit").val(identification);
            $("#namesEdit").val(name);
            $("#direccionEdit").val(address);
            $("#telefonoEdit").val(cellPhone);
            $("#emailEdit").val(email);
            $("#passwordEdit").val(password);
            $("#zonaEdit").val(zone);
            $("#tipoEdit").val(type);

            var modal = new bootstrap.Modal(document.getElementById("editModal"), {});
            modal.show();
        }
    });
}

const editDates = () => {
    var id = miIndice;
    var identification = $.trim($("#identificacionEdit").val());
    var name = $.trim($("#namesEdit").val());
    var address = $.trim($("#direccionEdit").val());
    var cellPhone = $.trim($("#telefonoEdit").val());
    var email = $.trim($("#emailEdit").val());
    var password = $.trim($("#passwordEdit").val());
    var zone = $.trim($("#zonaEdit").val());
    var type = $.trim($("#tipoEdit").val());

    let myData = {
        id: id,
        identification: identification,
        name: name,
        address: address,
        cellPhone: cellPhone,
        email: email,
        password: password,
        zone: zone,
        type: type,
    }
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://144.22.33.96:8080/api/user/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function(respuesta) {
            location.reload();

        }
    });
}

const deleteUser = (idElemento) => {
    let myData = {
        id: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://144.22.33.96:8080/api/user/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function(respuesta) {

            location.reload();
        }
    });
}

const expresiones = {
    identificacion: /^\d{6,10}$/,
    names: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    direccion: /^[A-Za-z0-9'\.\-\s\,]/,
    telefono: /^\d{7,10}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{4,12}$/
        /* zona: /^[a-zA-Z\s0-9_]{1,16}$/ */

}

const campos = {
    identificacion: false,
    names: false,
    direccion: false,
    telefono: false,
    email: false,
    password: false,
    zona: false
}

const validarForm = (e) => {
    /* console.log(e.target.name) */
    switch (e.target.name) {
        case "identificacion":
            validarCampo(expresiones.identificacion, e.target, 'identificacion');
            break;
        case "names":
            validarCampo(expresiones.names, e.target, 'names');
            break;
        case "direccion":
            validarCampo(expresiones.direccion, e.target, 'direccion');
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
        case "email":
            validarCampo(expresiones.email, e.target, 'email');
            break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword();
            break;
        case "passwordConf":
            validarPassword();
            break;
        case "zona":
            validarCampo(expresiones.zona, e.target, 'zona');
            break;
        case "typeUser":
            validarCampo(expresiones.typeUser, e.target, 'typeuser');
            break;


    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo-${campo}`).classList.remove('form-error');
        document.querySelector(`#grupo-${campo} .text-alert-input`).classList.remove('text-alert-input-active');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo-${campo}`).classList.add("form-error");
        document.querySelector(`#grupo-${campo} .text-alert-input`).classList.add('text-alert-input-active');
        campos[campo] = false;
    }
}


const validarPassword = () => {
    const inputPassword = document.getElementById('password');
    const inputPasswordConf = document.getElementById('passwordConf');
    if (inputPassword.value !== inputPasswordConf.value) {
        document.getElementById(`grupo-passwordConf`).classList.add("form-error");
        document.querySelector(`#grupo-passwordConf .text-alert-input`).classList.add('text-alert-input-active');
        campos['password'] = false;
    } else {
        document.getElementById(`grupo-passwordConf`).classList.remove("form-error");
        document.querySelector(`#grupo-passwordConf .text-alert-input`).classList.remove('text-alert-input-active');
        campos['password'] = true;
    }
}



inputs.forEach((input) => {
    input.addEventListener('keyup', validarForm);
    input.addEventListener('blur', validarForm);
});

formUser.addEventListener('submit', (e) => {
    e.preventDefault();
    /* console.log(campos.identificacion) */
    
    let countTable = (document.getElementById('registrosUsers').childElementCount) + 1;
    saveUser(countTable);
    
    formUser.reset();
    location.reload();
    /* if (campos.identificacion && campos.names && campos.direccion && campos.telefono && campos.email && campos.password) {
        


    } else {
        console.log("error")
    } */

});

//llenar campos modal
$(document).on("click", ".btn-editar-abrir", function() {
    fila = $(this).closest("tr");
    var email = fila.find('td:eq(4)').text();
    var password = fila.find('td:eq(5)').text();
    catchUsers(email, password);

});


//actualizar luego del modal
btnUpdate.addEventListener('click', (e) => {
    editDates();
});



$(document).on("click", "#btnDelete", function() {
    fila = $(this).closest("tr");
    var email = fila.find('td:eq(4)').text();
    var password = fila.find('td:eq(5)').text();
    $.ajax({
        url: "http://144.22.33.96:8080/api/user/" + email + "/" + password,
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            console.log("ID USUARIO =" + respuesta.id);
            miIndice = respuesta.id;
            deleteUser(miIndice);
        }
    });
});

/* btnDelete.addEventListener('click', (e) => {
    e.preventDefault();
    fila = $(this).closest("tr");
    var email = fila.find('td:eq(4)').text();
    var password = fila.find('td:eq(5)').text();
    $.ajax({
        url: "http://144.22.33.96:8080/api/user/" + email + "/" + password,
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            console.log("ID USUARIO =" + respuesta.id);
            miIndice = respuesta.id;
            deleteUser(miIndice);
        }
    });
}); */