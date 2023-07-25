const Chess = require('chess.js');

// ... (previous code)

// In-memory game state (for simplicity, use a proper database in production)
const games = {};

// Function to validate the move and update the game state
function validateMove(gameId, move) {
  const game = games[gameId];

  // Check if the move is legal using the chess.js library
  const chess = new Chess(game.fen);

  const sourceSquare = move.from;
  const targetSquare = move.to;
  const piece = chess.get(sourceSquare);

  // Check if the move is valid according to chess.js rules
  const moveObj = {
    from: sourceSquare,
    to: targetSquare,
    promotion: move.promotion, // Handle promotion based on player choice
  };

  const legalMove = chess.move(moveObj);

  if (legalMove) {
    // Check if the move results in checkmate or stalemate
    const isCheckmate = chess.in_checkmate();
    const isStalemate = chess.in_stalemate();

    if (isCheckmate || isStalemate) {
      // Emit the game over event and notify all clients
      io.emit('gameOver', {
        gameId,
        result: isCheckmate ? 'checkmate' : 'stalemate',
      });

      // Remove the game from the list of active games
      delete games[gameId];
    } else {
      // Update the game state with the new move
      game.fen = chess.fen();
      io.emit('updateGameState', game);
    }

    return true;
  } else {
    return false;
  }
}

// ... (previous code)

// Socket.io connection and event handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle move events sent by clients
  socket.on('makeMove', (moveData) => {
    const gameId = moveData.gameId;
    const move = {
      from: moveData.from,
      to: moveData.to,
      promotion: moveData.promotion, // Handle promotion based on player choice
    };

    // Validate the move on the server-side and update the game state
    const isValidMove = validateMove(gameId, move);
    if (!isValidMove) {
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
