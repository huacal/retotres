const listUsers = document.getElementById('registrosUsers');
const addUser = document.querySelector('.add-user-form');
const btnborrar = document.getElementById('btnDelete');
let inputs = document.querySelectorAll('#registerUser input');
let formUser = document.getElementById("registerUser");
let alerts = document.querySelector('.alert');
const url = 'http://144.22.38.142:8080/api/user';
let output = ' ';


fetch(`${url}/all`)
    .then(response => response.json())
    .then(data => renderUsers(data));


///Get
const  renderUsers  = (users) => {
    users.forEach(user => {
        output += `
        <tr>
        <td class ="identify">${user.identification}</td>
        <td>${user.name}</td>
        <td>${user.address}</td>
        <td>${user.cellPhone}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.zone}</td>
        <td>${user.type}</td>
        <td data-id=${user.id}>
        <button type="button" class="btn btn-success btn-editar-abrir" data-bs-toggle="modal" data-bs-target="#editModal" id="btnEdit"> Editar</button>
        <button type="button" id="btnDelete" class="btn btn-danger" > Eliminar</button>
        </td>
        </tr> `
    });
    listUsers.innerHTML = output;
}



// Create - Imsert new user
// Method Post

addUser.addEventListener('submit', (e) =>{
    e.preventDefault();
    let identificacion = document.getElementById('identificacion').value.trim();
    let names = document.getElementById('names').value.trim();
    let direcccion = document.getElementById('direccion').value.trim();
    let telefono = document.getElementById('telefono').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value;
    let passwordConf = document.getElementById('passwordConf').value.trim();
    let zona = document.getElementById('zona').value.trim();
    let typeUser = document.getElementById('tipo').value.trim();

    if ( identificacion == "" && names == "" && direcccion == "" && telefono == "" && email == "" && password == "" && passwordConf == "" && zona == "" && typeUser == "") {
        alerts.innerHTML = '<span>*todos los campos deben estar llenos</span>'
        alerts.classList.add('bad');
        setTimeout(() => {
            alerts.innerHTML = " ";
            alerts.classList.remove('bad');
        }, 3000);
    }else{
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
        fetch(`${url}/new`,{
            method: 'POST',
            headers:{
                'content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                alerts.innerHTML = '<span>Usuario agregado correctamente</span>'
                alerts.classList.add('ok');
                setTimeout(() => {
                    alerts.innerHTML = " ";
                    alerts.classList.remove('ok');
                    const dataArr = [];
                    dataArr.push(data);
                    renderUsers(dataArr);
                    formUser.reset();
                }, 3000);
                
            })
    }
    
    
    
});



//EDICION DE USUARIOS

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
        "id": id,
        "identification": identification,
        "name": name,
        "address": address,
        "cellPhone": cellPhone,
        "email": email,
        "password": password,
        "zone": zone,
        "type": type,
    }
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://144.22.38.142:8080/api/user/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function(respuesta) {
            alerts.innerHTML = '<span>Usuario editado</span>'
            alerts.classList.add('ok');
            setTimeout(() => {
                alerts.innerHTML = " ";
                alerts.classList.remove('ok');
                location.reload()
            }, 3000);
        },
        error:function(respuesta){
            alerts.innerHTML = '<span>Usuario no editado</span>'
            alerts.classList.add('bad');
            setTimeout(() => {
                alerts.innerHTML = " ";
                alerts.classList.remove('bad');
                location.reload()
            }, 3000);
        }
    });
}

const catchUsers = (correo, pass) => {
    $.ajax({
        url: "http://144.22.38.142:8080/api/user/" + correo + "/" + pass,
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

listUsers.addEventListener('click', (e) => {
    e.preventDefault();
    let delButton = e.target.id == 'btnDelete';
    /* let editButton = e.target.id == 'btnEdit'; */
    let alerts = document.querySelector('.alert');
    id = e.target.parentElement.dataset.id;

    // Delete - Remove the existing user
    //method: DELETE

    if (delButton) {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
        
        /* .then(res => res.json()) */
        .then(() => {
            alerts.innerHTML = '<span>Usuario eliminado</span>'
            alerts.classList.add('bad');
            setTimeout(() => {
                alerts.innerHTML = " ";
                alerts.classList.remove('bad');
                location.reload()
            }, 3000);

        })
        
        
                
    }
})




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

inputs.forEach((input) => {
    input.addEventListener('keyup', validarForm);
    input.addEventListener('blur', validarForm);
});