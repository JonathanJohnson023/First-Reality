export default class Character {
  constructor(job, ctx){
    this.level = 1;
    this.health = 100;
    this.job = job;
    this.KO = false;
    this.ctx = ctx
    this.frame = 0
  }

  draw(index, bool){
    console.log("char draw")
    let heightFloat = this.spriteHeight(index)
    if(bool){
      return this.walkForward(index)
    }else if(this.job === "knight"){
      return [0, 0, 48, 64, this.ctx.width * 0.85, this.ctx.height * heightFloat + this.ctx.height * 0.3]
    }else {
      return [0, 0, 64, 64, this.ctx.width * 0.85, this.ctx.height * heightFloat + this.ctx.height * 0.3]
    }
  }

  walkForward(index){
    let heightFloat = this.spriteHeight(index)
    if(this.job === "knight"){
      return [48, 0, 48, 64, this.ctx.width * 0.75, this.ctx.height * heightFloat + this.ctx.height * 0.3]
    }else {
      return [0, 0, 64* 2, 64, this.ctx.width * 0.75, this.ctx.height * heightFloat + this.ctx.height * 0.3]
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