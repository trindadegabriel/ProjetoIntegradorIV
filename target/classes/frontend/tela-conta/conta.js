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



