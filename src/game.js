export default class Game {
  constructor(ctx){
    this.party = [{},{},{},{}]
    this.enemies = []
    this.wave = 0
    this.ctx = ctx
    
    this.draw = this.draw.bind(this);
  }


  draw(ctx){
    console.log("it be a drawing")
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ctx.width, ctx.height);

  }

  start(){
    console.log("hello from game")
  }

  drawSprites(){

  }

  addEnemy(){

  }

  


}