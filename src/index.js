import Menu from "./menu";
import Game from "./game"
import Instructions from "./tutorial"
import GameView from "./game_view"


document.addEventListener("DOMContentLoaded", () => {
  const menuClass = new Menu('#menu li')
  const tutorial = new Instructions
  const canvas = document.getElementById("battle-view");
  const menuUI = document.getElementById("party-moves")
  const theGame = new Game(canvas)
  canvas.width  = window.innerWidth * 0.85;
  canvas.height = window.innerHeight * 0.80;
  // menuUI.width  = canvas.width - 50;
  // menuUI.height = window.innerHeight - canvas.height - 50;
  const gameRouter = new GameView(menuClass, theGame, tutorial, canvas, menuUI)

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