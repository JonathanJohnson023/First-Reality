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
    if (monster.health <= 0) {
      console.log('Monster is already dead!');
      return;
    }
    
    const damage = Math.floor(Math.random() * 30) + 15; // 15-45 damage
    monster.health -= damage;
    
    if (monster.health <= 0) {
      monster.health = 0;
      monster.KO = true;
      console.log(`Monster defeated! Dealt ${damage} damage.`);
    } else {
      console.log(`Dealt ${damage} damage to monster. Monster health: ${monster.health}`);
    }
    
    // Add visual feedback
    this.showDamage(damage);
  }
  
  showDamage(damage) {
    // Create damage text element
    const damageText = document.createElement('div');
    damageText.textContent = `-${damage}`;
    damageText.style.position = 'absolute';
    damageText.style.color = '#ff4444';
    damageText.style.fontSize = '24px';
    damageText.style.fontWeight = 'bold';
    damageText.style.zIndex = '1000';
    damageText.style.pointerEvents = 'none';
    damageText.style.left = '50%';
    damageText.style.top = '30%';
    damageText.style.transform = 'translateX(-50%)';
    damageText.style.animation = 'damageFloat 1.5s ease-out forwards';
    
    document.body.appendChild(damageText);
    
    // Remove after animation
    setTimeout(() => {
      if (damageText.parentNode) {
        damageText.parentNode.removeChild(damageText);
      }
    }, 1500);
  }

  spriteHeight(int){
    let numFloat = int + int * 0.5
    let num = Number(numFloat.toString().replace('.',''))
    this.heightFloat = parseFloat(`0.${num}`)
  }


}