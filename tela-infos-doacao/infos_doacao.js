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