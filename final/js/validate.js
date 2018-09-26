var send;
var username;
var password;
var cPassword;

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
    cPassword = document.getElementById('cPassword');
}

function initEventos()
{
    send.addEventListener('click', login);
}

function login()
{
    $.ajax
    (
        {
            url: '../api/login?username=' + username.value + '&password=' + password.value,
            type: 'GET',
            contentType: "application/json;charset=utf-8",

            success:
            function (data)
            {
                localStorage.setItem("name", data[0] + " " + data[1]);
                localStorage.setItem("phone", data[2]);
                location.href = "../dashboard.html";
            },

            error:
            function()
            {
                alert("No se pudo!");
            }
        }
    );
}


function count()
{
    cPassword.innerHTML = password.value.length;
}