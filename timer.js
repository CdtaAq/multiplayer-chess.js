// ... (previous code)

let playerTimer; // Timer for the current player
let playerTime = 600; // Time in seconds (10 minutes) - customize as needed

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
    }
  }, 1000); // Decrease time every second
}

function stopPlayerTimer() {
  clearInterval(playerTimer);
}

// ... (previous code)

// Call startPlayerTimer() when it's the current player's turn to move

// Call stopPlayerTimer() when the player makes a move or it's the other player's turn

