var nombre,phone;
var reserva, creacionGrupo, salir;

window.onload = inicializar;

function inicializar()
{ 
    if(localStorage.getItem('name') != null && localStorage.getItem('phone') != null)
    {
        initProfile();
        initVariables();
        initEventos();
    }

    else
    {
        location.href="index.html";
    }
}

function initProfile()
{
    nombre = document.getElementById('completeName'); 
    phone = document.getElementById('phone'); 
    
    nombre.innerHTML = localStorage.getItem('name');
    phone.innerHTML = localStorage.getItem('phone');
}

function initVariables()
{
    reserva = document.getElementById('reserva');
    creacionGrupo = document.getElementById('creacionGrupo');
    salir = document.getElementById('salir');
}

function initEventos()
{
    reserva.addEventListener('click', reservar);
    creacionGrupo.addEventListener('click', newGroup);
    salir.addEventListener('click', logout);
}

function reservar()
{
    location.href = "reserva.html";
}

function newGroup()
{
    location.href = "reserva.html";
}

function logout()
{
    location.href = "index.html";
    localStorage.clear();
}