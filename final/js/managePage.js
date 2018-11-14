const RESTAURANTES = ['<button id="','" class="restaurants" onclick="configRestaurant(this.id)"> <div>','<div>','</div>','<div>','</div>','</div> </button>'];

var nombre, phone, avatar;
var menu, botonId, titulo, hash;

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
    
    nombre.innerHTML = localStorage.getItem('name');
    phone.innerHTML = localStorage.getItem('phone');
    avatar.style.background = 'url(' + localStorage.getItem('avatar') + ')';

    menu = document.getElementById('menu');
    menu.addEventListener('click', toMenu);
}

function initRestaurants()
{
    $.ajax
    (
        {
            url: '../api/restaurant?idOwner=' + localStorage.getItem('id'),
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
    $('#listOptions').empty();

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
                    //alert(data[i][0] + " " + data[i][1] + " " + data[i][2] + " " + data[i][3]);
                    elements += "<button class='orderItem'> <div> <div>Precio</div> <div>" + data[i][0] + "</div> <div>" + data[i][1] + "</div> <div>" + data[i][2] + "</div> <div>" + data[i][3] + "</div> </div> </button>";
                }

                $('#listOptions').append(elements);
            }
        }
    );
}