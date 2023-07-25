// ... (previous code)

// Function to update the chessboard with the new game state
function updateChessboard(newState) {
  board.position(newState.fen);
}

// Receive updated game state from the server and update the board
socket.on('updateGameState', (updatedGameState) => {
  updateChessboard(updatedGameState);
});

// Receive move error from the server and display it as a notification
socket.on('moveError', (error) => {
  displayNotification(error);
});

// ... (Other event handling and game logic)

