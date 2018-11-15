var register;
var name, background, city, address, phone, avatar;
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
    name = document.getElementById('name');
    background = document.getElementById('background');
    city = document.getElementById('city');
    address = document.getElementById('address');
    phone = document.getElementById('phone');
    avatar = document.getElementById('avatar');
    state = document.getElementById('state');
}

function initEventos()
{
    register.addEventListener('click', registrar);
}

function registrar()
{
    state.style.visibility = "visible";
    state.style.background = "orangered";
    state.innerHTML = "Estamos creando el restaurante...";

    var restaurante =
    {
        name: name.value,
        background: background.value,
        city: city.value,
        address: address.value,
        phone: phone.value,
        avatar: avatar.value,
        idOwner: localStorage.getItem('idUser')
    };

    $.ajax
    (
        {
            url: '../api/restaurant',
            type: 'POST',
            data: JSON.stringify(restaurante),
            contentType: "application/json;charset=utf-8",
            success:
            function (data)
            {
                if (data)
                {
                    location.href = '#managePage.html';
                }

                else
                {
                     state.style.background = "red";
                     state.innerHTML = "No se pudo agregar su restaurante!";
                }
            }
        }
    );
}