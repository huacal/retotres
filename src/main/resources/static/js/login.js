const formLogin = document.getElementById('loginUser');
const msgAlert = document.getElementById('valid-feedback');

const login = () => {
    let emailLogin = document.getElementById('email').value.trim();
    let passwordLogin = document.getElementById('password').value.trim();
    if (emailLogin == "" && passwordLogin == "") {
        msgAlert.innerHTML = '<span class="error"><i class="bi bi-x-square-fill"></i> *Debe rellenar todos los campos </span>'
    } else if (emailLogin != "" && passwordLogin != "") {
        $.ajax({
            url: 'http://144.22.38.142:8080/api/user/' + emailLogin + '/' + passwordLogin,
            contenType: 'application/json',
            dataType: 'json',
            error: function(response) {
                msgAlert.innerHTML = '<span class="error"><i class="bi bi-x-square-fill"></i> No podemos procesar su solicitud ahora</span>';
                setTimeout(function() {
                    msgAlert.innerHTML = " ";
                    formLogin.reset();
                }, 3000);

            },

            success: function(result) {
                if (result.id == null) {
                    msgAlert.innerHTML = '<span class="error"><i class="bi bi-x-square-fill"></i> No existe un usuario con estos datos</span>'
                    setTimeout(function() {
                        msgAlert.innerHTML = " ";
                        formLogin.reset();
                    }, 3000);
                } else if (result.id != null) {
                    if (result.type == "COORD" || result.type == "ASE") {
                        msgAlert.innerHTML = '<span class="sucess"><i class="bi bi-check-circle"></i> Bienvenido</span>'
                        setTimeout(function() {
                            msgAlert.innerHTML = " "
                            window.location.href = "https://www.google.com.co";
                        }, 3000);
                    } else {
                        if (result.type == "ADM") {
                            msgAlert.innerHTML = '<span class="sucess"><i class="bi bi-check-circle"></i> Bienvenido</span>'
                            setTimeout(function() {
                                msgAlert.innerHTML = " "
                                window.location.href = "dashboard.html";
                            }, 3000);
                        }
                    }

                }

            }

        });
        return false;
    }
}


formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    login();
});