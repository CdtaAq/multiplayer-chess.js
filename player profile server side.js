// ... (previous code)

// Endpoint to fetch player profile data
app.get('/profile', (req, res) => {
  // Extract the user ID from the access token
  const userId = getUserIdFromToken(req.headers.authorization);

  // Use the user ID to fetch the player's data from the database
  // For example, if using MongoDB with Mongoose:
  Player.findOne({ _id: userId })
    .then(player => {
      if (!player) {
        return res.status(404).json({ error: 'Player not found' });
      }

      // Calculate the win/loss ratio based on the player's data
      const winLossRatio = player.wins / (player.wins + player.losses);

      // Return the player's data to the client
      res.json({
        username: player.username,
        rank: player.rank,
        wins: player.wins,
        losses: player.losses,
        winLossRatio: winLossRatio.toFixed(2) // Format the ratio to two decimal places
        // Add more statistics as needed
      });
    })
    .catch(error => {
      console.error('Error fetching player profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// ... (previous code)
