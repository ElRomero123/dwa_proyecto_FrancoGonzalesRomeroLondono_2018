const RESTAURANTES = ['<button id="','" class="restaurants" onclick="configRestaurant(this.id)"> <div>','<div>','</div>','<div>','</div>','</div> </button>'];

var nombre, phone, avatar;
var titulo, menu;
var btnNewRestaurante, btnNewFood;

window.onload = inicializar;

function inicializar()
{
    if (localStorage.getItem('name') !== null && localStorage.getItem('phone') !== null)
    {
        initProfile();
        initRestaurants();
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
    titulo = document.getElementById('titulo');
    menu = document.getElementById('menu');
    btnNewRestaurante = document.getElementById('btnNewRestaurante');
    btnNewFood = document.getElementById('btnNewFood');

    
    nombre.innerHTML = localStorage.getItem('name');
    phone.innerHTML = localStorage.getItem('phone');
    avatar.style.background = 'url(' + localStorage.getItem('avatar') + ')';
    menu.addEventListener('click', toMenu);
}

function initRestaurants()
{
    $.ajax
    (
        {
            url: '../api/restaurant?idOwner=' + localStorage.getItem('idUser'),
            type: 'GET',
            contentType: "application/json;charset=utf-8",
            success:
            function (data)
            {
                var elements = '';
                for (var i = 0; i < data.length; i++)
                {
                    elements += RESTAURANTES[0] + data[i][0] + RESTAURANTES[1] + RESTAURANTES[2] + data[i][0] + RESTAURANTES[3] + RESTAURANTES[4] + data[i][1] + RESTAURANTES[5] + RESTAURANTES[6];
                }

                $('#listOptions').append(elements);
            }
        }
    );
}

function toMenu()
{
    location.href = "dashboard.html";
}

function configRestaurant(id)
{
    localStorage.setItem('idR', id);
    btnNewFood.style.visibility = 'visible';
    btnNewRestaurante.style.visibility = 'hidden';
    titulo.innerHTML = 'Lista de ordenes!';
    $('#listOptions').empty();
    $('#foodOrders').empty();

    $.ajax
    (
        {
            url: '../api/venta?idRestaurant=' + localStorage.getItem('idR'),
            type: 'GET',
            contentType: "application/json;charset=utf-8",
            success:
            function (data)
            {
                var elements = '';
                for (var i = 0; i < data.length; i++)
                {
                    elements += "<div class='orderItem'> <div> <div class='hash'>" + data[i][1] + "</div> <div>" + data[i][2] + "</div> <div>" + data[i][3] + "</div> <div>" + data[i][4] + "</div> <button id='" + data[i][0] + "' onclick='start(this.id)'>PREPARAR</button> <button id='" + data[i][0] + "' onclick='received(this.id)'>RECIBIDO</button> </div> </div>";
                }

                $('#foodOrders').append(elements);
            }
        }
    );
}

function start(id)
{
    $.ajax
    (
        {
            url: '../api/venta?idPedido=' + id + '&orden=' + 1,
            type: 'POST',
            contentType: "application/json;charset=utf-8",

            success:
            function (data)
            {
                if (data)
                {
                    document.getElementById(id).style.background = 'green';
                }
            }
        }
    );
}

function received(id)
{
    $.ajax
    (
        {
            url: '../api/venta?idPedido=' + id + '&orden=' + 2,
            type: 'GET',
            contentType: "application/json;charset=utf-8",

            success:
            function (data)
            {
                if (data)
                {
                    alert("Fue entregado el pedido: " + id);
                }
            }
        }
    );
}

function toNewRestaurant()
{
    location.href = 'manageRestaurant.html';
}

function toNewFood()
{
    location.href = 'manageFood.html';
}