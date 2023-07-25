// ... (previous code)

// Function to handle the player's move
function handleMove(source, target) {
  const move = {
    from: source,
    to: target,
  };

  // Send the move to the server
  socket.emit('makeMove', move);
}

// ... (other code)

