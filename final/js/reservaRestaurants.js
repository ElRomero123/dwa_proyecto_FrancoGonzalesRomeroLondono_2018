var nombre, phone;
var back, menu;
var botonId;

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
    back = document.getElementById('back');
    menu = document.getElementById('menu');
}

function initEventos()
{
    back.addEventListener('click', toBack);
    menu.addEventListener('click', toMenu);
}

function cargarRestaurante(btn)
{
    $('#listOptions').empty();

    $.ajax
    (
        {
            url: '../api/food?idRestaurant=' + btn.id + '&type=' + 1,
            type: 'GET',
            contentType: "application/json;charset=utf-8",
            success:
            function (data)
            {
                var elements = '';
  
                for (var i = 0; i < data.length; i++)
                {
                    elements += '<button id="' + data[i][0] + '" class="restaurants" onclick="cargarRestaurante(this)"> <div> <div>' + data[i][1] + '</div> <div>' + data[i][2] + '</div> <div>' + data[i][3] + '</div> <div>' + data[i][1] + '</div> </div> </button>';
                }

                $('#listOptions').append('<div id="aperitivo" class="banner">APERITIVOS</div>' + elements);
            }
        }
    );

    $.ajax
    (
        {
            url: '../api/food?idRestaurant=' + btn.id + '&type=' + 2,
            type: 'GET',
            contentType: "application/json;charset=utf-8",
            success:
            function (data)
            {
                var elements = '';

                for (var i = 0; i < data.length; i++)
                {
                    elements += '<button id="' + data[i][0] + '" class="restaurants" onclick="cargarRestaurante(this)"> <div> <div>' + data[i][1] + '</div> <div>' + data[i][2] + '</div> <div>' + data[i][3] + '</div> <div>' + data[i][1] + '</div> </div> </button>';
                }

                $('#listOptions').append('<div id="plato" class="banner">PLATOS</div>' + elements);
            }
        }
    );

    $.ajax
    (
        {
            url: '../api/food?idRestaurant=' + btn.id + '&type=' + 3,
            type: 'GET',
            contentType: "application/json;charset=utf-8",
            success:
            function (data)
            {
                var elements = '';

                for (var i = 0; i < data.length; i++)
                {
                    elements += '<button id="' + data[i][0] + '" class="restaurants" onclick="cargarRestaurante(this)"> <div> <div>' + data[i][1] + '</div> <div>' + data[i][2] + '</div> <div>' + data[i][3] + '</div> <div>' + data[i][1] + '</div> </div> </button>';
                }

                $('#listOptions').append('<div id="bebida" class="banner">BEBIDAS</div>' + elements);
            }
        }
    );
}

function toBack()
{
    $('#listOptions').empty();
    back.style.display = "none";
    initRestaurants();
}

function toMenu()
{
    location.href = "dashboard.html";
}