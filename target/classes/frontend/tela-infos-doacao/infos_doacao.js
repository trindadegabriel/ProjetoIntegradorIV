async function carregarJSON() {
    try {
        let response = await fetch('/bancos.json');
        let data = await response.json();
        return data;
    } catch (erro) {
        console.error('Erro ao carregar o JSON: ', erro);
    }
}

function carregarBancos(){
    carregarJSON().then(dados => {
        Object.values(dados).forEach(banco => {
            const novaDiv = document.createElement('div');
            novaDiv.className = 'banco-de-sangue';
            novaDiv.onclick = carregarGrafico;
      
            const nome = document.createElement('h2');
            nome.textContent = banco.Unidade + " - " + banco.Município;
        
            const endereco = document.createElement('p');
            endereco.textContent = banco.Endereço;
        
            const telefone = document.createElement('p');
            telefone.textContent = banco.Telefone;
        
            const site = document.createElement('p');
            site.textContent = banco.Site;
        
            const horario = document.createElement('p');
            horario.textContent = banco.Funcionamento;
    
            const estacionamento = document.createElement('p');
            estacionamento.textContent = banco.Estacionamento;
        
            novaDiv.appendChild(nome);
            novaDiv.appendChild(endereco);
            novaDiv.appendChild(telefone);
            novaDiv.appendChild(site);
            novaDiv.appendChild(horario);
            novaDiv.appendChild(estacionamento);
        
            document.querySelector('.bancos-de-sangue').appendChild(novaDiv);
        });
    }).catch(erro => {
        console.error('Erro ao carregar os bancos: ', erro);
    });
}

function carregarGrafico(){
    const barras = document.querySelectorAll('.barra');
    
    barras.forEach(barra => {
        const novaPorcentagem = Math.floor(Math.random() * 101); // Aqui tem que pegar dados do banco de sangue selecionado ao invés de ser aleatório
        const textoPorcentagem = barra.querySelector('.porcentagem');
        const novaAltura = novaPorcentagem + '%'

        textoPorcentagem.textContent = novaAltura;
        barra.style.height = novaAltura;
    })
}