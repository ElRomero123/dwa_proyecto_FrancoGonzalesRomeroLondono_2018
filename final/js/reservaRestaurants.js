﻿const RESTAURANTES = ['<button id="', '" class="restaurants" onclick="cargarRestaurante(this)"> <div> <div>', '</div> <div>', '</div> </div> </button>'];
const PLATOS = ['<div id="', '" class="foods"> <div> <div> Nombre:', '</div> <div> Descripción:', '</div> <div> Precio: $', '</div> <input type="radio" name="1" value="', '"> </div> </div>', '<div class="card"> <div id="title">PLATOS</div> <form>', '</div> </form>'];
const APERITIVOS = ['<div id="', '" class="foods"> <div> <div> Nombre:', '</div> <div> Descripción:', '</div> <div> Precio: $', '</div> <input type="radio" name="2" value="', '"> </div> </div>', '<div class="card"> <div id="title">APERITIVOS</div> <form>', '</div> </form>'];
const BEBIDAS = ['<div id="', '" class="foods"> <div> <div> Nombre:', '</div> <div> Descripción:', '</div> <div> Precio: $', '</div> <input type="radio" name="3" value="', '"> </div> </div>', '<div class="card"> <div id="title">BEBIDAS</div> <form>', '</div> </form>'];
const ORDEN = ['<div class="card"> <div class="foods"> <div> <div> Nombre:', '</div> <div> Descripción:', '</div> <div> Precio: $', '</div> </div> </div> </div>'];

var nombre, phone, avatar;
var back, menu;
var titulo, ordenar, finish, hash;
var interval, result = false;
var stateWait, stateStarted, stateFinish;
var tagTitle, tagSeconds;

var segundo = 10;
var intervalo2;

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

    back = document.getElementById('back');
    menu = document.getElementById('menu');

    titulo = document.getElementById('titulo');
    ordenar = document.getElementById('ordenar');
    finish = document.getElementById('finish');
    hash = document.getElementById('hash');

    stateWait = document.getElementById('stateWait');
    stateStarted = document.getElementById('stateStarted');
    stateFinish = document.getElementById('stateFinish');

    tagTitle = document.getElementById('tagTitle');
    tagSeconds = document.getElementById('tagSeconds');

    nombre.innerHTML = localStorage.getItem('name');
    phone.innerHTML = localStorage.getItem('phone');
    avatar.style.background = 'url(' + localStorage.getItem('avatar') + ')';
    back.addEventListener('click', toBack);
    menu.addEventListener('click', toMenu);
}

function initRestaurants()
{
    back.style.display = "none";
    finish.style.display = "none";

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
                    elements += RESTAURANTES[0] + data[i][0] + RESTAURANTES[1] + data[i][1] + RESTAURANTES[2] + data[i][3] + RESTAURANTES[2] + data[i][5] + RESTAURANTES[2] + data[i][4] + RESTAURANTES[3];
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

function cargarRestaurante(btn)
{
    titulo.innerHTML = 'Pida por la carta virtual!';
    rId = btn.id;
    back.style.display = "inline-block";
    finish.style.display = 'none';
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
                    elements += APERITIVOS[0] + data[i][0] + APERITIVOS[1] + data[i][1] + APERITIVOS[2] + data[i][2] + APERITIVOS[3] + data[i][3] + APERITIVOS[4] + data[i][0] + APERITIVOS[5];
                }

                $('#listOptions').append(APERITIVOS[6] + elements + APERITIVOS[7]);

                for (i = 0; i < data.length; i++)
                {
                    document.getElementById(data[i][0]).style.background = 'url(' + data[i][4] + ')';
                }
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
                    elements += PLATOS[0] + data[i][0] + PLATOS[1] + data[i][1] + PLATOS[2] + data[i][2] + PLATOS[3] + data[i][3] + PLATOS[4] + data[i][0] + PLATOS[5];
                }

                $('#listOptions').append(PLATOS[6] + elements + PLATOS[7]);

                for (i = 0; i < data.length; i++)
                {
                    document.getElementById(data[i][0]).style.background = 'url(' + data[i][4] + ')';
                }
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
                    elements += BEBIDAS[0] + data[i][0] + BEBIDAS[1] + data[i][1] + BEBIDAS[2] + data[i][2] + BEBIDAS[3] + data[i][3] + BEBIDAS[4] + data[i][0] + BEBIDAS[5];
                }

                $('#listOptions').append(BEBIDAS[6] + elements + BEBIDAS[7]);

                for (i = 0; i < data.length; i++)
                {
                    document.getElementById(data[i][0]).style.background = 'url(' + data[i][4] + ')';
                }
            }
        }
    );

    ordenar.style.display = 'block'; 
}

function toBack()
{
    $('#listOptions').empty();
    back.style.display = "none";
    ordenar.style.display = 'none';
    initRestaurants();
    titulo.innerHTML = 'Seleccione un restaurante';
}

function toMenu()
{
    location.href = "dashboard.html";
}

function enviarOrden()
{
    titulo.innerHTML = 'Has seleccionado los siguientes productos:';
    back.style.display = 'none';
    finish.style.display = 'block';

    localStorage.setItem(1, $('input:radio[name=1]:checked').val());
    localStorage.setItem(2, $('input:radio[name=2]:checked').val());
    localStorage.setItem(3, $('input:radio[name=3]:checked').val());
    $('#listOptions').empty();
    ordenar.style.display = 'none'; 

    for (var i = 1; i <= 3; i++)
    {
        $.ajax
        (
            {
                url: '../api/food?id=' + localStorage.getItem(i),
                type: 'GET',
                contentType: "application/json;charset=utf-8",
                success:
                function (data)
                {
                    $('#listOptions').append(ORDEN[0] + data[0][0] + ORDEN[1] + data[0][1] + ORDEN[2] + data[0][2] + ORDEN[3]);
                }
            }
        );
    }
}

function finalizar()
{
    var venta =
    {
        idUser: parseInt(localStorage.getItem('idUser')),
        idFood1: parseInt(localStorage.getItem(1)),
        idFood2: parseInt(localStorage.getItem(2)),
        idFood3: parseInt(localStorage.getItem(3)),
        hashVenta: '',
        received: false,
        start: false,
        timeWait: 10,
        idRestaurant: rId
    };
    
    $.ajax
    (
        {
            url: '../api/venta',
            type: 'POST',
            data: JSON.stringify(venta),
            contentType: "application/json;charset=utf-8",

            success:
            function (data)
            {
                $('#listOptions').empty();
                finish.style.display = 'none';
                titulo.innerHTML = 'FELICITACIONES!';
                hash.innerHTML = data;

                stateWait.style.visibility = 'visible';
                stateWait.style.background = 'darkred';
                stateStarted.style.visibility = 'visible';
                stateFinish.style.visibility = 'visible';
                intervalo = setInterval(consultarEstado, 5000);
            }
        }
    );
}

function consultarEstado()
{
    $.ajax
    (
        {
            url: '../api/venta?hashVenta=' + hash.innerHTML,
            type: 'GET',
            contentType: "application/json;charset=utf-8",
            success:
            function (data)
            {
                result = data;
            }
        }
    );

    if (result)
    {
        stateStarted.style.background = 'orange';
        stateWait.style.background = 'darkgray';
        countDown();
        clearInterval(intervalo);
    }
}

function countDown()
{
    tagTitle.style.visibility = 'visible';
    tagSeconds.style.visibility = 'visible';

    $.ajax
    (
        {
            url: '../api/venta?hashVenta=' + hash.innerHTML + '&vacio=' + "Hola",
            type: 'GET',
            contentType: "application/json;charset=utf-8",
            success:
            function (data)
            {
                segundo = data;
            }
        }
    );

    intervalo2 = setInterval(cronometro, 1000);
}

function cronometro()
{
    segundo--;
    tagSeconds.innerHTML = segundo;

    if (segundo === 0)
    {
        stateStarted.style.background = 'darkgray';
        stateFinish.style.background = 'green';
        clearInterval(intervalo2);
    }
}