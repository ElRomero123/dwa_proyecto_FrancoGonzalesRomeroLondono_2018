﻿const RESTAURANTES = ['<button id="', '" class="restaurants" onclick="cargarRestaurante(this)"> <div> <div>', '</div> <div>', '</div> </div> </button>'];
const PLATOS = ['<div id="', '" class="foods"> <div> <div> Nombre:', '</div> <div> Descripción:', '</div> <div> Precio: $', '</div> <input type="radio" name="1" value="', '"> </div> </div>', '<div class="card"> <div id="title">APERITIVOS</div> <form>', '</div> </form>'];
const APERITIVOS = ['<div id="', '" class="foods"> <div> <div> Nombre:', '</div> <div> Descripción:', '</div> <div> Precio: $', '</div> <input type="radio" name="2" value="', '"> </div> </div>', '<div class="card"> <div id="title">APERITIVOS</div> <form>', '</div> </form>'];
const BEBIDAS = ['<div id="', '" class="foods"> <div> <div> Nombre:', '</div> <div> Descripción:', '</div> <div> Precio: $', '</div> <input type="radio" name="3" value="', '"> </div> </div>', '<div class="card"> <div id="title">APERITIVOS</div> <form>', '</div> </form>'];
const ORDEN = ['<div class="card"> <div class="foods"> <div> <div> Nombre:', '</div> <div> Descripción:', '</div> <div> Precio: $', '</div> </div> </div> </div>'];

var nombre, phone, avatar;
var back, menu;
var botonId;
var ordenar;
var rId;
var titulo;

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
    ordenar = document.getElementById('ordenar');
    back = document.getElementById('back');
    titulo = document.getElementById('titulo');

    back.addEventListener('click', toBack);
    nombre.innerHTML = localStorage.getItem('name');
    phone.innerHTML = localStorage.getItem('phone');
    avatar.style.background = 'url(' + localStorage.getItem('avatar') + ')';
}

function initRestaurants()
{
    back.style.display = "none";

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

function initVariables()
{
    menu = document.getElementById('menu');
}

function initEventos()
{
    
    menu.addEventListener('click', toMenu);
}

function cargarRestaurante(btn)
{
    titulo.text = 'Seleccione sus platos!';
    rId = btn.id;
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
    initRestaurants();
    titulo.text = 'Seleccione un restaurante';
}

function toMenu()
{
    location.href = "dashboard.html";
}

function enviarOrden()
{
    titulo.text = 'Acaba de seleccionar los siguientes productos:';
    back.style.display = 'none';

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