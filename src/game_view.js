
export default class GameRouter {
  constructor(menu,game,tutorial){  
    this.menu = menu;
    this.game = game;
    this.tutorial = tutorial;
  }


  start(){
    const menu = document.getElementById("menu")
    menu.addEventListener('mouseover', this.menu.selectMouseOver)
    menu.addEventListener('click', (e) => { this.selectEventCallback(e) })

    document.addEventListener('keydown', (e) => { this.selectEventCallback(e) })
  }

  selectEventCallback(e){
    if(e.keyCode == 13 && !menu.classList.contains("none")){
      this.select(this.menu.keyPressed(e))
    }else if(e.type == "click"){
      this.select(this.menu.selectMouseClick(e))
    }else{
      return this.menu.keyPressed(e)
    }
  }

  select(selection){
    if (selection.innerText === "Start Game" ) {
      this.game.start()

    }else if(selection.innerText === "How To Play"){ 
      this.tutorial.start()
    }

  }


}