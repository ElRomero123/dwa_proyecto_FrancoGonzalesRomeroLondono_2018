var nombre, phone;
var regresar;

window.onload = inicializar;

function inicializar()
{
    if (localStorage.getItem('name') !== null && localStorage.getItem('phone') !== null)
    {
        initProfile();
        initVariables();
        initEventos();
    }

    else
    {
        location.href = "index.html";
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
    regresar = document.getElementById('regresar');
}

function initEventos()
{
    regresar.addEventListener('click', regresarMenu);
}

function regresarMenu()
{
    location.href = "dashboard.html";
}