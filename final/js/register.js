var register;
var username, password, name, lastName, numDocument, phone, address;

/*
<input id="username" placeholder="Nombre de usuario" />
    <input id="password" placeholder="Contraseña" />
    <input id="name" placeholder="Nombre" />
    <input id="lastName" placeholder="Apellido" />
    <input id="numDocument" placeholder="Número documento (sin comas, ni puntos)" />
    <input id="phone" placeholder="Fijo o celular" />
    <input id="address" placeholder="Dirección residencia" />
    */

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
    name = document.getElementById('name');
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
        username:username.value,
        password:password.value,
        name:name.value,
        lastName: lastName.value,
        typeDocument: "CC",
        numDocument:numDocument.value,
        phone:phone.value,
        address:address.value,
        register: register.value,
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
            function (data)
            {
                alert(data);
            }
        }
    );
}