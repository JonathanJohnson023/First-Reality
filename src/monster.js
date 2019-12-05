export default class Monster {
  constructor(ctx, index){
    this.level = 1;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.KO = false;
    // this.type = type;
    this.ctx = ctx;
    this.sprite = new Image();
      this.sprite.src = "Final_Fantasy_1_Enemies & Bosses.png"
    this.index = index;
    this.frame = 0;
    this.monsterHpUi = document.getElementById("enemies-ui").getContext("2d");
    this.monsterHpUi.font = "26px Final Fantasy";
    this.spriteHeight(index)
    this.canvasX = this.ctx.canvas.width / 8
    this.canvasY = this.ctx.canvas.height * this.heightFloat + this.ctx.canvas.height / 3.5 

    this.smallMonsters = [
      [0, 0, 36, 64]
    ]

    this.medMonsters = [

    ]

  };


  draw(){
    this.ctx.drawImage(this.sprite, ...this.smallMonsters[0], this.canvasX, this.canvasY, 125, 200)
    this.monsterHpUi.clearRect(0, (this.index) * (this.monsterHpUi.canvas.height / 4), this.monsterHpUi.canvas.width, this.monsterHpUi.canvas.height)
    this.monsterHpUi.fillText(`Monster ${this.index + 1}`, 25, (this.index + 1) * (this.monsterHpUi.canvas.height / 4))
    this.monsterHpUi.fillText(`${this.health} / ${this.maxHealth}`, this.monsterHpUi.canvas.width - 125, (this.index + 1) * (this.monsterHpUi.canvas.height / 4))
  }

  death(){
    
  }



  spriteHeight(int){
    let numFloat = int + int * 0.5
    let num = Number(numFloat.toString().replace('.',''))
    this.heightFloat = parseFloat(`0.${num}`)
  }

}



