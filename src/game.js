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
    this.currentChar = this.party[this.currentCharIndex];
    
    // Fix canvas sizing - don't change canvas dimensions every frame
    if (!this.canvasInitialized) {
      this.ctx.canvas.width = window.innerWidth * 0.85;
      this.ctx.canvas.height = window.innerHeight * 0.80;
      this.canvasInitialized = true;
    }
    
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    
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
    if (this.actionInProgress) {
      return;
    }
    
    this.actionInProgress = true;
    const selectedAction = selection.innerText;
    
    if (selectedAction === 'Attack') {
      this.performSimpleAttack();
    } else if (selectedAction === 'Defend') {
      this.performSimpleDefend();
    }
  }
  
  performSimpleAttack() {
    // Simple attack without complex turn system
    const aliveEnemies = this.enemies.filter(enemy => enemy.health > 0);
    if (aliveEnemies.length === 0) {
      this.actionInProgress = false;
      return;
    }
    
    const targetEnemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
    
    this.currentChar.back = false;
    this.currentChar.forward = true;
    this.currentChar.attack(targetEnemy);
    
    // Simple turn progression
    setTimeout(() => {
      this.currentChar.back = true;
      this.currentChar.forward = false;
      this.actionInProgress = false;
      this.charIndexIncrease();
    }, 800);
  }
  
  performSimpleDefend() {
    console.log(`${this.currentChar.job} is defending!`);
    
    setTimeout(() => {
      this.actionInProgress = false;
      this.charIndexIncrease();
    }, 400);
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