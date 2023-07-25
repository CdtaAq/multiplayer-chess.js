// ... (previous code)

// Function to send a chat message
function sendChatMessage(message) {
  const chatMessage = {
    gameId: currentGameId,
    sender: playerColor, // Assuming you have a variable for playerColor ('white' or 'black')
    message: message,
  };
  socket.emit('chatMessage', chatMessage);
}

// Function to display a chat message
function displayChatMessage(message) {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  chatBox.appendChild(messageElement);
}

// Event listener for the chat input form
document.getElementById('chat-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (message) {
    sendChatMessage(message);
    input.value = '';
  }
});

// ... (previous code)

// Receive chat messages from the server and display them in the chat box
socket.on('chatMessage', (messageData) => {
  const { sender, message } = messageData;
  const senderLabel = sender === 'white' ? 'White' : 'Black';
  const formattedMessage = `${senderLabel}: ${message}`;
  displayChatMessage(formattedMessage);
});

// ... (other code)
