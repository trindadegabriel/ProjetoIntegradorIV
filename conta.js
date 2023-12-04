function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    var seloElement = event.target;

    // Verifica se o elemento é uma tag de imagem
    if (seloElement.tagName.toLowerCase() === 'img') {
        // Obtém o ID do selo
        var seloId = seloElement.parentNode.id;

        // Configura os dados de transferência com o ID do selo
        event.dataTransfer.setData("text/plain", seloId);
    } else {
        console.error("O elemento não é uma tag de imagem.");
    }
}

function drop(event) {
    event.preventDefault();
    var seloId = event.dataTransfer.getData("text/plain");
    var draggedElement = document.getElementById(seloId);

    // Verifica se o selo está sendo movido da área de "Recebidos" para "Favoritos"
    if (event.target.id === "recompesas-favoritas" && event.target !== draggedElement) {
        // Move o selo existente para a área de "Favoritos"
        event.target.appendChild(draggedElement);
    }

    // Verifica se o selo está sendo movido da área de "Favoritos" para "Recebidos"
    if (event.target.id === "recompensas-recebidas" && event.target !== draggedElement) {
        // Move o selo existente para a área de "Recebidos"
        event.target.appendChild(draggedElement);
    }
}

function atualizar() {
    event.preventDefault();
    var formulario = document.querySelector('.form-dados');
    var dados = document.querySelector('.dados-atuais');
    formulario.style.display = 'block';
    dados.style.display = 'none';
}
function cancelar() {
    event.preventDefault();
    var formulario = document.querySelector('.form-dados');
    var dados = document.querySelector('.dados-atuais');
    formulario.style.display = 'none';
    dados.style.display = 'block';
}
function validarNome() {
    event.preventDefault();
    var nome = document.querySelector('.nome').value;
    var regex = /^[A-Za-z]+$/;

    if (nome === "") {
        alert("Preencha os campos corretamente.");
        return false;
    }

    if (!regex.test(nome)) {
        alert("Por favor, digite apenas letras no campo de nome.");
        return false;
    }

    return true;
}
function validarSobrenome() {
    event.preventDefault();
    var nome = document.querySelector('.sobrenome').value;
    var regex = /^[A-Za-z]+$/;

    if (nome === "") {
        alert("Preencha os campos corretamente.");
        return false;
    }

    if (!regex.test(nome)) {
        alert("Por favor, digite apenas letras no campo de sobrenome.");
        return false;
    }

    return true;
}


function cadastrar() {
    event.preventDefault();
    validarNome();
    validarSobrenome();
}

document.addEventListener('DOMContentLoaded', function () {
    var token = pegarCookie('token');
    var cookie = "token="+token;

    fetch('/dadosusuario', {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('nome-usuario').innerText = data.nome;
        document.getElementById('email-usuario').innerText = data.email;
        document.getElementById('cpf-usuario').innerText = data.cpf;
    })
    .catch(error => console.error('Erro ao obter dados do usuário: ', error));
});

function pegarCookie(name) {
    var valorCookie = null;
    if(document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                valorCookie = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return valorCookie;
}