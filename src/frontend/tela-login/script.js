const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

const formularioCadastro = document.querySelector('.form-cadastro');
const btnEntrar = document.querySelector('.btn-entrar');
const btnCadastrar = document.querySelector('.btn-cadastrar');

// Cadastro
const inputNomeCad = document.querySelector('.nome');
const inputCPFCad = document.querySelector('.cpf');
const inputEmailCad = document.querySelector('.email-cadastro');
const inputSenhaCad = document.querySelector('.senha-cadastro');
const inputTipoSangueCad = document.querySelector('.tipo-sanguineo');
const inputCidadeCad = document.querySelector('.cidade');
const inputGeneroCad = document.querySelector('.genero');
// Entrar
const inputEmailLogin = document.querySelector('.email-login');
const inputSenhaLogin = document.querySelector('.senha-login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function cadastrar() {
    event.preventDefault();
    var nome = encodeURIComponent(inputNomeCad.value);
    var cpf = encodeURIComponent(inputCPFCad.value);
    var email = encodeURIComponent(inputEmailCad.value);
    var senha = encodeURIComponent(inputSenhaCad.value);
    var tiposangue = encodeURIComponent(inputTipoSangueCad.value);
    var cidade = encodeURIComponent(inputCidadeCad.value);
    var genero = encodeURIComponent(inputGeneroCad.value);

    var formData = `&nome=${nome}&cpf=${cpf}&email=${email}&senha=${senha}&tipo=${tiposangue}&cidade=${cidade}&genero=${genero}`;

    fetch("/cadastrar", {
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
        alert("Cadastrado com sucesso");
        console.log("Cadastro realizado com sucesso: ", data);
        window.location.href = "/tela-infos-doacao/infos_doacao.html";
    })
    .catch(error => {
        alert("Erro ao cadastrar. Usuário já existe.")
        console.log("Erro ao cadastrar: ", error);
    });
}

function login() {
    event.preventDefault();
    const email = encodeURIComponent(inputEmailLogin.value);
    const senha = encodeURIComponent(inputSenhaLogin.value);

    const formData = `&email=${email}&senha=${senha}`;

    fetch("/login", {
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
        alert("Login bem sucedido");
        console.log("Login bem sucedido: ", data);
        window.location.href = "/tela-infos-doacao/infos_doacao.html";
    })
    .catch(error => {
        alert("Credenciais inválidas");
        console.log("Erro ao fazer login: ", error);
    });
}

function validarNome(nome){
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

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');    
    if(cpf == '') return false; 
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
            return false;       
    add = 0;    
    for (i=0; i < 9; i ++)       
        add += parseInt(cpf.charAt(i)) * (10 - i);  
        rev = 11 - (add % 11);  
        if (rev == 10 || rev == 11)     
            rev = 0;    
        if (rev != parseInt(cpf.charAt(9)))     
            return false;       
    add = 0;    
    for (i = 0; i < 10; i ++)        
        add += parseInt(cpf.charAt(i)) * (11 - i);  
    rev = 11 - (add % 11);  
    if (rev == 10 || rev == 11) 
        rev = 0;    
    if (rev != parseInt(cpf.charAt(10)))
        return false;       
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
    var nomeValido = validarNome(inputNomeCad.value);
    var cpfValido = validarCPF(inputCPFCad.value);
    var emailValido = validarEmail(inputEmailCad.value);
    var senhaValida = validarSenha(inputSenhaCad.value);
    var tipoValido = validarTipoSanguineo(inputTipoSangueCad.value);

    if(nomeValido && cpfValido && emailValido && senhaValida && tipoValido){
        cadastrar();
    } else {
        alert("Preencha os campos corretamente.");
    }
}