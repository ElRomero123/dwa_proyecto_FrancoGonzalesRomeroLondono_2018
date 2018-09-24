var send;
var username;
var password;

window.onload = inicializar;

function inicializar()
{ 
    initVariables();
    initEventos();
}

function initVariables()
{
    send = document.getElementById('send');
    username = document.getElementById('username');
    password = document.getElementById('password');
}

function initEventos()
{
    send.addEventListener('click', login);
}

function login()
{
    alert("Hola");

    $.ajax
    (
        {
            url: '../api/login?username=' + username.value + '&password=' + password.value,
            type: 'GET',
            contentType: "application/json;charset=utf-8",

            success:
            function (data)
            {
                alert(data);
            },

            error:
            function()
            {
                alert("No se pudo!");
            }
        }
    );
}