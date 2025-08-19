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
    // Only draw if alive
    if (!this.KO && this.health > 0) {
      this.ctx.drawImage(this.sprite, ...this.smallMonsters[0], this.canvasX, this.canvasY, 125, 200);
    } else {
      // Draw grayed out or don't draw at all
      this.ctx.save();
      this.ctx.globalAlpha = 0.3;
      this.ctx.drawImage(this.sprite, ...this.smallMonsters[0], this.canvasX, this.canvasY, 125, 200);
      this.ctx.restore();
    }
    
    this.monsterHpUi.clearRect(0, (this.index) * (this.monsterHpUi.canvas.height / 4), this.monsterHpUi.canvas.width, this.monsterHpUi.canvas.height);
    
    // Color code the health text
    const healthPercent = this.health / this.maxHealth;
    if (healthPercent > 0.6) {
      this.monsterHpUi.fillStyle = '#00ff00'; // Green
    } else if (healthPercent > 0.3) {
      this.monsterHpUi.fillStyle = '#ffff00'; // Yellow
    } else {
      this.monsterHpUi.fillStyle = '#ff0000'; // Red
    }
    
    this.monsterHpUi.fillText(`Monster ${this.index + 1}`, 25, (this.index + 1) * (this.monsterHpUi.canvas.height / 4));
    this.monsterHpUi.fillText(`${this.health} / ${this.maxHealth}`, this.monsterHpUi.canvas.width - 125, (this.index + 1) * (this.monsterHpUi.canvas.height / 4));
    
    // Reset color
    this.monsterHpUi.fillStyle = '#ffffff';
  }

  death(){
    this.KO = true;
    this.health = 0;
    // Add death animation or effects here
    console.log(`Monster ${this.index + 1} has been defeated!`);
  }
  
  attack(target) {
    if (this.KO || this.health <= 0) {
      return;
    }
    
    const damage = Math.floor(Math.random() * 20) + 10; // 10-30 damage
    target.health -= damage;
    
    if (target.health <= 0) {
      target.health = 0;
      target.KO = true;
      console.log(`${target.job} has been defeated! Monster dealt ${damage} damage.`);
    } else {
      console.log(`Monster dealt ${damage} damage to ${target.job}. ${target.job} health: ${target.health}`);
    }
    
    return damage;
  }
  
  isAlive() {
    return !this.KO && this.health > 0;
  }



  spriteHeight(int){
    let numFloat = int + int * 0.5
    let num = Number(numFloat.toString().replace('.',''))
    this.heightFloat = parseFloat(`0.${num}`)
  }

}



