var nombre,phone;
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
    
    nombre.innerHTML = localStorage.getItem('name');
    phone.innerHTML = localStorage.getItem('phone');
}

function initVariables()
{
    reserva = document.getElementById('reserva');
    salir = document.getElementById('salir');
}

function initEventos()
{
    reserva.addEventListener('click', reservar);
    salir.addEventListener('click', logout);
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