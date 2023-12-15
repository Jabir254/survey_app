function signUp() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Handle success, e.g., redirect to another page
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error, e.g., display an error message to the user
      });
  }

  function login() {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username:loginUsername,
        password: loginPassword,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Handle success, e.g., set user authentication token
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error, e.g., display an error message to the user
      });
  }