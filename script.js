document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('flashFile');
  const flashContainer = document.getElementById('flash-container');

  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Clear previous content
    flashContainer.innerHTML = '';

    // Create URL for the file
    const fileURL = URL.createObjectURL(file);

    // Create ruffle container
    const ruffleContainer = document.createElement('div');
    ruffleContainer.id = 'ruffle-container';
    flashContainer.appendChild(ruffleContainer);

    // Create ruffle player
    const ruffle = window.RufflePlayer.newest();
    const player = ruffle.createPlayer();
    player.id = 'player';
    ruffleContainer.appendChild(player);

    // Set up player configuration
    player.config = {
      autoplay: true,
      letterbox: 'on',
      unmuteOverlay: 'visible',
      backgroundColor: '#000000',
      wmode: 'direct',
      scale: 'showAll'
    };

    // Load the SWF
    player.load(fileURL).then(() => {
      // Go fullscreen on player click
      player.addEventListener('click', () => {
        if (player.requestFullscreen) {
          player.requestFullscreen();
        } else if (player.webkitRequestFullscreen) {
          player.webkitRequestFullscreen();
        } else if (player.msRequestFullscreen) {
          player.msRequestFullscreen();
        }
      });

      // Add fullscreen button
      const fullscreenBtn = document.createElement('button');
      fullscreenBtn.textContent = 'Fullscreen';
      fullscreenBtn.className = 'fullscreen-btn';
      fullscreenBtn.addEventListener('click', function() {
        if (player.requestFullscreen) {
          player.requestFullscreen();
        } else if (player.webkitRequestFullscreen) {
          player.webkitRequestFullscreen();
        } else if (player.msRequestFullscreen) {
          player.msRequestFullscreen();
        }
      });

      flashContainer.appendChild(fullscreenBtn);
    }).catch(error => {
      console.error("Error loading SWF:", error);
      flashContainer.innerHTML = `<p class="error">Error loading Flash file: ${error.message}</p>`;
    });
  });
});