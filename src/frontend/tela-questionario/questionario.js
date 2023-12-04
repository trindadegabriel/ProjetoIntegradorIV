document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault(); // Prevents the form from submitting

    var age = document.getElementById('age').value;
    var weight = document.getElementById('weight').value;
    var health_no = document.getElementById('health_no').checked;
    var sleep_no = document.getElementById('sleep_no').checked;
    var food_yes = document.getElementById('food_yes').checked;
    var id_no = document.getElementById('id_no').checked;
    var vaccine_no = document.getElementById('vaccine_no').checked;
    var diseaseYes = document.getElementById('disease_yes').checked;

    // Validation of the information
    if (age >= 16 || age <= 69 && weight > 50 || weight<200 && !diseaseYes && health_no && !sleep_no && !food_yes && !id_no && !vaccine_no) {
        Swal.fire('Você está elegível para doar sangue.');
    } else {
        Swal.fire('Que pena!\nVocê está inelegível para doar sangue.');
    }
});