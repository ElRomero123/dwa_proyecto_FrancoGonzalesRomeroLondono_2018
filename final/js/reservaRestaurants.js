var nombre, phone;
var regresar;

window.onload = inicializar;

function inicializar()
{
    if (localStorage.getItem('name') !== null && localStorage.getItem('phone') !== null)
    {
        initProfile();
        initRestaurants();
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

function initRestaurants()
{
    $.ajax
    (
        {
            url: '../api/restaurant',
            type: 'GET',
            contentType: "application/json;charset=utf-8",
            success:
            function (data)
            {
                var elements = '';
                for (var i = 0; i < data.length; i++)
                {
                    elements += '<button id="' + data[i][0] + '" class="restaurants" onclick="cargarRestaurante(this)"> <div> <div>' + data[i][1] + '</div> <div>' + data[i][3] + '</div> <div>' + data[i][5] + '</div> <div>' + data[i][4] + '</div> </div> </button>';
                }

                $('#listOptions').append(elements);

               
                for (i = 0; i < data.length; i++)
                {
                    document.getElementById(data[i][0]).style.background = 'url(' + data[i][6] + ')';
                }
            }
        }
    );
}

function initVariables()
{
    regresar = document.getElementById('regresar');
}

function initEventos()
{
    regresar.addEventListener('click', regresarMenu);
}

function cargarRestaurante(boton)
{
    $.ajax
    (
        {
            url: '../api/food?idRestaurant=' + boton.id + '&type=' + 1,
            type: 'GET',
            contentType: "application/json;charset=utf-8",
            success:
            function (data)
            {
                for (var i = 0; i < data.length; i++)
                {
                    alert(data[i][0] + " " + data[i][1]);
                }
            }
        }
    );
}

function regresarMenu()
{
    location.href = "dashboard.html";

    
}