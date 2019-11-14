export default class Character {
  constructor(job, ctx, sprite, index){
    this.level = 1;
    this.health = 100;
    this.KO = false;
    this.job = job;
    this.ctx = ctx
    this.sprite = sprite;
    this.index = index;
    this.frame = 0;

    this.spriteHeight(index)
  }

  isOdd(n){
    return Math.abs(n % 2) == 1;
  }

  draw(){
    this.ctx.drawImage(this.sprite, 0, 0, 64, 64, this.ctx.canvas.width * 0.85, this.ctx.canvas.height * this.heightFloat + this.ctx.canvas.height * 0.3 , 125, 125 )
  }

  walkForward(frame){
    this.frame = frame
    if(this.frame >= 10) this.frame = 10
    if(this.isOdd(this.frame)){
      this.ctx.drawImage(this.sprite, 64, 0, 64, 64, this.ctx.canvas.width * 0.85 - parseInt(this.frame + "0"), this.ctx.canvas.height * this.heightFloat + this.ctx.canvas.height * 0.3 , 125, 125 )
    }else{
      this.ctx.drawImage(this.sprite, 0, 0, 64, 64, this.ctx.canvas.width * 0.85 - parseInt(this.frame + "0"), this.ctx.canvas.height * this.heightFloat + this.ctx.canvas.height * 0.3 , 125, 125 )
    }
  }

  // walkBack(){
  //   while(this.frame > 0){
  //     if(this.isOdd(frame)){
  //       this.ctx.drawImage(this.sprite, 64, 0, 64, 64, this.ctx.width * 0.85 + parseInt(frame + "0"), this.ctx.height * this.heightFloat + this.ctx.height * 0.3 , 125, 125 )
  //     }else{
  //       this.ctx.drawImage(this.sprite, 0, 0, 64, 64, this.ctx.width * 0.85 + parseInt(frame + "0"), this.ctx.height * this.heightFloat + this.ctx.height * 0.3 , 125, 125 )
  //     }
  //   }
  // }

  attack(){

  }

  spriteHeight(int){
    let numFloat = int + int * 0.5
    let num = Number(numFloat.toString().replace('.',''))
    this.heightFloat = parseFloat(`0.${num}`)
  }


}