// ... (previous code)

let playerTimer; // Timer for the current player
let playerTime = 600; // Time in seconds (10 minutes) - customize as needed

// Function to start the player's timer
function startPlayerTimer() {
  playerTimer = setInterval(() => {
    playerTime--; // Decrease the time remaining for the current player

    // Update the time display on the UI
    const minutes = Math.floor(playerTime / 60);
    const seconds = playerTime % 60;
    document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (playerTime <= 0) {
      // Player ran out of time, handle the game-over scenario here
      // You can emit an event to the server to handle this
      stopPlayerTimer(); // Stop the timer
    }
  }, 1000); // Decrease time every second
}

// Function to stop the player's timer
function stopPlayerTimer() {
  clearInterval(playerTimer);
}

// Call startPlayerTimer() when it's the current player's turn to move

// Call stopPlayerTimer() when the player makes a move or it's the other player's turn

// ... (previous code)

// Handle game over event
socket.on('gameOver', (gameOverData) => {
  const { gameId, result } = gameOverData;
  if (gameId === currentGameId) {
    // Display a game over message to the players
    displayNotification(`Game Over: ${result}`);
    stopPlayerTimer(); // Stop the timer
  }
});

// Handle opponent disconnected event
socket.on('opponentDisconnected', () => {
  displayNotification('Your opponent has disconnected. You win!');
  stopPlayerTimer(); // Stop the timer
});

// ... (other code)
