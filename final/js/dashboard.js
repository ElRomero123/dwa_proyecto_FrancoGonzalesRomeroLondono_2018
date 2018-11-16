var nombre, phone, avatar;
var reserva, creacionGrupo, administrador, salir;

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
    creacionGrupo = document.getElementById('creacionGrupo');
    administrador = document.getElementById('administrador');
    salir = document.getElementById('salir');
}

function initEventos()
{
    reserva.addEventListener('click', function () { location.href = "reservaRestaurants.html"; });
    creacionGrupo.addEventListener('click', function () { location.href = "creacionGrupo.html"; });
    salir.addEventListener('click', function () { location.href = "index.html"; localStorage.clear(); });
    administrador.addEventListener('click', function () { location.href = 'managePage.html'; });
}