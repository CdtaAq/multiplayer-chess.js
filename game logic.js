const Chess = require('chess.js');

// ... (previous code)

// In-memory game state (for simplicity, use a proper database in production)
const games = {};

// Function to validate the move and update the game state
function validateMove(gameId, move) {
  const game = games[gameId];

  // Check if the move is legal using the chess.js library
  const chess = new Chess();
  chess.load_pgn(game.pgn);

  const sourceSquare = move.from;
  const targetSquare = move.to;

  const moveObj = {
    from: sourceSquare,
    to: targetSquare,
    promotion: 'q', // Default promotion to queen for simplicity (you can handle promotion based on player choice)
  };

  const legalMove = chess.move(moveObj);

  if (legalMove) {
    // Update the game state with the new move
    game.pgn = chess.pgn();
    return true;
  } else {
    return false;
  }
}

// Socket.io connection and event handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle move events sent by clients
  socket.on('makeMove', (moveData) => {
    const gameId = moveData.gameId;
    const move = {
      from: moveData.from,
      to: moveData.to,
    };

    // Validate the move on the server-side and update the game state
    const isValidMove = validateMove(gameId, move);
    if (isValidMove) {
      // Emit the updated game state to all clients
      io.emit('updateGameState', games[gameId]);
    } else {
      // Send an error message back to the client
      socket.emit('moveError', 'Invalid move');
    }
  });

  // ... (Other event handling and game logic)

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    // Perform any necessary clean-up operations for the disconnected user
  });
});
