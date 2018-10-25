var nombre, phone, avatar;
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
    avatar = document.getElementById('avatar'); 

    nombre.innerHTML = localStorage.getItem('name');
    phone.innerHTML = localStorage.getItem('phone');
    avatar.style.background = 'url(' + localStorage.getItem('avatar') + ')';
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
    back.style.display = "inline-block";
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
                    elements += '<div class="foods"> <div> <div>' + data[i][0] + '</div> <div>' + data[i][1] + '</div> <div>' + data[i][2] + '</div> <div>' + data[i][3] + '</div> <input type="radio" name="gender" value="male"> </div> </div>';
                }

                $('#listOptions').append('<div class="card"> <div id="title">APERITIVOS</div> <form action="1">' + elements + '</div> </form>');
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
                    elements += '<div class="foods"> <div> <div>' + data[i][0] + '</div> <div>' + data[i][1] + '</div> <div>' + data[i][2] + '</div> <div>' + data[i][3] + '</div> <input type="radio" name="gender" value="male"> </div> </div>';
                }

                $('#listOptions').append('<div class="card"> <div id="title">PLATOS</div> <form action="2">' + elements + '</div> </form>');
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
                    elements += '<div class="foods"> <div> <div>' + data[i][0] + '</div> <div>' + data[i][1] + '</div> <div>' + data[i][2] + '</div> <div>' + data[i][3] + '</div> <input type="radio" name="gender" value="male"> </div> </div>';
                }

                $('#listOptions').append('<div class="card"> <div id="title">BEBIDAS</div> <form action="3">' + elements + '</div> </form>');
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