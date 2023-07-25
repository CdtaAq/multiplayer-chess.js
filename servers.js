const Chess = require('chess.js');

// ... (previous code)

// Function to handle move events and update the game state
function handleMove(gameId, move) {
  const game = games[gameId];
  const chess = new Chess(game.fen);

  // Check if the move is valid using chess.js library
  // ... (validation code from previous examples)

  // Update the game state with the new move
  game.fen = chess.fen();
  // ... (other updates, e.g., time control handling)

  // Check for checkmate or stalemate
  if (chess.in_checkmate()) {
    game.result = chess.turn() === 'w' ? 'black_win' : 'white_win';
  } else if (chess.in_stalemate()) {
    game.result = 'draw';
  }

  // Emit the updated game state to all clients in the game room
  io.to(gameId).emit('updateGameState', game);

  return game;
}

// ... (previous code)

// Socket.io connection and event handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle join game events sent by clients
  socket.on('joinGame', (gameId) => {
    if (games[gameId]) {
      // Add the player to the game based on the gameId
      // ... (code to assign players to the game)
      // For example, if player 1 is joining:
      games[gameId].player1 = socket.id;
      socket.join(gameId); // Join the game room with the gameId
      socket.emit('joinedGame', gameId);

      // Load the game state and emit it to the player
      socket.emit('updateGameState', games[gameId]);

      // ... (start timers and game logic)
    } else {
      // Game not found
      socket.emit('joinError', 'Game not found');
    }
  });

  // Handle move events sent by clients
  socket.on('makeMove', (moveData) => {
    const gameId = moveData.gameId;
    const move = {
      from: moveData.from,
      to: moveData.to,
      promotion: moveData.promotion,
    };

    // Validate the move on the server-side and update the game state
    const updatedGame = handleMove(gameId, move);

    // Check for game over conditions and notify players
    if (updatedGame.result) {
      io.to(gameId).emit('gameOver', { gameId, result: updatedGame.result });
      delete games[gameId]; // Remove the game from the active games
    }
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    // Clean up the game state and room if necessary
    for (const gameId in games) {
      const game = games[gameId];
      if (game.player1 === socket.id || game.player2 === socket.id) {
        delete games[gameId]; // Remove the game from the active games
        io.to(gameId).emit('opponentDisconnected'); // Notify the opponent
        break;
      }
    }
  });
});
