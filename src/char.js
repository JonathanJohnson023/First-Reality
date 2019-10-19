export default class Character {
  constructor(job, ctx){
    this.level = 1;
    this.health = 100;
    this.job = job;
    this.KO = false;
    this.ctx = ctx
  }

  draw(index){
    console.log("char draw")
    if(this.job === "knight"){
      return [0, 0, 48, 64, this.ctx.width * 0.85, index * 200 + 100]
    }else if(this.job === "cleric"){
      return [0, 0, 47, 64, this.ctx.width * 0.85, index * 200 + 100]
    }else if(this.job === "archer"){
      return [0, 0, 64, 64, this.ctx.width * 0.85, index * 200 + 100]
    }else if(this.job === "wizard"){
      return [0, 0, 42, 64, this.ctx.width * 0.85, index * 200 + 100]
    }
  }

  walkForward(){

  }

  attack(){

  }


}