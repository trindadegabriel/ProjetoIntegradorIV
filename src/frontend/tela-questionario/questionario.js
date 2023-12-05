document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault(); // Prevents the form from submitting

    var age = document.getElementById('age').value;
    var weight = document.getElementById('weight').value;
    var health_yes = document.getElementById('health_yes').checked;
    var sleep_yes = document.getElementById('sleep_yes').checked;
    var food_no = document.getElementById('food_no').checked;
    var id_yes = document.getElementById('id_yes').checked;
    var vaccine_yes = document.getElementById('vaccine_yes').checked;
    var disease_no = document.getElementById('disease_no').checked;

    // Validation of the information
    if (age >= 16 && age <= 69 && weight > 50  && health_yes && sleep_yes && food_no && id_yes && vaccine_yes && disease_no) {
        Swal.fire('Você está elegível para doar sangue.');
    } else {
        Swal.fire('Que pena!\nVocê está inelegível para doar sangue.');
    }
});

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