// Advanced Save System with Local Storage
export default class SaveSystem {
  constructor() {
    this.saveKey = 'first_reality_save_v2';
    this.defaultSave = {
      version: '2.0.0',
      timestamp: Date.now(),
      player: {
        name: 'Hero',
        level: 1,
        experience: 0,
        gold: 100,
        playtime: 0
      },
      party: [
        {
          name: 'Knight',
          job: 'Knight',
          level: 1,
          experience: 0,
          maxHealth: 100,
          health: 100,
          attack: 25,
          defense: 20,
          magic: 5,
          speed: 15,
          equipment: {
            weapon: 'Iron Sword',
            armor: 'Leather Armor',
            accessory: null
          },
          skills: ['Slash', 'Guard']
        },
        {
          name: 'Cleric',
          job: 'Cleric',
          level: 1,
          experience: 0,
          maxHealth: 80,
          health: 80,
          attack: 15,
          defense: 15,
          magic: 30,
          speed: 12,
          equipment: {
            weapon: 'Oak Staff',
            armor: 'Robe',
            accessory: null
          },
          skills: ['Heal', 'Bless']
        },
        {
          name: 'Archer',
          job: 'Archer',
          level: 1,
          experience: 0,
          maxHealth: 90,
          health: 90,
          attack: 20,
          defense: 12,
          magic: 10,
          speed: 25,
          equipment: {
            weapon: 'Short Bow',
            armor: 'Leather Vest',
            accessory: null
          },
          skills: ['Arrow Shot', 'Aim']
        },
        {
          name: 'Wizard',
          job: 'Wizard',
          level: 1,
          experience: 0,
          maxHealth: 70,
          health: 70,
          attack: 10,
          defense: 8,
          magic: 35,
          speed: 18,
          equipment: {
            weapon: 'Magic Wand',
            armor: 'Mage Robe',
            accessory: null
          },
          skills: ['Fire', 'Lightning']
        }
      ],
      inventory: {
        items: [
          { name: 'Potion', quantity: 5, type: 'healing', value: 50 },
          { name: 'Ether', quantity: 3, type: 'mana', value: 30 }
        ],
        weapons: [],
        armor: [],
        accessories: []
      },
      progress: {
        currentWave: 1,
        battlesWon: 0,
        enemiesDefeated: 0,
        achievements: [],
        unlockedFeatures: []
      },
      settings: {
        volume: 30,
        sfxVolume: 50,
        difficulty: 'normal',
        autoSave: true,
        showDamageNumbers: true,
        animationSpeed: 'normal'
      },
      statistics: {
        totalPlaytime: 0,
        totalBattles: 0,
        totalDamageDealt: 0,
        totalDamageReceived: 0,
        highestDamage: 0,
        itemsUsed: 0,
        magicCast: 0
      }
    };
  }

  // Save game data
  saveGame(gameData) {
    try {
      const saveData = {
        ...this.defaultSave,
        ...gameData,
        timestamp: Date.now(),
        version: '2.0.0'
      };
      
      localStorage.setItem(this.saveKey, JSON.stringify(saveData));
      this.createBackup(saveData);
      
      console.log('✅ Game saved successfully!');
      this.showSaveNotification('Game Saved!', 'success');
      return true;
    } catch (error) {
      console.error('❌ Failed to save game:', error);
      this.showSaveNotification('Save Failed!', 'error');
      return false;
    }
  }

  // Load game data
  loadGame() {
    try {
      const savedData = localStorage.getItem(this.saveKey);
      if (!savedData) {
        console.log('📝 No save data found, starting new game');
        return this.defaultSave;
      }

      const gameData = JSON.parse(savedData);
      
      // Version migration if needed
      if (gameData.version !== '2.0.0') {
        console.log('🔄 Migrating save data...');
        return this.migrateSave(gameData);
      }

      console.log('✅ Game loaded successfully!');
      this.showSaveNotification('Game Loaded!', 'success');
      return gameData;
    } catch (error) {
      console.error('❌ Failed to load game:', error);
      this.showSaveNotification('Load Failed! Starting new game.', 'warning');
      return this.defaultSave;
    }
  }

  // Create backup save
  createBackup(saveData) {
    try {
      const backupKey = this.saveKey + '_backup';
      localStorage.setItem(backupKey, JSON.stringify(saveData));
    } catch (error) {
      console.warn('⚠️ Failed to create backup:', error);
    }
  }

  // Load backup if main save is corrupted
  loadBackup() {
    try {
      const backupKey = this.saveKey + '_backup';
      const backupData = localStorage.getItem(backupKey);
      if (backupData) {
        console.log('🔄 Loading backup save...');
        return JSON.parse(backupData);
      }
    } catch (error) {
      console.error('❌ Failed to load backup:', error);
    }
    return this.defaultSave;
  }

  // Migrate old save format
  migrateSave(oldSave) {
    console.log('🔄 Migrating save from version', oldSave.version || '1.0.0');
    
    const migratedSave = {
      ...this.defaultSave,
      ...oldSave,
      version: '2.0.0',
      timestamp: Date.now()
    };

    // Save migrated data
    this.saveGame(migratedSave);
    return migratedSave;
  }

  // Delete save data
  deleteSave() {
    try {
      localStorage.removeItem(this.saveKey);
      localStorage.removeItem(this.saveKey + '_backup');
      console.log('🗑️ Save data deleted');
      this.showSaveNotification('Save Deleted!', 'info');
      return true;
    } catch (error) {
      console.error('❌ Failed to delete save:', error);
      return false;
    }
  }

  // Check if save exists
  hasSaveData() {
    return localStorage.getItem(this.saveKey) !== null;
  }

  // Export save data
  exportSave() {
    try {
      const saveData = this.loadGame();
      const exportData = JSON.stringify(saveData, null, 2);
      
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `first_reality_save_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      this.showSaveNotification('Save Exported!', 'success');
      return true;
    } catch (error) {
      console.error('❌ Failed to export save:', error);
      this.showSaveNotification('Export Failed!', 'error');
      return false;
    }
  }

  // Import save data
  importSave(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const importData = JSON.parse(e.target.result);
          
          // Validate save data
          if (this.validateSave(importData)) {
            this.saveGame(importData);
            this.showSaveNotification('Save Imported!', 'success');
            resolve(importData);
          } else {
            throw new Error('Invalid save file format');
          }
        } catch (error) {
          console.error('❌ Failed to import save:', error);
          this.showSaveNotification('Import Failed!', 'error');
          reject(error);
        }
      };
      
      reader.readAsText(file);
    });
  }

  // Validate save data structure
  validateSave(saveData) {
    const requiredFields = ['player', 'party', 'inventory', 'progress'];
    return requiredFields.every(field => saveData.hasOwnProperty(field));
  }

  // Auto-save functionality
  setupAutoSave(gameInstance, interval = 60000) { // Auto-save every minute
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }

    this.autoSaveInterval = setInterval(() => {
      if (gameInstance && gameInstance.getGameData) {
        const gameData = gameInstance.getGameData();
        if (gameData.settings && gameData.settings.autoSave !== false) {
          this.saveGame(gameData);
        }
      }
    }, interval);
  }

  // Show save notification
  showSaveNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `save-notification save-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: type === 'success' ? '#4CAF50' : 
                 type === 'error' ? '#f44336' : 
                 type === 'warning' ? '#ff9800' : '#2196F3',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      fontFamily: 'Final Fantasy, monospace',
      fontSize: '14px',
      fontWeight: 'bold',
      zIndex: '10000',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      animation: 'slideInDown 0.3s ease-out'
    });
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutUp 0.3s ease-in';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Get save statistics
  getSaveStats() {
    const saveData = this.loadGame();
    return {
      saveExists: this.hasSaveData(),
      playerLevel: saveData.player ? saveData.player.level : 1,
      playtime: this.formatPlaytime(saveData.statistics ? saveData.statistics.totalPlaytime || 0 : 0),
      battlesWon: saveData.progress ? saveData.progress.battlesWon || 0 : 0,
      lastSaved: new Date(saveData.timestamp || Date.now()).toLocaleString()
    };
  }

  // Format playtime for display
  formatPlaytime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  }

  // Cleanup
  destroy() {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }
  }
}