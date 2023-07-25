const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// In-memory user data (for simplicity, use a proper database in production)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

app.use(bodyParser.json());

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ message: 'Login successful!', user });
  } else {
    res.status(401).json({ error: 'Invalid username or password.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
