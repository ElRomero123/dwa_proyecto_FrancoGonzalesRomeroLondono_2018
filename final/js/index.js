var username, password;
var send, register;
var state;

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
    send = document.getElementById('send');
    register = document.getElementById('register');
    state = document.getElementById('state');
}

function initEventos()
{
    send.addEventListener('click', login);
    register.addEventListener('click', toRegister);
}

function login()
{
    state.style.visibility = "visible";
    state.style.background = "orangered";
    state.innerHTML = "Estamos validando...";

    $.ajax
    (
        {
            url: '../api/user?username=' + username.value + '&password=' + password.value,
            type: 'GET',
            contentType: "application/json;charset=utf-8",
            success:
            function (data)
            {
                if(data[0] === "N" || data[0] === null)
                {
                    state.style.background = "red";
                    state.innerHTML = "No te encontramos!";
                }

                else
                {
                    localStorage.setItem('name', data[0] + " " + data[1]);
                    localStorage.setItem('phone', data[2]);
                    localStorage.setItem('avatar', data[3]);
                    localStorage.setItem('idUser', data[4]);
                    location.href = "../dashboard.html";
                }
            }
        }
    );
}

function toRegister()
{
    location.href = "../register.html";
}