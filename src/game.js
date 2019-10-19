import Sprite from "./char"
export default class Game {
  constructor(ctx){
    this.party = []
    this.enemies = [];
    this.wave = 0;
    this.ctx = ctx;
    
    this.draw = this.draw.bind(this);
  }


  draw(ctx){
    console.log("it be a drawing")
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ctx.width, ctx.height);
    this.drawSprites(ctx)
  }

  start(){
    console.log("hello from game")
    const knight = new Sprite("knight", this.ctx);
    const cleric = new Sprite("cleric", this.ctx);
    const archer = new Sprite("archer", this.ctx);
    const wizard = new Sprite("wizard", this.ctx);
    this.party.push(knight, cleric, archer, wizard);
  }

  drawSprites(ctx){
    this.party.forEach((obj, index) => {
      let sprite = new Image();
      sprite.src = `../assets/images/image${index}.png`;
      let cord = obj.draw(index);
      ctx.drawImage(sprite, ...cord , 100, 100 )
    })
  }

  addEnemy(){

  }

  


}