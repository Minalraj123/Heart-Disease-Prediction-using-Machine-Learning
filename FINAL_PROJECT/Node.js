document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Simulate a check for registration status
  const registrationCompleted = checkRegistration(username);

  if (registrationCompleted) {
      // Redirect to patient details if registration is completed and login is successful
      if (authenticate(username, password)) {
          window.location.href = 'patient_details.html';
      } else {
          document.getElementById('loginMessage').textContent = 'Invalid username or password.';
      }
  } else {
      // If registration is not completed, display a message
      document.getElementById('loginMessage').textContent = 'Please register before logging in.';
  }
});

function checkRegistration(username) {
  // Simulate a check for registration status
  const registeredUsers = ['user1', 'user2', 'user3']; // Example list of registered users
  return registeredUsers.includes(username);
}

function authenticate(username, password) {
  // Simulate a basic authentication check
  const validCredentials = {
      'user1': 'password1',
      'user2': 'password2',
      'user3': 'password3'
  };

  return validCredentials[username] === password;
}
