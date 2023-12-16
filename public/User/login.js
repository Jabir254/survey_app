// Function to handle user registration
async function registerUser() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('localhost:3000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    alert('Registration successful!');
    console.log(data);
  } else {
    alert(`Registration failed: ${data.error}`);
  }
}

// Function to handle user login
async function loginUser() {
  const loginUsername = document.getElementById('loginUsername').value;
  const loginPassword = document.getElementById('loginPassword').value;

  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: loginUsername, password: loginPassword }),
  });

  const data = await response.json();

  if (response.ok) {
    alert('Login successful!');
    console.log(data);
  } else {
    alert(`Login failed: ${data.error}`);
  }
}
