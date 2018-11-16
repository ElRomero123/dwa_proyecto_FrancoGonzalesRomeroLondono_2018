var register;
var nombre, background, city, address, phone, avatar;
var state;

window.onload = inicializar;

function inicializar()
{
    if (localStorage.getItem('name') !== null && localStorage.getItem('phone') !== null) {
        initVariables();
        initEventos();
    }

    else
    {
        location.href = "index.html";
    }
}

function initVariables()
{
    nombre = document.getElementById('nombre');
    description = document.getElementById('description');
    price = document.getElementById('price');
    kind = document.getElementById('kind');
    avatar = document.getElementById('avatar');
    state = document.getElementById('state');

    register = document.getElementById('register');
}

function initEventos()
{
    register.addEventListener('click', registrar);
}

function registrar()
{
    state.style.visibility = "visible";
    state.style.background = "orangered";
    state.innerHTML = "Estamos creando el plato...";

    var food =
    {
        nombre: nombre.value,
        description: description.value,
        price: price.value,
        kind: kind.value,
        avatar: avatar.value,
        idRestaurant: localStorage.getItem('idR')
    };

    $.ajax
    (
        {
            url: '../api/food',
            type: 'POST',
            data: JSON.stringify(food),
            contentType: "application/json;charset=utf-8",
            success:
            function (data)
            {
                if (data)
                {
                    location.href = 'managePage.html';
                }

                else
                {
                     state.style.background = "red";
                     state.innerHTML = "No se pudo agregar su plato!";
                }
            }
        }
    );
}