var nombre;
var phone;

window.onload = inicializar;

function inicializar()
{ 
    initProfile();
    initVariables();
    initEventos();
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

}

function initEventos()
{

}