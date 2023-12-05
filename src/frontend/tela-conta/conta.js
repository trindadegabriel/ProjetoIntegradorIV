const inputNomeAtt = document.querySelector('.nome');
const inputEmailAtt = document.querySelector('.email-cadastro');
const inputNovoEmailAtt = document.querySelector('.novo-email-cadastro');
const inputSenhaAtt = document.querySelector('.senha-cadastro');
const inputNovaSenhaAtt = document.querySelector('.nova-senha-cadastro');
const inputTipoSangueAtt = document.querySelector('.tipo-sangue');
const inputCidadeAtt = document.querySelector('.cidade');
const inputGeneroAtt = document.querySelector('.genero');

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

function atualizarDados() {
    event.preventDefault();
    var nome = encodeURIComponent(inputNomeAtt.value);
    var email = encodeURIComponent(inputEmailAtt.value);
    var novoEmail = encodeURIComponent(inputNovoEmailAtt.value);
    var senha = encodeURIComponent(inputSenhaAtt.value);
    var novaSenha = encodeURIComponent(inputNovaSenhaAtt.value);
    var tiposangue = encodeURIComponent(inputTipoSangueAtt.value);
    var cidade = encodeURIComponent(inputCidadeAtt.value);
    var genero = encodeURIComponent(inputGeneroAtt.value);

    var formData = `&nome=${nome}&email=${email}&novoemail=${novoEmail}&senha=${senha}&novasenha=${novaSenha}&tipo=${tiposangue}&cidade=${cidade}&genero=${genero}`;

    fetch("/atualizar", {
        method: "POST",
        body: formData,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        alert("Atualizado com sucesso");
        console.log("Atualização realizada com sucesso: ", data);
        window.location.href = "/tela-conta/conta.html";
    })
    .catch(error => {
        alert("Erro ao atualizar.")
        console.log("Erro ao atualizar: ", error);
    });
}

function cancelar() {
    event.preventDefault();
    var formulario = document.querySelector('.form-dados');
    var dados = document.querySelector('.dados-atuais');
    formulario.style.display = 'none';
    dados.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('/dadosusuario', {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('nome-usuario').innerText = data.nome;
        document.getElementById('email-usuario').innerText = data.email;
        document.getElementById('cpf-usuario').innerText = data.cpf;
        document.getElementById('tipo-sangue-usuario').innerText = data.tipo;
        document.getElementById('cidade-usuario').innerText = data.cidade;
        document.getElementById('genero-usuario').innerText = data.genero;
    })
    .catch(error => console.error('Erro ao obter dados do usuário: ', error));
});

function validarNome(){
    var regex = /^[A-Za-z]+$/;

    if(nome === ""){
        return false;
    }

    if(!regex.test(nome)){
        alert("Por favor, digite apenas letras no campo de nome.");
        return false;
    }

    return true;
}

function validarEmail(email){
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email === ""){
        return false;
    }

    if(!regexEmail.test(email) && email.length < 10){
        alert("Por favor, digite o email corretamente.");
        return false;
    }
    
    return true;
}

function validarSenha(senha){
    if(senha.length < 8){
        alert("Por favor, digite uma senha maior.")
        return false;
    }
    return true;
}

function validarTipoSanguineo(tipo){
    const tipos = ["A+", "A-", "B+", "B-", "AB+", "AB+", "O-", "O+"]
    for(i=0;i<tipos.length;i++){
        if(tipo == tipos[i]){
            return true;
        }
    }
    alert("Por favor, digite um tipo sanguíneo valido.\nEx: AB+")
    return false;
}

function validarFormulario(){
    event.preventDefault();
    var nomeValido = validarNome(inputNomeAtt.value);
    var emailValido = validarEmail(inputEmailAtt.value);
    var novoEmailValido = validarEmail(inputNovoEmailAtt.value);
    var senhaValida = validarSenha(inputSenhaAtt.value);
    var novaSenhaValida = validarSenha(inputNovaSenhaAtt.value);
    var tipoValido = validarTipoSanguineo(inputTipoSangueAtt.value);

    if(nomeValido && emailValido && novoEmailValido && senhaValida && novaSenhaValida && tipoValido){
        atualizarDados();
    }
}

function sair() {
    fetch('/sair', {
        method: 'POST'
    })
    .then(() => {
        window.location.href = "/tela-login/telalogin.html"
    })
    .catch(error => {
        console.error('Erro ao sair da conta: ', error);
    });
}