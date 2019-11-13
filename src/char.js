export default class Character {
  constructor(job, ctx, frame){
    this.level = 1;
    this.health = 100;
    this.job = job;
    this.KO = false;
    this.ctx = ctx
    this.charX = 0
    this.frame = 0
    this.frameCount = 10
  }

  isOdd(n){
    return Math.abs(n % 2) == 1;
  }

  draw(ctx, sprite, index){
    console.log("char draw")
    let heightFloat = this.spriteHeight(index)
      ctx.drawImage(sprite, 0, 0, 64, 64, this.ctx.width * 0.85, this.ctx.height * heightFloat + this.ctx.height * 0.3 , 125, 125 )
  }

  walkForward(ctx, sprite, index, frame){
    let heightFloat = this.spriteHeight(index)
    if(frame >= 20) frame = 20
    if(this.isOdd(frame)){
      ctx.drawImage(sprite, 64, 0, 64, 64, this.ctx.width * 0.85 - parseInt(frame + "0"), this.ctx.height * heightFloat + this.ctx.height * 0.3 , 125, 125 )
    }else{
      ctx.drawImage(sprite, 0, 0, 64, 64, this.ctx.width * 0.85 - parseInt(frame + "0"), this.ctx.height * heightFloat + this.ctx.height * 0.3 , 125, 125 )
    }
  }

  attack(){

  }

  spriteHeight(int){
    let numFloat = int + int * 0.5
    let num = Number(numFloat.toString().replace('.',''))
    return parseFloat(`0.${num}`)
  }


}