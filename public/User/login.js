// Import Axios library
import axios from 'axios';

// Function to handle user registration
async function registerUser() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Make a POST request using Axios
    const response = await axios.post('/register', { username, email, password });

    // Handle the response
    alert('Registration successful!');
    console.log(response.data);
  } catch (error) {
    // Handle errors
    alert(`Registration failed: ${error.response.data.error}`);
  }
}

// Function to handle user login
async function loginUser() {
  const loginUsername = document.getElementById('username').value;
  const loginPassword = document.getElementById('password').value;

  try {
    // Make a POST request using Axios
    const response = await axios.post('/login', { username: loginUsername, password: loginPassword });

    // Handle the response
    alert('Login successful!');
    console.log(response.data);
  } catch (error) {
    // Handle errors
    alert(`Login failed: ${error.response.data.error}`);
  }
}
