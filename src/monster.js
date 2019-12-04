export default class Monster {
  constructor(type, ctx, sprite, index){
    this.level = 1;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.KO = false;
    this.type = type;
    this.ctx = ctx;
    this.sprite = sprite;
    this.index = index;
    this.frame = 0;
    this.monsterHpUi = document.getElementById("enemies-ui").getContext("2d");
    this.monsterHpUi.font = "26px Final Fantasy";
    this.spriteHeight(index)
    this.canvasX = this.ctx.canvas.width / 8
    this.canvasY = this.ctx.canvas.height / this.heightFloat + this.ctx.canvas.height / 3 

  };


  draw(){
    
  }





  spriteHeight(int){
    let numFloat = int + int * 0.5
    let num = Number(numFloat.toString().replace('.',''))
    this.heightFloat = parseFloat(`0.${num}`)
  }

}



