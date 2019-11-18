import Sprite from "./char"
import Menu from "./menu"
export default class Game {
  constructor(ctx){
    this.party = []
    this.enemies = [];
    this.wave = 0;
    this.currentChar = null;
    this.currentCharIndex = 0;
    this.ctx = ctx;
    this.frame = 0;
    this.aniDone = false;
    this.partyMenu = new Menu("#party-moves li", "party-moves");

    this.draw = this.draw.bind(this);
    this.charIndexIncrease = this.charIndexIncrease.bind(this);
  }

  draw(){
    this.currentChar = this.party[this.currentCharIndex]
    this.ctx.width  = window.innerWidth;
    this.ctx.height = window.innerHeight;
    this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height);
    
    this.drawBackground();
    this.addSprites();
    
    document.body.addEventListener("animationend" , () => {
      console.log("why you no animation")
      document.body.style.backgroundColor = "black";
      this.aniDone = true;
      this.currentChar.forward = true;
    })
  }

  start(titleMenu){
    const knight = new Sprite("Knight", this.ctx, null, 0);
    const cleric = new Sprite("Cleric", this.ctx, null, 1);
    const archer = new Sprite("Archer", this.ctx, null, 2);
    const wizard = new Sprite("Wizard", this.ctx, null, 3);
    this.party.push(knight, cleric, archer, wizard);
    // document.removeEventListener("keydown")
    const menu = document.getElementById("party-moves");
    menu.addEventListener('mouseover', this.partyMenu.selectMouseOver);
    menu.addEventListener('click', (e) => { this.partySelectEventCallback(e) });
    document.addEventListener('keydown', (e) => { this.partySelectEventCallback(e) });
  } 

  partySelectEventCallback(e){
    const menu = document.getElementById("party-moves")
    if(e.keyCode == 13 && !menu.classList.contains("none")){
      this.onSelect(this.partyMenu.keyPressed(e));
    }else if(e.type == "click"){
      this.onSelect(this.partyMenu.selectMouseClick(e));
    }else{
      return this.partyMenu.keyPressed(e)
    }
  }


  
  drawBackground(){
    const background = new Image()
      background.src = "battle_backgrounds.png"
    this.ctx.drawImage(background, 522, 5, 270, 155, 0, 0, this.ctx.width, this.ctx.height)
  }

  addSprites(){
    this.party.forEach((obj, index) => {
      let sprite = new Image();
        sprite.src = `image${index}.png`;
      obj.sprite = sprite;
      obj.index = index;

      obj.draw(this.charIndexIncrease);
    })
  }

  onSelect(selection){
    debugger 
    this.currentChar.back = false;
    this.currentChar.forward = true;
    if(this.currentCharIndex > 0){
      this.party[this.currentCharIndex - 1].back = true
      this.party[this.currentCharIndex - 1].forward = false;
    } else{
      this.party[3].back = true;
      this.party[3].forward = false;
    }
  }

  addEnemy(){

  }

  charIndexIncrease(){
    this.currentCharIndex >= 3 ? this.currentCharIndex = 0 : this.currentCharIndex++
  }
  


}