import Menu from "./menu";
import Game from "./game"
import Instructions from "./tutorial"
import GameView from "./game_view"
import SaveSystem from "./save_system"
import SoundSystem from "./sound_system"
import CharacterProgression from "./character_progression"


document.addEventListener("DOMContentLoaded", () => {
  // Initialize core systems
  const saveSystem = new SaveSystem();
  const soundSystem = new SoundSystem();
  const progression = new CharacterProgression();
  
  // Initialize UI components
  const menuClass = new Menu('#menu li', "menu");
  const tutorial = new Instructions;
  const canvas = document.getElementById("battle-view");
  const enemiesUi = document.getElementById("enemies-ui");
  const partyUi = document.getElementById("party-ui");
  
  // Setup canvas dimensions
  canvas.width  = window.innerWidth * 0.85;
  canvas.height = window.innerHeight * 0.80;
  enemiesUi.width  = (canvas.width - 50) * 0.3;
  enemiesUi.height = window.innerHeight - canvas.height - 50;
  partyUi.width  = (canvas.width - 50) * 0.3;
  partyUi.height = window.innerHeight - canvas.height - 50;
  
  // Initialize game with enhanced systems
  const theGame = new Game(canvas, {
    saveSystem,
    soundSystem,
    progression
  });
  
  const gameRouter = new GameView(menuClass, theGame, tutorial, canvas, enemiesUi, partyUi, {
    saveSystem,
    soundSystem,
    progression
  })

  let i = 0
  let titleScreenBool = true
  menuClass.selection(0);

  if(titleScreenBool){
    let titleScreen = document.getElementById("press-start")
    titleScreen.addEventListener("animationend", function(){
      console.log("remounted")
      titleScreenBool = false
      document.body.addEventListener('keydown', function(e){
        if(e.keyCode == 13){
          titleScreen.classList.remove("title-screen-appearing");
          menuClass.cursorSelect.play()
          titleScreen.classList.add("title-screen-disappear");
        }
      })
    })
    titleScreen.addEventListener("animationend", function(){
      i += 1
      if(i === 1){ return }
      document.getElementById("title-screen-controller").classList.add("none");
      gameRouter.start()
      document.getElementById("title-screen-menu").classList.remove("none");
      let titleMusic = document.getElementById("title-audio")
      titleMusic.volume = 0.3
      titleMusic.play();
    })
  }

});