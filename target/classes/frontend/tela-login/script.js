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

    var formData = `&nome=${nome}&cpf=${cpf}&email=${email}&senha=${senha}`;

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
    })
    .catch(error => {
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
    })
    .catch(error => {
        alert("Credenciais inválidas");
        console.log("Erro ao fazer login: ", error);
    });
}