export default class Character {
  constructor(job, ctx, sprite, index){
    this.level = 1;
    this.maxHealth = 100
    this.health = this.maxHealth;
    this.KO = false;
    this.job = job;
    this.ctx = ctx;
    this.sprite = sprite;
    this.index = index;
    this.frame = 0;
    this.forward = false;
    this.back = false;
    this.partyHpUi = document.getElementById("party-ui").getContext("2d");
    this.partyHpUi.font = "26px Final Fantasy";
    this.spriteHeight(index);
    this.canvasX = this.ctx.canvas.width * 0.85;
    this.canvasY = this.ctx.canvas.height * this.heightFloat + this.ctx.canvas.height * 0.3;

  }

  isOdd(n){
    return Math.abs(n % 2) == 1;
  }

  draw(callback){
    if(this.forward && this.frame <= 9){
      this.walkForward(callback);
    }else if(this.back && this.frame >= 1 ){
      this.walkBack();
    }else{
      this.ctx.drawImage(this.sprite, 0, 0, 64, 64, this.canvasX, this.canvasY , 125, 125 )
    }
    this.partyHpUi.clearRect(0, (this.index) * (this.partyHpUi.canvas.height / 4), this.partyHpUi.canvas.width, this.partyHpUi.canvas.height)
    this.partyHpUi.fillText(this.job, 25, (this.index + 1) * (this.partyHpUi.canvas.height / 4))
    this.partyHpUi.fillText(`${this.health} / ${this.maxHealth}`, this.partyHpUi.canvas.width - 125, (this.index + 1) * (this.partyHpUi.canvas.height / 4))

  }

  walkForward(callback){
    this.frame++
    if(this.isOdd(this.frame)){
      this.ctx.drawImage(this.sprite, 64, 0, 64, 64, this.canvasX -= parseInt(this.frame + "0"), this.canvasY , 125, 125 )
    }else if(this.frame <= 9){
      this.ctx.drawImage(this.sprite, 0, 0, 64, 64, this.canvasX -= parseInt(this.frame + "0"), this.canvasY , 125, 125 )
    }
    if (this.frame == 10){
        callback()
    }

  }

  walkBack(){
    this.frame--
      if(this.isOdd(this.frame)){
        this.ctx.drawImage(this.sprite, 64, 0, 64, 64, this.canvasX += parseInt(this.frame + "0"), this.canvasY , 125, 125 )
      }else if(this.frame >= 1){
        this.ctx.drawImage(this.sprite, 0, 0, 64, 64, this.canvasX += parseInt(this.frame + "0"), this.canvasY , 125, 125 )
      }
  }

  // walkingCaller(callback){ 
  //     if( this.frame < 10 ){
  //       this.walkForward(callback);
  //     }else if( this.frame > 0){
  //       this.walkBack(callback);
  //     }
  // }

  attack(monster){
    console.log(monster);
    monster.health -= 25;
  }

  spriteHeight(int){
    let numFloat = int + int * 0.5
    let num = Number(numFloat.toString().replace('.',''))
    this.heightFloat = parseFloat(`0.${num}`)
  }


}