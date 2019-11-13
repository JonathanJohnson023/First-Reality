import Sprite from "./char"
export default class Game {
  constructor(ctx){
    this.party = []
    this.enemies = [];
    this.wave = 0;
    this.currentChar = 0;
    this.ctx = ctx;
    this.frame = 0
    this.draw = this.draw.bind(this);
    this.aniDone = false
  }

  draw(ctx){
    this.drawSprites(ctx);
    document.body.addEventListener("animationend" , () => {
      console.log("why you no animation")
      document.body.style.backgroundColor = "black";
      this.aniDone = true
    })
  }

  start(){
    const knight = new Sprite("knight", this.ctx);
    const cleric = new Sprite("cleric", this.ctx);
    const archer = new Sprite("archer", this.ctx);
    const wizard = new Sprite("wizard", this.ctx);
    this.party.push(knight, cleric, archer, wizard);
  } 
  
  drawBackground(ctx){
    const background = new Image()
      background.src = "battle_backgrounds.png"
    ctx.drawImage(background, 522, 5, 270, 155, 0, 0, ctx.width, ctx.height)

  }

  drawSprites(ctx){
    this.drawBackground(ctx);
    let current = this.currentChar
    this.party.forEach((obj, index) => {

      let sprite = new Image();
      sprite.src = `image${index}.png`;
      current === index ? obj.walkForward(ctx, sprite, index, this.frame) : obj.draw(ctx, sprite, index);
      // ctx.drawImage(sprite, ...cord , 125, 125 )
    })
  }

  addEnemy(){

  }

  


}