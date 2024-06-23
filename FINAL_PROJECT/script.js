document.getElementById('patientDetailsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var age = parseFloat(document.getElementById('age').value);
    var sex = parseFloat(document.getElementById('sex').value);
    var chestPain = parseFloat(document.getElementById('chestPain').value);
    var bloodSugarChecked = document.getElementById('bloodSugar').checked;
    var restingBloodPressure = parseFloat(document.getElementById('restingBloodPressure').value);
    var maxHeartRate = parseFloat(document.getElementById('maxHeartRate').value);

    var prediction = 0;

    if (bloodSugarChecked || restingBloodPressure > 230) {
        prediction += 10;
    }

    var maxHeartRatePrediction = 220 - age;

    if (maxHeartRate > maxHeartRatePrediction) {
        prediction += (maxHeartRate - maxHeartRatePrediction) * 0.5;
    }

    if (sex === 1 && chestPain !== 4) {
        prediction += 20;
    }

    var predictionResult = document.getElementById('predictionResult');
    var predictionColor;

    if (prediction >= 70) {
        predictionColor = '#FF0000'; // Red
    } else if (prediction >= 50) {
        predictionColor = '#FFA500'; // Orange
    } else if (prediction >= 30) {
        predictionColor = '#FFFF00'; // Yellow
    } else {
        predictionColor = '#008000'; // Green
    }

    predictionResult.style.color = predictionColor;
    predictionResult.innerHTML = name + ' has a ' + prediction + '% chance of heart disease.';
});
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Example of authentication logic (replace with your actual authentication logic)
    if (username === 'user' && password === 'password') {
        // Redirect to patient details page on successful login
        window.location.href = 'patient_details.html';
    } else {
        document.getElementById('loginMessage').innerText = 'Invalid username or password';
    }
});

