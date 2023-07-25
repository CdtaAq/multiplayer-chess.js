// ... (previous code)

const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');
const rankingsSection = document.getElementById('rankings');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  // ... (previous code)

  try {
    // ... (previous code)

    if (response.ok) {
      const data = await response.json();
      message.innerText = data.message;

      // Show player rankings
      displayPlayerRankings();
    } else {
      // ... (previous code)
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

async function displayPlayerRankings() {
  try {
    const rankingsResponse = await fetch('/rankings');
    if (rankingsResponse.ok) {
      const rankingsData = await rankingsResponse.json();
      rankingsSection.innerHTML = '<h2>Player Rankings</h2>';
      rankingsData.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.innerText = `${index + 1}. ${player.username} (Rank: ${player.rank})`;
        rankingsSection.appendChild(playerDiv);
      });
    } else {
      console.error('Error fetching player rankings.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
