import Sprite from "./char"
import Monster from "./monster"
import Menu from "./menu"
export default class Game {
  constructor(ctx){
    this.party = [];
    this.enemies = [];
    this.wave = 0;
    this.currentChar = null;
    this.currentCharIndex = 0;
    this.ctx = ctx;
    this.frame = 0;
    this.aniDone = false;
    this.partyMenu = new Menu("#party-moves li", "party-moves");
    this.wave = 0;
    this.battleState = 'player-turn'; // 'player-turn', 'enemy-turn', 'victory', 'defeat'
    this.turnQueue = [];
    this.currentTurn = 0;
    this.actionInProgress = false;

    this.draw = this.draw.bind(this);
    this.charIndexIncrease = this.charIndexIncrease.bind(this);
  }

  draw(){
    this.currentChar = this.party[this.currentCharIndex]
    this.ctx.width  = window.innerWidth;
    this.ctx.height = window.innerHeight;
    this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height);
    
    this.drawBackground();
    this.addSprites();
    this.drawMonsters();
    document.body.addEventListener("animationend" , () => {
      document.body.style.backgroundColor = "black";
      this.aniDone = true;
       if(this.currentChar) this.currentChar.forward = true;
    })
  }

  start(titleMenu){
    const knight = new Sprite("Knight", this.ctx, null, 0);
    const cleric = new Sprite("Cleric", this.ctx, null, 1);
    const archer = new Sprite("Archer", this.ctx, null, 2);
    const wizard = new Sprite("Wizard", this.ctx, null, 3);
    this.party.push(knight, cleric, archer, wizard);
    this.addEnemy()
    // this.createMonsters();
    // document.removeEventListener("keydown")
    const menu = document.getElementById("party-moves");
    menu.addEventListener('mouseover', this.partyMenu.selectMouseOver);
    menu.addEventListener('click', (e) => { this.partySelectEventCallback(e) });
    document.addEventListener('keydown', (e) => { this.partySelectEventCallback(e) });
    this.partyMenu.selection(0);

  }

  partySelectEventCallback(e){
    const menu = document.getElementById("party-moves");
    if(e.keyCode == 13 && !menu.classList.contains("none")){
      this.onSelect(this.partyMenu.keyPressed(e));
    }else if(e.type == "click"){
      this.onSelect(this.partyMenu.selectMouseClick(e));
    }else{
      return this.partyMenu.keyPressed(e)
    }
  };
  
  drawBackground(){
    const background = new Image()
      background.src = "battle_backgrounds.png"
    this.ctx.drawImage(background, 522, 5, 270, 155, 0, 0, this.ctx.width, this.ctx.height)
  }

  addSprites(){
    this.party.forEach((obj, index) => {
      let sprite = new Image();
        sprite.src = `image${index}.png`;
      obj.sprite = sprite;
      obj.index = index;

      obj.draw(this.charIndexIncrease);
    })
  }

  drawMonsters(){
    this.enemies.forEach((obj, index) => {
      obj.draw();
    })
  }

  onSelect(selection){
    if (this.actionInProgress || this.battleState !== 'player-turn') {
      return;
    }
    
    this.actionInProgress = true;
    const selectedAction = selection.innerText;
    
    if (selectedAction === 'Attack') {
      this.performAttack();
    } else if (selectedAction === 'Defend') {
      this.performDefend();
    }
  }
  
  performAttack() {
    // Find alive enemies
    const aliveEnemies = this.enemies.filter(enemy => enemy.isAlive());
    if (aliveEnemies.length === 0) {
      this.checkBattleEnd();
      return;
    }
    
    // Attack random alive enemy
    const targetEnemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
    
    this.currentChar.back = false;
    this.currentChar.forward = true;
    this.currentChar.attack(targetEnemy);
    
    // After attack animation, proceed to next turn
    setTimeout(() => {
      this.currentChar.back = true;
      this.currentChar.forward = false;
      this.actionInProgress = false;
      this.nextTurn();
    }, 1000);
  }
  
  performDefend() {
    console.log(`${this.currentChar.job} is defending!`);
    // Defending reduces incoming damage by 50% for this turn
    this.currentChar.defending = true;
    
    setTimeout(() => {
      this.actionInProgress = false;
      this.nextTurn();
    }, 500);
  }
  
  nextTurn() {
    if (this.checkBattleEnd()) {
      return;
    }
    
    this.charIndexIncrease();
    
    // Check if all party members have acted
    if (this.currentCharIndex === 0) {
      this.battleState = 'enemy-turn';
      this.enemyTurn();
    }
  }
  
  enemyTurn() {
    const aliveEnemies = this.enemies.filter(enemy => enemy.isAlive());
    const aliveParty = this.party.filter(char => !char.KO);
    
    if (aliveEnemies.length === 0 || aliveParty.length === 0) {
      this.checkBattleEnd();
      return;
    }
    
    let enemyIndex = 0;
    const enemyAttackInterval = setInterval(() => {
      if (enemyIndex >= aliveEnemies.length) {
        clearInterval(enemyAttackInterval);
        // Reset defending status
        this.party.forEach(char => char.defending = false);
        this.battleState = 'player-turn';
        return;
      }
      
      const enemy = aliveEnemies[enemyIndex];
      const target = aliveParty[Math.floor(Math.random() * aliveParty.length)];
      
      if (target && !target.KO) {
        let damage = enemy.attack(target);
        if (target.defending) {
          damage = Math.floor(damage * 0.5);
          target.health += Math.floor(damage * 0.5); // Restore half damage
          console.log(`${target.job} defended and reduced damage!`);
        }
      }
      
      enemyIndex++;
    }, 1000);
  }
  
  checkBattleEnd() {
    const aliveEnemies = this.enemies.filter(enemy => enemy.isAlive());
    const aliveParty = this.party.filter(char => !char.KO && char.health > 0);
    
    if (aliveEnemies.length === 0) {
      this.battleState = 'victory';
      console.log('Victory! All enemies defeated!');
      this.showVictoryScreen();
      return true;
    }
    
    if (aliveParty.length === 0) {
      this.battleState = 'defeat';
      console.log('Defeat! All party members have fallen!');
      this.showDefeatScreen();
      return true;
    }
    
    return false;
  }
  
  showVictoryScreen() {
    // Add victory screen logic
    setTimeout(() => {
      alert('Victory! You defeated all enemies!');
      this.resetBattle();
    }, 1000);
  }
  
  showDefeatScreen() {
    // Add defeat screen logic
    setTimeout(() => {
      alert('Defeat! Game Over!');
      this.resetBattle();
    }, 1000);
  }
  
  resetBattle() {
    // Reset party health
    this.party.forEach(char => {
      char.health = char.maxHealth;
      char.KO = false;
      char.defending = false;
    });
    
    // Generate new enemies
    this.enemies = [];
    this.addEnemy();
    
    this.currentCharIndex = 0;
    this.battleState = 'player-turn';
    this.actionInProgress = false;
  }

  addEnemy(){
    const numEnemies = Math.floor(Math.random() * 4) + 1
    for (let index = 0; index < numEnemies; index++){
      const monster = new Monster(this.ctx, index);
      this.enemies.push(monster)
    }

  }

  charIndexIncrease(){
    // Skip KO'd characters
    do {
      this.currentCharIndex >= 3 ? this.currentCharIndex = 0 : this.currentCharIndex++;
    } while (this.party[this.currentCharIndex] && this.party[this.currentCharIndex].KO);
  }
  


}