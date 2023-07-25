// Connect to the WebSocket server
const socket = io();

// Chessboard configuration (using Chessboard.js)
const cfg = {
  draggable: true,
  position: 'start',
  onDrop: handleMove, // Function to handle the player's move
};

// Create the chessboard
const board = Chessboard('chessboard', cfg);

// Function to handle the player's move
function handleMove(source, target) {
  const move = {
    from: source,
    to: target,
  };

  // Send the move to the server
  socket.emit('makeMove', move);
}

// Function to update the chessboard with the new game state
function updateChessboard(newState) {
  board.position(newState);
}

// Function to display notifications to the user
function displayNotification(message) {
  const notificationsElement = document.getElementById('notifications');
  notificationsElement.innerText = message;
}

// Receive updated game state from the server and update the board
socket.on('updateGameState', (updatedGameState) => {
  updateChessboard(updatedGameState.board);
  displayNotification(updatedGameState.message);
});

// ... (Other event handling and game logic)

