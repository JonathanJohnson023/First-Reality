import Sprite from "./char"
export default class Game {
  constructor(ctx){
    this.party = []
    this.enemies = [];
    this.wave = 0;
    this.currentChar = null;
    this.ctx = ctx;
    
    this.draw = this.draw.bind(this);
  }


  draw(ctx){
    this.drawBackground(ctx);
    this.drawSprites(ctx);
    document.body.addEventListener("animationend" , () => {
      document.body.style.backgroundColor = "black";
    })
  }

  start(){
    console.log("hello from game")
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
    let current = this.currentChar
    this.party.forEach((obj, index) => {

      let sprite = new Image();
      sprite.src = `../assets/images/image${index}.png`;
      let cord = current === index ? obj.draw(index, true) : obj.draw(index);
      ctx.drawImage(sprite, ...cord , 125, 125 )
    })
  }

  addEnemy(){

  }

  


}