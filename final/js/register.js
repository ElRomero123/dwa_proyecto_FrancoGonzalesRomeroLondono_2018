var register;
var username, password, nombre, lastName, numDocument, phone, address;

window.onload = inicializar;

function inicializar()
{
    initVariables();
    initEventos();
}

function initVariables()
{
    username = document.getElementById('username');
    password = document.getElementById('password');
    nombre = document.getElementById('nombre');
    lastName = document.getElementById('lastName');
    numDocument = document.getElementById('numDocument');
    phone = document.getElementById('phone');
    address = document.getElementById('address');
    register = document.getElementById('register');
}

function initEventos()
{
    register.addEventListener('click', registrar);
}

function registrar()
{
    var user =
    {
        username: username.value,
        password: password.value,
        name: nombre.value,
        lastName: lastName.value,
        typeDocument: "CC",
        numDocument: numDocument.value,
        phone: phone.value,
        address: address.value,
        reputation: 10
    };

    $.ajax
    (
        {

            url: '../api/user',
            type: 'POST',
            data: JSON.stringify(user),
            contentType: "application/json;charset=utf-8",

            success:
                function (data) {
                    if (data) {
                        location.href = "index.html";
                        alert("Agregado!");
                    }

                    else {
                        alert("No se pudo agregar el registro. Puede ser un problema en el formato!");
                    }

                }
        }
    );
}