var register;
var username, password, passwordAgain, nombre, lastName, numDocument, phone, address;

window.onload = inicializar;

function inicializar()
{
    initVariables();
    initEventos();
}

function initVariables()
{
    username = document.getElementById('username');
    password = document.getElementById('password');
    passwordAgain = document.getElementById('passwordAgain');
    nombre = document.getElementById('nombre');
    lastName = document.getElementById('lastName');
    numDocument = document.getElementById('numDocument');
    phone = document.getElementById('phone');
    address = document.getElementById('address');
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
    state.innerHTML = "Estamos creando el usuario...";

    if (password.value == passwordAgain.value)
    {
        if (!isNaN(numDocument.value) && !isNaN(phone.value))
        {
            var user =
            {
                username: username.value,
                password: password.value,
                name: nombre.value,
                lastName: lastName.value,
                typeDocument: "CC",
                numDocument: numDocument.value,
                phone: phone.value,
                address: address.value,
                reputation: 10
            };


            $.ajax
            (
                {
                    url: '../api/user',
                    type: 'POST',
                    data: JSON.stringify(user),
                    contentType: "application/json;charset=utf-8",

                    success:
                    function (data)
                    {
                        if (data)
                        {
                            location.href = "index.html";
                        }

                        else
                        {
                            state.style.background = "red";
                            state.innerHTML = "No se pudo agregar el registro. Puede ser un problema en el formato!";
                        }
                    }
                }
            );
        }

        else
        {
            state.style.background = "red";
            state.innerHTML = "Documento y teléfono son numéricos!";
        }
    }

    else
    {
        state.style.background = "red";
        state.innerHTML = "Las contraseñas no coinciden!";
    }
}