// Set map
function initialize() {
    var mapOptions = {
        // Zoom do mapa no começo
        zoom: 10,
        // Coordenadas iniciais (Hemocentro)
        center: new google.maps.LatLng(-22.828509810485166, -47.061871769251944),
        // Tipo do mapa (ROADMAP, SATELLITE, HYBRID, TERRAIN)
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        // Zoom minimo do mapa:
        minZoom: 2
    };
    // Cria uma nova instância do mapa usando opções providas
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Cria uma janela de informação para mostrar informações da localização
    var infoWindow = new google.maps.InfoWindow();

    // Cria marcadores no mapa:
    // Hemocentro Unicamp
    var mk = new google.maps.Marker({
        position: new google.maps.LatLng(-22.828675633573344, -47.06237811141028),
        // attac
        map: map,
        // Mostra o local
        title: 'Posto Unicamp - Hemocentro',
    });
    // Mario Gatti
    var mk_2 = new google.maps.Marker({
        position: new google.maps.LatLng(-22.91587210929339, -47.068504524500476),
        map: map,
        title: 'Posto Mário Gatti - Hospital Municipal Dr. Mário Gatti'
    });
    // Posto Sumaré
    var mk_3 = new google.maps.Marker({
        position: new google.maps.LatLng(-22.816496750189092, -47.2417167343049),
        map: map,
        title: 'Posto Sumaré - Hospital Estadual de Sumaré'
    });
    // Posto Piracicaba
    var mk_4 = new google.maps.Marker({
        position: new google.maps.LatLng(-22.73611496187677, -47.64289720362605),
        map: map,
        title: 'Posto Piracicaba - Hemonúcleo'
    });
    // Adiciona evento de clique nos marcadores
    // Hemocentro - Unicamp
    mk.addListener('click', function(){
        infoWindow.setContent(mk.title);
        infoWindow.open(map, mk);
    });
    // Mario Gatti
    mk_2.addListener('click', function(){
        infoWindow.setContent(mk_2.title);
        infoWindow.open(map, mk_2);
    })
    // Sumaré
    mk_3.addListener('click', function(){
        infoWindow.setContent(mk_3.title);
        infoWindow.open(map, mk_3);
    })
    mk_4.addListener('click', function(){
        infoWindow.setContent(mk_4.title);
        infoWindow.open(map, mk_4);
    })



    // Ajusta o centro do mapa quando a janela é movida
    google.maps.event.addDomListener(window, "resize", function(){
        map.setCenter(mapOptions.center);
    });
}

// inicializa o mapa quando termina de carregar a janela
google.maps.event.addDomListener(window, 'load', initialize);

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