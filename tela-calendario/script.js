const calendario      = document.querySelector(".calendario"),
        data          = document.querySelector(".data"),
        diasContainer = document.querySelector(".dias"),
        prev          = document.querySelector(".prev"),
        next          = document.querySelector(".next"),
        btnHoje       = document.querySelector(".btn-hoje"),
        btnIrPara     = document.querySelector(".btn-ir-para"),
        dataInput     = document.querySelector(".input-data");

let hoje = new Date();
let diaAtivo;
let mes = hoje.getMonth();
let ano = hoje.getFullYear();

const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

// Função para adicionar os dias no calendário
function initCalendario() {
    // Pegar os dias do mes passado, atual e prox
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia   = new Date(ano, mes+1, 0);
    const passUltimoDia = new Date(ano, mes, 0);
    const diasPassados  = passUltimoDia.getDate();
    const ultimaData    = ultimoDia.getDate();
    const dia           = primeiroDia.getDay();
    const proximosDias  = 7 - ultimoDia.getDay() - 1;

    // Atualiza a data em cima do calendário
    data.innerHTML = meses[mes] + " " + ano;

    // Adc dias
    let dias = "";
    // dias do mes passado
    for (let x = dia; x > 0; x--){
        dias += `<div class="dia mes-pass">${diasPassados - x + 1}</div>`
    }
    // mes atual
    for (let i = 1; i <= ultimaData; i++){
        // se for hoje, adiciona a classe "hoje"
        if (i == new Date().getDate() && ano == new Date().getFullYear() && mes == new Date().getMonth()){
            dias += `<div class="dia hoje">${i}</div>`;
        } else { 
            // Adc os outros dias
            dias += `<div class="dia">${i}</div>`;
        }
    }
    for (let j = 1; j <= proximosDias; j++){
        dias += `<div class="dia prox-mes">${j}</div>`;
    }


    diasContainer.innerHTML = dias;
}

initCalendario();

// mes passado
function mesPassado() {
    mes--;
    if (mes < 0){
        mes = 11;
        ano--;
    }
    initCalendario();
}
// prox mes
function proxMes() {
    mes++;
    if (mes > 11) {
        mes = 1;
        ano++;
    }
    initCalendario();
}
// adc as funções nos botões
prev.addEventListener("click", mesPassado);
next.addEventListener("click", proxMes);

btnHoje.addEventListener("click", () => {
    hoje = new Date();
    mes = hoje.getMonth();
    ano = hoje.getFullYear();
    initCalendario();
});

dataInput.addEventListener("input", (e) => {
    // Permite só numeros:
    dataInput.value = dataInput.value.replace(/[^0-9/]/g, "");
    if (dataInput.value.length == 2) {
        // Adc depois de dois numeros "/"
        dataInput.value += "/";
    }
    if (dataInput.value.length > 7) {
        // Permite só 7 caracteres
        dataInput.value = dataInput.value.slice(0, 7);
    }
    // Não tava deixando apagar a "/"
    if (e.inputType == "deleteContentBackward") {
        if (dataInput.value.length == 3) {
            dataInput.value = dataInput.value.slice(0, 2);
        }
    }
});

btnIrPara.addEventListener("click", irParaData);
// Função para ir pra data digitada
function irParaData() {
    const dateArr =dataInput.value.split("/");
    // validação
    if (dateArr.length == 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length == 4) {
            mes = dateArr[0] - 1;
            ano = dateArr[1];
            initCalendario();
            return;
        }
    }
    // se for data inválida:
    alert("Data digitada inválida!")
}

const btnAddEvento = document.querySelector(".add-evento"),
      containerAddEvento = document.querySelector(".add-evento-wrapper"),
      btnFecharAddEvento = document.querySelector(".close");

btnAddEvento.addEventListener("click", ()=> {
    containerAddEvento.classList.toggle("ativo");
});
btnFecharAddEvento.addEventListener("click", ()=> {
    containerAddEvento.classList.remove("ativo");
})

