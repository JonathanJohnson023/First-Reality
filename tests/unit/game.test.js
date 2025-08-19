// Unit Tests for Game System
import Game from '../../src/game.js';
import Character from '../../src/char.js';
import Monster from '../../src/monster.js';

describe('Game System', () => {
  let game;
  let mockCanvas;

  beforeEach(() => {
    // Mock canvas element
    mockCanvas = {
      getContext: () => ({
        clearRect: jest.fn(),
        fillRect: jest.fn(),
        drawImage: jest.fn(),
        canvas: { width: 800, height: 600 }
      }),
      width: 800,
      height: 600
    };
    
    game = new Game(mockCanvas);
  });

  test('Game initializes correctly', () => {
    expect(game.party).toEqual([]);
    expect(game.enemies).toEqual([]);
    expect(game.wave).toBe(0);
    expect(game.currentCharIndex).toBe(0);
    expect(game.battleState).toBe('player-turn');
    expect(game.actionInProgress).toBe(false);
  });

  test('Game starts with party creation', () => {
    game.start();
    
    expect(game.party.length).toBe(4);
    expect(game.party[0].job).toBe('Knight');
    expect(game.party[1].job).toBe('Cleric');
    expect(game.party[2].job).toBe('Archer');
    expect(game.party[3].job).toBe('Wizard');
  });

  test('Enemies are added correctly', () => {
    game.addEnemy();
    
    expect(game.enemies.length).toBeGreaterThan(0);
    expect(game.enemies.length).toBeLessThanOrEqual(4);
    expect(game.enemies[0]).toBeInstanceOf(Monster);
  });

  test('Character index increases correctly', () => {
    game.start(); // Creates party
    
    const initialIndex = game.currentCharIndex;
    game.charIndexIncrease();
    
    expect(game.currentCharIndex).toBe((initialIndex + 1) % 4);
  });

  test('Battle state management', () => {
    expect(game.battleState).toBe('player-turn');
    
    game.battleState = 'enemy-turn';
    expect(game.battleState).toBe('enemy-turn');
  });

  test('Check battle end conditions', () => {
    game.start();
    game.addEnemy();
    
    // Test victory condition
    game.enemies.forEach(enemy => {
      enemy.health = 0;
      enemy.KO = true;
    });
    
    const isVictory = game.checkBattleEnd();
    expect(isVictory).toBe(true);
    expect(game.battleState).toBe('victory');
  });

  test('Reset battle functionality', () => {
    game.start();
    game.addEnemy();
    
    // Damage party
    game.party[0].health = 50;
    game.party[0].KO = true;
    
    game.resetBattle();
    
    expect(game.party[0].health).toBe(game.party[0].maxHealth);
    expect(game.party[0].KO).toBe(false);
    expect(game.battleState).toBe('player-turn');
    expect(game.actionInProgress).toBe(false);
  });
});

describe('Character System', () => {
  let character;
  let mockCtx;

  beforeEach(() => {
    mockCtx = {
      clearRect: jest.fn(),
      fillRect: jest.fn(),
      drawImage: jest.fn(),
      canvas: { width: 800, height: 600 }
    };
    
    character = new Character('Knight', mockCtx, null, 0);
  });

  test('Character initializes with correct stats', () => {
    expect(character.job).toBe('Knight');
    expect(character.level).toBe(1);
    expect(character.maxHealth).toBe(100);
    expect(character.health).toBe(100);
    expect(character.KO).toBe(false);
  });

  test('Character attack deals damage', () => {
    const monster = new Monster(mockCtx, 0);
    const initialHealth = monster.health;
    
    character.attack(monster);
    
    expect(monster.health).toBeLessThan(initialHealth);
    expect(monster.health).toBeGreaterThanOrEqual(0);
  });

  test('Character attack on dead monster', () => {
    const monster = new Monster(mockCtx, 0);
    monster.health = 0;
    
    character.attack(monster);
    
    expect(monster.health).toBe(0);
  });

  test('Character sprite height calculation', () => {
    character.spriteHeight(2);
    expect(character.heightFloat).toBeGreaterThan(0);
    expect(character.heightFloat).toBeLessThan(1);
  });
});

describe('Monster System', () => {
  let monster;
  let mockCtx;

  beforeEach(() => {
    mockCtx = {
      clearRect: jest.fn(),
      fillRect: jest.fn(),
      drawImage: jest.fn(),
      canvas: { width: 800, height: 600 }
    };
    
    monster = new Monster(mockCtx, 0);
  });

  test('Monster initializes correctly', () => {
    expect(monster.level).toBe(1);
    expect(monster.maxHealth).toBe(100);
    expect(monster.health).toBe(100);
    expect(monster.KO).toBe(false);
  });

  test('Monster is alive check', () => {
    expect(monster.isAlive()).toBe(true);
    
    monster.health = 0;
    expect(monster.isAlive()).toBe(false);
    
    monster.KO = true;
    expect(monster.isAlive()).toBe(false);
  });

  test('Monster attack deals damage', () => {
    const mockTarget = {
      health: 100,
      KO: false,
      job: 'TestTarget'
    };
    
    const damage = monster.attack(mockTarget);
    
    expect(damage).toBeGreaterThan(0);
    expect(mockTarget.health).toBeLessThan(100);
  });

  test('Monster death sets correct state', () => {
    monster.death();
    
    expect(monster.KO).toBe(true);
    expect(monster.health).toBe(0);
  });
});