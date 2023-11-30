const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

const formularioCadastro = document.querySelector('.form-cadastro');
const btnEntrar = document.querySelector('.btn-entrar');
const btnCadastrar = document.querySelector('.btn-cadastrar');

// Cadastro
const inputNome = document.querySelector('.nome');
const inputCPF = document.querySelector('.cpf');
const inputEmailCad = document.querySelector('.email-cadastro');
const inputSenhaCad = document.querySelector('.senha-cadastro');
// Entrar
const inputEmail = document.querySelector('.email-login');
const inputSenha = document.querySelector('.senha-login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

btnEntrar.addEventListener('click', () => {
    console.log("CLICOU");
});

function cadastrar() {
    fetch("http://localhost:8080/",
    {
        method: "POST",
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
            nome: inputNome.value,
            cpf: inputCPF.value,
            email: inputEmailCad.value,
            senha: inputSenhaCad.value
        }),
    })
    .then(function (res) {console.log(res)})
    .catch(function (error) {
        console.error('Erro ao cadastrar: ', error);
    });
};

formularioCadastro.addEventListener('submit', function(event) {
    event.preventDefault();
    cadastrar();
});