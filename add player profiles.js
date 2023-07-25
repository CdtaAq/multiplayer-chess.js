// Fetch the player's profile data from the server
fetch('/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}` // Assuming you have an access token after login
  }
})
.then(response => response.json())
.then(data => {
  // Update the profile page with the fetched data
  document.getElementById('username').innerText = data.username;
  document.getElementById('rank').innerText = data.rank;
  document.getElementById('winLossRatio').innerText = `${data.wins}/${data.losses}`;
})
.catch(error => {
  console.error('Error fetching player profile:', error);
});
