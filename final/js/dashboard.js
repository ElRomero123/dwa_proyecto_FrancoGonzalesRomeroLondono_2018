var nombre,phone,avatar;
var reserva, creacionGrupo, salir;

window.onload = inicializar;

function inicializar()
{ 
    if(localStorage.getItem('name') !== null && localStorage.getItem('phone') !== null)
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
    avatar = document.getElementById('avatar'); 
    
    nombre.innerHTML = localStorage.getItem('name');
    phone.innerHTML = localStorage.getItem('phone');
    avatar.style.background = 'url(' + localStorage.getItem('avatar') + ')';
}

function initVariables()
{
    reserva = document.getElementById('reserva');
    administrador = document.getElementById('administrador');
    salir = document.getElementById('salir');
}

function initEventos()
{
    reserva.addEventListener('click', reservar);
    salir.addEventListener('click', logout);
    administrador.addEventListener('click', manage);
}

function reservar()
{
    location.href = "reservaRestaurants.html";
}

function logout()
{
    location.href = "index.html";
    localStorage.clear();
}

function manage()
{
    location.href = 'managePage.html';
}