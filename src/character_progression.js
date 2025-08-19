// Advanced Character Progression System
export default class CharacterProgression {
  constructor() {
    this.experienceTable = this.generateExperienceTable();
    this.skillTrees = this.createSkillTrees();
    this.equipment = this.createEquipmentDatabase();
    this.achievements = this.createAchievements();
  }

  // Generate experience table for levels 1-99
  generateExperienceTable() {
    const table = [0]; // Level 1 starts at 0 XP
    
    for (let level = 2; level <= 99; level++) {
      // Exponential growth with some variance
      const baseXP = Math.floor(100 * Math.pow(level, 1.8));
      table.push(baseXP);
    }
    
    return table;
  }

  // Create skill trees for each character class
  createSkillTrees() {
    return {
      Knight: {
        name: 'Knight',
        skills: {
          // Offensive skills
          'Power Strike': {
            id: 'power_strike',
            name: 'Power Strike',
            description: 'Deal 150% weapon damage',
            type: 'offensive',
            mpCost: 8,
            levelRequired: 3,
            prerequisites: [],
            effect: { damageMultiplier: 1.5 }
          },
          'Whirlwind': {
            id: 'whirlwind',
            name: 'Whirlwind',
            description: 'Attack all enemies for 80% damage',
            type: 'offensive',
            mpCost: 15,
            levelRequired: 7,
            prerequisites: ['power_strike'],
            effect: { damageMultiplier: 0.8, target: 'all_enemies' }
          },
          'Berserker Rage': {
            id: 'berserker_rage',
            name: 'Berserker Rage',
            description: 'Double attack power for 3 turns, take 25% more damage',
            type: 'buff',
            mpCost: 20,
            levelRequired: 12,
            prerequisites: ['whirlwind'],
            effect: { attackBoost: 2.0, defenseReduction: 0.25, duration: 3 }
          },
          
          // Defensive skills
          'Shield Wall': {
            id: 'shield_wall',
            name: 'Shield Wall',
            description: 'Reduce all damage by 50% for 2 turns',
            type: 'defensive',
            mpCost: 12,
            levelRequired: 5,
            prerequisites: [],
            effect: { damageReduction: 0.5, duration: 2 }
          },
          'Taunt': {
            id: 'taunt',
            name: 'Taunt',
            description: 'Force all enemies to target you for 2 turns',
            type: 'defensive',
            mpCost: 8,
            levelRequired: 4,
            prerequisites: [],
            effect: { forceTaunt: true, duration: 2 }
          },
          'Guardian': {
            id: 'guardian',
            name: 'Guardian',
            description: 'Take 50% of damage dealt to allies',
            type: 'defensive',
            mpCost: 18,
            levelRequired: 10,
            prerequisites: ['shield_wall', 'taunt'],
            effect: { damageRedirect: 0.5, duration: 4 }
          }
        }
      },
      
      Cleric: {
        name: 'Cleric',
        skills: {
          // Healing skills
          'Minor Heal': {
            id: 'minor_heal',
            name: 'Minor Heal',
            description: 'Restore 40-60 HP to one ally',
            type: 'healing',
            mpCost: 6,
            levelRequired: 2,
            prerequisites: [],
            effect: { healAmount: [40, 60], target: 'single_ally' }
          },
          'Major Heal': {
            id: 'major_heal',
            name: 'Major Heal',
            description: 'Restore 80-120 HP to one ally',
            type: 'healing',
            mpCost: 15,
            levelRequired: 6,
            prerequisites: ['minor_heal'],
            effect: { healAmount: [80, 120], target: 'single_ally' }
          },
          'Group Heal': {
            id: 'group_heal',
            name: 'Group Heal',
            description: 'Restore 30-50 HP to all allies',
            type: 'healing',
            mpCost: 25,
            levelRequired: 9,
            prerequisites: ['major_heal'],
            effect: { healAmount: [30, 50], target: 'all_allies' }
          },
          'Resurrection': {
            id: 'resurrection',
            name: 'Resurrection',
            description: 'Revive fallen ally with 25% HP',
            type: 'healing',
            mpCost: 40,
            levelRequired: 15,
            prerequisites: ['group_heal'],
            effect: { revive: true, hpPercent: 0.25 }
          },
          
          // Support skills
          'Bless': {
            id: 'bless',
            name: 'Bless',
            description: 'Increase ally attack and defense by 25% for 4 turns',
            type: 'buff',
            mpCost: 10,
            levelRequired: 4,
            prerequisites: [],
            effect: { attackBoost: 1.25, defenseBoost: 1.25, duration: 4 }
          },
          'Holy Light': {
            id: 'holy_light',
            name: 'Holy Light',
            description: 'Deal magic damage to all undead enemies',
            type: 'offensive',
            mpCost: 18,
            levelRequired: 8,
            prerequisites: ['bless'],
            effect: { damageMultiplier: 2.0, target: 'undead_enemies' }
          }
        }
      },
      
      Archer: {
        name: 'Archer',
        skills: {
          // Precision skills
          'Aimed Shot': {
            id: 'aimed_shot',
            name: 'Aimed Shot',
            description: 'High accuracy shot with 25% critical chance',
            type: 'offensive',
            mpCost: 8,
            levelRequired: 3,
            prerequisites: [],
            effect: { accuracy: 1.5, criticalChance: 0.25 }
          },
          'Multi Shot': {
            id: 'multi_shot',
            name: 'Multi Shot',
            description: 'Fire arrows at 3 random enemies',
            type: 'offensive',
            mpCost: 15,
            levelRequired: 6,
            prerequisites: ['aimed_shot'],
            effect: { shots: 3, target: 'random_enemies' }
          },
          'Rain of Arrows': {
            id: 'rain_of_arrows',
            name: 'Rain of Arrows',
            description: 'Attack all enemies with reduced damage',
            type: 'offensive',
            mpCost: 22,
            levelRequired: 10,
            prerequisites: ['multi_shot'],
            effect: { damageMultiplier: 0.7, target: 'all_enemies' }
          },
          
          // Utility skills
          'Eagle Eye': {
            id: 'eagle_eye',
            name: 'Eagle Eye',
            description: 'Increase accuracy and critical rate for 3 turns',
            type: 'buff',
            mpCost: 12,
            levelRequired: 5,
            prerequisites: [],
            effect: { accuracyBoost: 1.5, criticalBoost: 0.3, duration: 3 }
          },
          'Poison Arrow': {
            id: 'poison_arrow',
            name: 'Poison Arrow',
            description: 'Arrow that deals poison damage over 3 turns',
            type: 'offensive',
            mpCost: 10,
            levelRequired: 7,
            prerequisites: ['eagle_eye'],
            effect: { poisonDamage: 15, duration: 3 }
          }
        }
      },
      
      Wizard: {
        name: 'Wizard',
        skills: {
          // Elemental magic
          'Fireball': {
            id: 'fireball',
            name: 'Fireball',
            description: 'Deal fire damage to one enemy',
            type: 'offensive',
            mpCost: 10,
            levelRequired: 2,
            prerequisites: [],
            effect: { element: 'fire', damageMultiplier: 1.3 }
          },
          'Lightning Bolt': {
            id: 'lightning_bolt',
            name: 'Lightning Bolt',
            description: 'Deal lightning damage to one enemy',
            type: 'offensive',
            mpCost: 12,
            levelRequired: 3,
            prerequisites: [],
            effect: { element: 'lightning', damageMultiplier: 1.2, stunChance: 0.2 }
          },
          'Ice Shard': {
            id: 'ice_shard',
            name: 'Ice Shard',
            description: 'Deal ice damage and slow enemy',
            type: 'offensive',
            mpCost: 11,
            levelRequired: 3,
            prerequisites: [],
            effect: { element: 'ice', damageMultiplier: 1.1, slowEffect: 0.3 }
          },
          'Meteor': {
            id: 'meteor',
            name: 'Meteor',
            description: 'Devastating fire damage to all enemies',
            type: 'offensive',
            mpCost: 35,
            levelRequired: 12,
            prerequisites: ['fireball', 'lightning_bolt', 'ice_shard'],
            effect: { element: 'fire', damageMultiplier: 1.8, target: 'all_enemies' }
          },
          
          // Support magic
          'Mana Shield': {
            id: 'mana_shield',
            name: 'Mana Shield',
            description: 'Convert damage to MP loss instead of HP',
            type: 'defensive',
            mpCost: 20,
            levelRequired: 8,
            prerequisites: [],
            effect: { manaShield: true, duration: 5 }
          },
          'Arcane Intellect': {
            id: 'arcane_intellect',
            name: 'Arcane Intellect',
            description: 'Increase magic power and MP regeneration',
            type: 'buff',
            mpCost: 15,
            levelRequired: 6,
            prerequisites: [],
            effect: { magicBoost: 1.4, mpRegen: 5, duration: 6 }
          }
        }
      }
    };
  }

  // Create equipment database
  createEquipmentDatabase() {
    return {
      weapons: {
        // Knight weapons
        'Iron Sword': {
          id: 'iron_sword',
          name: 'Iron Sword',
          type: 'weapon',
          class: 'Knight',
          attack: 15,
          price: 200,
          description: 'A sturdy iron blade'
        },
        'Steel Sword': {
          id: 'steel_sword',
          name: 'Steel Sword',
          type: 'weapon',
          class: 'Knight',
          attack: 25,
          price: 500,
          description: 'Sharp steel forged blade'
        },
        'Excalibur': {
          id: 'excalibur',
          name: 'Excalibur',
          type: 'weapon',
          class: 'Knight',
          attack: 50,
          price: 5000,
          description: 'Legendary holy sword',
          special: { holyDamage: 10, criticalRate: 0.15 }
        },
        
        // Cleric weapons
        'Oak Staff': {
          id: 'oak_staff',
          name: 'Oak Staff',
          type: 'weapon',
          class: 'Cleric',
          attack: 8,
          magic: 12,
          price: 150,
          description: 'Simple wooden staff'
        },
        'Crystal Staff': {
          id: 'crystal_staff',
          name: 'Crystal Staff',
          type: 'weapon',
          class: 'Cleric',
          attack: 12,
          magic: 25,
          price: 800,
          description: 'Staff topped with healing crystal'
        },
        
        // Archer weapons
        'Short Bow': {
          id: 'short_bow',
          name: 'Short Bow',
          type: 'weapon',
          class: 'Archer',
          attack: 12,
          speed: 5,
          price: 180,
          description: 'Quick and accurate bow'
        },
        'Elven Bow': {
          id: 'elven_bow',
          name: 'Elven Bow',
          type: 'weapon',
          class: 'Archer',
          attack: 30,
          speed: 10,
          price: 1200,
          description: 'Masterwork elven craftsmanship'
        },
        
        // Wizard weapons
        'Magic Wand': {
          id: 'magic_wand',
          name: 'Magic Wand',
          type: 'weapon',
          class: 'Wizard',
          attack: 5,
          magic: 15,
          price: 120,
          description: 'Basic spellcasting focus'
        },
        'Arcane Staff': {
          id: 'arcane_staff',
          name: 'Arcane Staff',
          type: 'weapon',
          class: 'Wizard',
          attack: 10,
          magic: 35,
          price: 1500,
          description: 'Staff humming with arcane power'
        }
      },
      
      armor: {
        'Leather Armor': {
          id: 'leather_armor',
          name: 'Leather Armor',
          type: 'armor',
          defense: 8,
          price: 150,
          description: 'Basic leather protection'
        },
        'Chain Mail': {
          id: 'chain_mail',
          name: 'Chain Mail',
          type: 'armor',
          defense: 15,
          price: 400,
          description: 'Interlocked metal rings'
        },
        'Plate Armor': {
          id: 'plate_armor',
          name: 'Plate Armor',
          type: 'armor',
          defense: 25,
          price: 1000,
          description: 'Heavy metal plate protection'
        },
        'Dragon Scale': {
          id: 'dragon_scale',
          name: 'Dragon Scale Armor',
          type: 'armor',
          defense: 40,
          price: 5000,
          description: 'Armor made from dragon scales',
          special: { fireResistance: 0.5, magicDefense: 10 }
        }
      },
      
      accessories: {
        'Power Ring': {
          id: 'power_ring',
          name: 'Power Ring',
          type: 'accessory',
          attack: 5,
          price: 300,
          description: 'Ring that enhances physical strength'
        },
        'Magic Ring': {
          id: 'magic_ring',
          name: 'Magic Ring',
          type: 'accessory',
          magic: 8,
          price: 350,
          description: 'Ring that amplifies magical power'
        },
        'Life Amulet': {
          id: 'life_amulet',
          name: 'Life Amulet',
          type: 'accessory',
          maxHealth: 25,
          price: 500,
          description: 'Amulet that increases vitality'
        },
        'Speed Boots': {
          id: 'speed_boots',
          name: 'Speed Boots',
          type: 'accessory',
          speed: 10,
          price: 400,
          description: 'Boots that increase movement speed'
        }
      }
    };
  }

  // Create achievement system
  createAchievements() {
    return {
      'first_victory': {
        id: 'first_victory',
        name: 'First Victory',
        description: 'Win your first battle',
        icon: '🏆',
        reward: { experience: 50, gold: 100 }
      },
      'level_10': {
        id: 'level_10',
        name: 'Veteran',
        description: 'Reach level 10 with any character',
        icon: '⭐',
        reward: { gold: 500, item: 'Power Ring' }
      },
      'perfect_battle': {
        id: 'perfect_battle',
        name: 'Perfect Victory',
        description: 'Win a battle without taking damage',
        icon: '💎',
        reward: { experience: 100, gold: 200 }
      },
      'magic_master': {
        id: 'magic_master',
        name: 'Magic Master',
        description: 'Cast 100 spells',
        icon: '🔮',
        reward: { item: 'Magic Ring', gold: 300 }
      },
      'treasure_hunter': {
        id: 'treasure_hunter',
        name: 'Treasure Hunter',
        description: 'Collect 10 different items',
        icon: '💰',
        reward: { gold: 1000 }
      }
    };
  }

  // Calculate experience needed for next level
  getExperienceToNextLevel(currentLevel, currentExp) {
    if (currentLevel >= 99) return 0;
    return this.experienceTable[currentLevel] - currentExp;
  }

  // Calculate level from experience
  getLevelFromExperience(experience) {
    for (let level = 1; level < this.experienceTable.length; level++) {
      if (experience < this.experienceTable[level]) {
        return level;
      }
    }
    return 99; // Max level
  }

  // Level up character
  levelUpCharacter(character) {
    const oldLevel = character.level;
    const newLevel = this.getLevelFromExperience(character.experience);
    
    if (newLevel > oldLevel) {
      character.level = newLevel;
      
      // Calculate stat increases
      const levelDiff = newLevel - oldLevel;
      const statGains = this.calculateStatGains(character.job, levelDiff);
      
      // Apply stat increases
      character.maxHealth += statGains.health;
      character.health = character.maxHealth; // Full heal on level up
      character.attack += statGains.attack;
      character.defense += statGains.defense;
      character.magic += statGains.magic;
      character.speed += statGains.speed;
      
      // Check for new skills
      const newSkills = this.getNewSkills(character.job, newLevel);
      character.skills = [...character.skills, ...newSkills];
      
      console.log(`🎉 ${character.name} reached level ${newLevel}!`);
      return {
        leveledUp: true,
        oldLevel,
        newLevel,
        statGains,
        newSkills
      };
    }
    
    return { leveledUp: false };
  }

  // Calculate stat gains per level
  calculateStatGains(job, levels) {
    const baseGains = {
      Knight: { health: 8, attack: 3, defense: 3, magic: 1, speed: 1 },
      Cleric: { health: 5, attack: 2, defense: 2, magic: 4, speed: 1 },
      Archer: { health: 6, attack: 3, defense: 2, magic: 2, speed: 3 },
      Wizard: { health: 4, attack: 1, defense: 1, magic: 5, speed: 2 }
    };
    
    const gains = baseGains[job] || baseGains.Knight;
    
    return {
      health: gains.health * levels,
      attack: gains.attack * levels,
      defense: gains.defense * levels,
      magic: gains.magic * levels,
      speed: gains.speed * levels
    };
  }

  // Get new skills unlocked at level
  getNewSkills(job, level) {
    const skillTree = this.skillTrees[job];
    if (!skillTree) return [];
    
    const newSkills = [];
    
    Object.values(skillTree.skills).forEach(skill => {
      if (skill.levelRequired === level) {
        newSkills.push(skill.id);
      }
    });
    
    return newSkills;
  }

  // Check if character can learn skill
  canLearnSkill(character, skillId) {
    const skillTree = this.skillTrees[character.job];
    if (!skillTree) return false;
    
    const skill = skillTree.skills[Object.keys(skillTree.skills).find(key => 
      skillTree.skills[key].id === skillId
    )];
    
    if (!skill) return false;
    
    // Check level requirement
    if (character.level < skill.levelRequired) return false;
    
    // Check if already known
    if (character.skills.includes(skillId)) return false;
    
    // Check prerequisites
    return skill.prerequisites.every(prereq => character.skills.includes(prereq));
  }

  // Apply equipment stats
  applyEquipmentStats(character) {
    let totalStats = {
      attack: 0,
      defense: 0,
      magic: 0,
      speed: 0,
      maxHealth: 0
    };
    
    // Apply weapon stats
    if (character.equipment.weapon) {
      const weapon = this.equipment.weapons[character.equipment.weapon];
      if (weapon) {
        totalStats.attack += weapon.attack || 0;
        totalStats.magic += weapon.magic || 0;
        totalStats.speed += weapon.speed || 0;
      }
    }
    
    // Apply armor stats
    if (character.equipment.armor) {
      const armor = this.equipment.armor[character.equipment.armor];
      if (armor) {
        totalStats.defense += armor.defense || 0;
        totalStats.maxHealth += armor.maxHealth || 0;
      }
    }
    
    // Apply accessory stats
    if (character.equipment.accessory) {
      const accessory = this.equipment.accessories[character.equipment.accessory];
      if (accessory) {
        totalStats.attack += accessory.attack || 0;
        totalStats.defense += accessory.defense || 0;
        totalStats.magic += accessory.magic || 0;
        totalStats.speed += accessory.speed || 0;
        totalStats.maxHealth += accessory.maxHealth || 0;
      }
    }
    
    return totalStats;
  }

  // Check and award achievements
  checkAchievements(gameData, action) {
    const newAchievements = [];
    
    Object.values(this.achievements).forEach(achievement => {
      // Skip if already earned
      if (gameData.progress.achievements.includes(achievement.id)) return;
      
      let earned = false;
      
      switch (achievement.id) {
        case 'first_victory':
          earned = gameData.progress.battlesWon >= 1;
          break;
        case 'level_10':
          earned = gameData.party.some(char => char.level >= 10);
          break;
        case 'perfect_battle':
          earned = action === 'perfect_victory';
          break;
        case 'magic_master':
          earned = gameData.statistics.magicCast >= 100;
          break;
        case 'treasure_hunter':
          earned = gameData.inventory.items.length + 
                  gameData.inventory.weapons.length + 
                  gameData.inventory.armor.length + 
                  gameData.inventory.accessories.length >= 10;
          break;
      }
      
      if (earned) {
        newAchievements.push(achievement);
        gameData.progress.achievements.push(achievement.id);
        
        // Apply rewards
        if (achievement.reward.experience) {
          gameData.party.forEach(char => {
            char.experience += achievement.reward.experience;
          });
        }
        
        if (achievement.reward.gold) {
          gameData.player.gold += achievement.reward.gold;
        }
        
        if (achievement.reward.item) {
          // Add item to inventory
          const existingItem = gameData.inventory.items.find(item => 
            item.name === achievement.reward.item
          );
          
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            gameData.inventory.items.push({
              name: achievement.reward.item,
              quantity: 1
            });
          }
        }
      }
    });
    
    return newAchievements;
  }

  // Get character's effective stats (base + equipment)
  getEffectiveStats(character) {
    const equipmentStats = this.applyEquipmentStats(character);
    
    return {
      maxHealth: character.maxHealth + equipmentStats.maxHealth,
      attack: character.attack + equipmentStats.attack,
      defense: character.defense + equipmentStats.defense,
      magic: character.magic + equipmentStats.magic,
      speed: character.speed + equipmentStats.speed
    };
  }

  // Get available skills for character
  getAvailableSkills(character) {
    const skillTree = this.skillTrees[character.job];
    if (!skillTree) return [];
    
    return Object.values(skillTree.skills).filter(skill => 
      this.canLearnSkill(character, skill.id)
    );
  }

  // Get skill information
  getSkillInfo(job, skillId) {
    const skillTree = this.skillTrees[job];
    if (!skillTree) return null;
    
    return Object.values(skillTree.skills).find(skill => skill.id === skillId);
  }
}