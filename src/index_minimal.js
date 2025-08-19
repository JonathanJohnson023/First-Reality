import Menu from "./menu";
import Game from "./game"
import Instructions from "./tutorial"
import GameView from "./game_view"

document.addEventListener("DOMContentLoaded", () => {
  const menuClass = new Menu('#menu li', "menu");
  const tutorial = new Instructions;
  const canvas = document.getElementById("battle-view");
  const enemiesUi = document.getElementById("enemies-ui");
  const partyUi = document.getElementById("party-ui");
  const theGame = new Game(canvas);
  canvas.width  = window.innerWidth * 0.85;
  canvas.height = window.innerHeight * 0.80;
  enemiesUi.width  = (canvas.width - 50) * 0.3;
  enemiesUi.height = window.innerHeight - canvas.height - 50;
  partyUi.width  = (canvas.width - 50) * 0.3;
  partyUi.height = window.innerHeight - canvas.height - 50;
  const gameRouter = new GameView(menuClass, theGame, tutorial, canvas, enemiesUi, partyUi);

  // Initialize volume controls immediately
  initVolumeControls();
  
  // Add strobe effect
  addStrobeEffect();

  let i = 0;
  let titleScreenBool = true;
  menuClass.selection(0);

  if(titleScreenBool){
    let titleScreen = document.getElementById("press-start");
    titleScreen.addEventListener("animationend", function(){
      console.log("remounted");
      titleScreenBool = false;
      document.body.addEventListener('keydown', function(e){
        if(e.keyCode == 13){
          titleScreen.classList.remove("title-screen-appearing");
          menuClass.cursorSelect.play();
          titleScreen.classList.add("title-screen-disappear");
        }
      });
    });
    
    titleScreen.addEventListener("animationend", function(){
      i += 1;
      if(i === 1){ return; }
      document.getElementById("title-screen-controller").classList.add("none");
      gameRouter.start();
      document.getElementById("title-screen-menu").classList.remove("none");
      let titleMusic = document.getElementById("title-audio");
      titleMusic.volume = 0.3;
      // Auto-mute: don't auto-play
      // titleMusic.play();
    });
  }
});

// Volume controls - appear immediately
function initVolumeControls() {
  setTimeout(() => {
    const titleAudio = document.getElementById('title-audio');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeDisplay = document.getElementById('volume-display');
    const muteToggle = document.getElementById('mute-toggle');
    
    if (!volumeSlider || !volumeDisplay || !muteToggle || !titleAudio) {
      return;
    }
    
    let isMuted = true;
    titleAudio.muted = isMuted;
    
    function updateVolumeDisplay() {
      const volume = Math.round(titleAudio.volume * 100);
      volumeDisplay.textContent = volume + '%';
      volumeSlider.value = volume;
    }
    
    volumeSlider.addEventListener('input', (e) => {
      const volume = e.target.value / 100;
      titleAudio.volume = volume;
      updateVolumeDisplay();
      
      if (volume > 0 && isMuted) {
        isMuted = false;
        titleAudio.muted = false;
        muteToggle.textContent = '🔊';
      }
    });
    
    muteToggle.addEventListener('click', () => {
      isMuted = !isMuted;
      titleAudio.muted = isMuted;
      muteToggle.textContent = isMuted ? '🔇' : '🔊';
      
      if (!isMuted && titleAudio.paused) {
        titleAudio.play().catch(e => console.log('Audio play failed:', e));
      }
    });
    
    updateVolumeDisplay();
    muteToggle.textContent = isMuted ? '🔇' : '🔊';
  }, 100);
}

// Add strobe effect to press enter
function addStrobeEffect() {
  setTimeout(() => {
    const pressEnterElement = document.querySelector('#press-start h1');
    if (pressEnterElement) {
      pressEnterElement.style.animation = 'pressEnterStrobe 1.5s infinite';
    }
  }, 100);
}