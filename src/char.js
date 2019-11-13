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

  draw(index, bool){
    console.log("char draw")
    let heightFloat = this.spriteHeight(index)
    if(bool){
      return this.walkForward(index, heightFloat)
    }else {
      return [0, 0, 64, 64, this.ctx.width * 0.85, this.ctx.height * heightFloat + this.ctx.height * 0.3]
    }
  }

  walkForward(index, heightFloat){
    return [64, 0, 64, 64, this.ctx.width * 0.85 - parseInt(this.frame + "00"), this.ctx.height * heightFloat + this.ctx.height * 0.3]
  }

  attack(){

  }

  spriteHeight(int){
    let numFloat = int + int * 0.5
    let num = Number(numFloat.toString().replace('.',''))
    return parseFloat(`0.${num}`)
  }


}