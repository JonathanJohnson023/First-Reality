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
    this.frame = 0
    this.draw = this.draw.bind(this);
    this.aniDone = false
  }

  draw(){
    this.currentChar = this.party[this.currentCharIndex]
    this.ctx.width  = window.innerWidth;
    this.ctx.height = window.innerHeight;
    this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height);
    this.drawSprites();
    document.body.addEventListener("animationend" , () => {
      console.log("why you no animation")
      document.body.style.backgroundColor = "black";
      this.aniDone = true
    })
  }

  start(ctx){
    this.ctx = ctx
    const knight = new Sprite("knight", this.ctx, null, 0);
    const cleric = new Sprite("cleric", this.ctx, null, 1);
    const archer = new Sprite("archer", this.ctx, null, 2);
    const wizard = new Sprite("wizard", this.ctx, null, 3);
    this.party.push(knight, cleric, archer, wizard);
  } 
  
  drawBackground(){
    const background = new Image()
      background.src = "battle_backgrounds.png"
    this.ctx.drawImage(background, 522, 5, 270, 155, 0, 0, this.ctx.width, this.ctx.height)
  }

  drawSprites(){
    this.drawBackground();
    let current = this.currentCharIndex;
    this.party.forEach((obj, index) => {

      let sprite = new Image();
      sprite.src = `image${index}.png`;
      obj.sprite = sprite;
      obj.index = index;
      current === index ? obj.walkForward(this.frame) : obj.draw(this.ctx);
    })
  }

  // onSelect(){
  //   this.currentChar.walkBack();
  //   this.currentCharIndex++
  // }

  addEnemy(){

  }

  


}