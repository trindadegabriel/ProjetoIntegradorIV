const calendario      = document.querySelector(".calendario"),
        data          = document.querySelector(".data"),
        diasContainer = document.querySelector(".dias"),
        prev          = document.querySelector(".prev"),
        next          = document.querySelector(".next"),
        btnHoje       = document.querySelector(".btn-hoje"),
        btnIrPara     = document.querySelector(".btn-ir-para"),
        dataInput     = document.querySelector(".input-data"),
        diaEvento = document.querySelector(".dia-evento"),
        dataEvento = document.querySelector(".data-evento"),
        containerEventos = document.querySelector(".eventos"),
        addEventSubmit = document.querySelector(".add-event-btn");

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
 
// const eventsArr = [
//     {
//         dia: 26,
//         mes: 10,
//         ano: 2023,
//         events : [
//             {
//                 title: "Renatorinthians",
//                 time: "11:00 AM",
//             },
//             {
//                 title: "Pedro Barboza",
//                 time: "11:00 AM",
//             },
//         ],
//     },
//     {
//         dia: 28,
//         mes: 10,
//         ano: 2023,
//         events : [
//             {
//                 title: "Gabriel Todes",
//                 time: "11:00 AM",
//             },
//             {
//                 title: "AAAAAAAAAAAAAAAAAAAAAAAAA",
//                 time: "11:00 AM",
//             },
//         ],
//     },
// ]; 

// Seta um array vazio 
let eventsArr = [];
// Chama os eventos
getEvents();
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

        // Checa se o evento é no dia atual
        let evento = false;
        eventsArr.forEach((eventObj) => {
            if (
                eventObj.dia == i &&
                eventObj.mes == mes + 1 &&
                eventObj.ano == ano
            ) {
                evento = true;
            }
        });

        activeDay = i;
        getActiveDay(i);
        mostrarEventos(i);

        // se for hoje, adiciona a classe "hoje"
        if (i == new Date().getDate() && ano == new Date().getFullYear() && mes == new Date().getMonth()){
            // se evento for encontrado, adiciona a classe "evento"
            if (evento) {
                dias += `<div class="dia hoje evento ativo">${i}</div>`;
            } else {
                dias += `<div class="dia hoje ativo">${i}</div>`;
            }
        } else { 
            if (evento) {
                dias += `<div class="dia evento">${i}</div>`;
            } else {
                dias += `<div class="dia">${i}</div>`;
            }
        }
    }
    for (let j = 1; j <= proximosDias; j++){
        dias += `<div class="dia prox-mes">${j}</div>`;
    }


    diasContainer.innerHTML = dias;
    addListner();
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

const addEventBtn = document.querySelector(".add-event"),
      addEventContainer = document.querySelector(".add-event-wrapper"),
      addEventCloseBtn  = document.querySelector(".close"),
      addEventTitle = document.querySelector(".event-name"),
      addEventFrom = document.querySelector(".event-time-from"),
      addEventTo   = document.querySelector(".event-time-to");


addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
});
document.addEventListener("click", (e) => {
    if(e.target != addEventBtn && !addEventContainer.contains(e.target)){
        addEventContainer.classList.remove("active");
    }
})
// Permite até 50 caracteres no nome do evento
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = "Doar Sangue";
    if (e.inputType == "deleteContentBackward" && addEventTitle.value === "Doar Sangue") {
        addEventTitle.value = "";
    }
});
// Formatação da digitação do tempo
addEventFrom.addEventListener("input", (e) => {
    // Só permite números
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if (addEventFrom.value.length == 2){
        addEventFrom.value += ":";
    }
    if (addEventFrom.value.length > 5){
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
    // Não deixava apagar os ":"
    if (e.inputType == "deleteContentBackward") {
        if (addEventFrom.value.length == 3) {
            addEventFrom.value = addEventFrom.value.slice(0, 2);;
        }
    }
});
addEventTo.addEventListener("input", (e) => {
    // Só permite números
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if (addEventTo.value.length == 2){
        addEventTo.value += ":";
    }
    if (addEventTo.value.length > 5){
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
    // Não deixava apagar os ":"
    if (e.inputType == "deleteContentBackward") {
        if (addEventTo.value.length == 3) {
            addEventTo.value = addEventTo.value.slice(0, 2);
        }
    }
});
// Listner nos dias
function addListner() {
    const dias = document.querySelectorAll(".dia");
    dias.forEach((dia) => {
        dia.addEventListener("click", (e) => {
            // Seta o dia atual como dia ativo
            activeDay = Number(e.target.innerHTML);
            // Chama o dia ativo depois do click
            getActiveDay(e.target.innerHTML);
            mostrarEventos(Number(e.target.innerHTML));

            // Remove o dia ativo
            dias.forEach((dia) => {
                dia.classList.remove("ativo");
            });

            // Se um dia do mês passado for cliclado, ativa esse dia e vai até o mês
            if (e.target.classList.contains("mes-pass")) {
                mesPassado();
                setTimeout(() => {
                    const dias = document.querySelectorAll(".dia");
                    // Ativa o dia clicado depois de carregar o mês
                    dias.forEach((dia) => {
                        if (
                            !dia.classList.contains("mes-pass") && 
                            dia.innerHTML == e.target.innerHTML
                        ) {
                            dia.classList.add("ativo");
                        }
                    });
                }, 100);
            // Pro proximo mes
            } else if (e.target.classList.contains("prox-mes")) {
                proxMes();
                setTimeout(() => {
                    const dias = document.querySelectorAll(".dia");
                    // Ativa o dia clicado depois de carregar o mês
                    dias.forEach((dia) => {
                        if (
                            !dia.classList.contains("prox-mes") && 
                            dia.innerHTML == e.target.innerHTML
                        ) {
                            dia.classList.add("ativo");
                        }
                    });
                }, 100);
            } else {
                e.target.classList.add("ativo");
            }
        });
    });
}
// Mostra os eventos do dia e atualiza o html do topo

function traduzirDias(diaEmIngles) {
    const diasDaSemana = {
        "Sun": "Domingo",
        "Mon": "Segunda",
        "Tue": "Terça",
        "Wed": "Quarta",
        "Thu": "Quinta",
        "Fri": "Sexta",
        "Sat": "Sábado"
    };
    return diasDaSemana[diaEmIngles] || diaEmIngles;
}
function getActiveDay(data) {
    const dia = new Date(ano, mes, data);
    const nomeDiaEmIngles = dia.toString().split(" ")[0];
    const nomeDia = traduzirDias(nomeDiaEmIngles);
    diaEvento.innerHTML = nomeDia;
    dataEvento.innerHTML = data + " " + meses[mes] + " "+ ano;
}

// Função para mostrar os eventos daquele dia

function mostrarEventos(date) { // linha 103 ta dando erro - era o nome no array (events)
    let eventos = "";
    eventsArr.forEach((event) => {
        if (
            date === event.dia &&
            mes + 1 === event.mes && 
            ano === event.ano
        ) {
            event.events.forEach((event) => { // nessa linha event.EVENTS(DO ARRAY).pracada
                eventos += `
                <div class="evento">
                    <div class="titulo">
                        <i class="fas fa-circle"></i>
                        <h3 class="titulo-evento">${event.title}</h3>
                    </div>
                    <div class="hora-evento">
                        <span class="hora-evento">${event.time}</span>
                    </div>
                </div>
                `
            });
        }
    });
    // Se não encontrar evento
    if (eventos === "") {
        eventos = `<div class="sem-evento">
                <h3>Sem Eventos</h3>
            </div>`;
    }
    containerEventos.innerHTML = eventos;
    //salva quando a atualização é chamada
    saveEvents();
}
// Função para adicionar novos eventos
addEventSubmit.addEventListener("click", () => {
    const tituloEvento = addEventTitle.value;
    const inicioEvento = addEventFrom.value;
    const fimEvento    = addEventTo.value; 

    if (tituloEvento == "" || inicioEvento == "" || fimEvento == "") {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }

    const inicioEventoArr = inicioEvento.split(":");
    const fimEventoArr    = fimEvento.split(":");
    if (
        inicioEventoArr.length != 2 ||
        fimEventoArr.length != 2 ||
        inicioEventoArr[0] > 23 ||
        inicioEventoArr[1] > 59 ||
        fimEventoArr[0] > 23 ||
        fimEventoArr[1] > 59
    ) {
        alert("Formato de tempo inválido!");
    }

    const inicio = convertTime(inicioEvento);
    const fim    = convertTime(fimEvento);

    const novoEvento = {
        title: tituloEvento,
        time: inicioEvento + " - " + fimEvento,
    };

    let eventoAdicionado = false; 
    // Checar se o array não está vazio
    if (eventsArr.length > 0) {
        // Checa se o dia atual já possui algum evento e então adiciona a ele
        eventsArr.forEach((item) => {
            if (
                item.dia === activeDay &&
                item.mes === mes + 1 &&
                item.ano === ano
            ) {
                item.events.push(novoEvento);
                eventoAdicionado = true;
            }
        });
    }

    // Se o array estiver vazio ou o dia atual nao tiver evento, cria um novo
    if (!eventoAdicionado) {
        eventsArr.push({
            dia: activeDay,
            mes: mes + 1,
            ano: ano,
            events : [novoEvento],
        });
    }
    // tira o ativo do add evento
    addEventContainer.classList.remove("ativo");
    // Limpa os campos
    addEventTitle.value ="";
    addEventFrom.value ="";
    addEventTo.value ="";
    // mostrar o evento adicionado
    mostrarEventos(activeDay);

    // também adiciona classe evento para o mais novo adiconado, se já não tiver
    const activeDayElem = document.querySelector(".dia.ativo");
    if (!activeDayElem.classList.contains("evento")) {
        activeDayElem.classList.add("evento");
    }
    
    
});

function convertTime(tempo) {
    let tempoArr = tempo.split(":");
    let tempoHora = tempoArr[0];
    let tempoMin  = tempoArr[1];
    let tempoFormat = tempoHora >= 12 ? "PM" : "AM";
    tempoHora = tempoHora % 12 || 12;
    tempo = tempoHora + ":" + tempoMin + " " + tempoFormat;
    return tempo;
};

// Função para remover evento ao clicar nele

containerEventos.addEventListener("click", (e) => {
    if (e.target.classList.contains("evento")) {
        const tituloEvento = e.target.children[0].children[1].innerHTML;
        // pega o titulo e procura no array, excluindo
        eventsArr.forEach((event) => {
            if (
                event.dia === activeDay &&
                event.mes === mes + 1 &&
                event.ano === ano
            ) {
                event.events.forEach((item, index) => {
                    if (item.title == tituloEvento) {
                        event.events.splice(index, 1);
                    }
                });
                // Se não tem nada naquele dia, remove 
                if (event.events.length === 0) {
                    eventsArr.splice(eventsArr.indexOf(event), 1);
                    // remove a classe ativo
                    const activeDayElem = document.querySelector(".dia.ativo")
                    if (activeDayElem.classList.contains("evento")) {
                        activeDayElem.classList.remove("evento")
                    }
                }
            }
        });
        // atualiza
        mostrarEventos(activeDay);
    }
});

// Armazenar localmente

function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents() {
    if (localStorage.getItem("events") != null) {
        var eventsArr = [];
        eventsArr.push(...JSON.parse(localStorage.getItem("events")));
        return eventsArr;
    }
}

var events = getEvents();