const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const formData = new FormData(loginForm);
  const username = formData.get('username');
  const password = formData.get('password');

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      message.innerText = data.message;
      // You can now handle the successful login response (e.g., store user data in local storage and redirect to a new page).
    } else {
      const errorData = await response.json();
      message.innerText = errorData.error;
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
