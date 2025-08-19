// Advanced Sound System with Web Audio API
export default class SoundSystem {
  constructor() {
    this.audioContext = null;
    this.masterVolume = 0.3;
    this.musicVolume = 0.5;
    this.sfxVolume = 0.7;
    this.isMuted = true; // Start muted
    
    this.sounds = new Map();
    this.music = new Map();
    this.currentMusic = null;
    this.fadeInterval = null;
    
    this.initializeAudioContext();
    this.createSoundEffects();
  }

  // Initialize Web Audio API
  initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create master gain node
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = this.masterVolume;
      
      // Create separate gain nodes for music and SFX
      this.musicGain = this.audioContext.createGain();
      this.musicGain.connect(this.masterGain);
      this.musicGain.gain.value = this.musicVolume;
      
      this.sfxGain = this.audioContext.createGain();
      this.sfxGain.connect(this.masterGain);
      this.sfxGain.gain.value = this.sfxVolume;
      
      console.log('🎵 Audio Context initialized');
    } catch (error) {
      console.warn('⚠️ Web Audio API not supported, falling back to HTML5 audio');
    }
  }

  // Create procedural sound effects
  createSoundEffects() {
    // Attack sounds
    this.sounds.set('sword_slash', this.createSwordSlash);
    this.sounds.set('magic_cast', this.createMagicCast);
    this.sounds.set('bow_shot', this.createBowShot);
    this.sounds.set('staff_hit', this.createStaffHit);
    
    // UI sounds
    this.sounds.set('menu_select', this.createMenuSelect);
    this.sounds.set('menu_confirm', this.createMenuConfirm);
    this.sounds.set('menu_cancel', this.createMenuCancel);
    
    // Battle sounds
    this.sounds.set('enemy_hit', this.createEnemyHit);
    this.sounds.set('critical_hit', this.createCriticalHit);
    this.sounds.set('heal', this.createHealSound);
    this.sounds.set('level_up', this.createLevelUp);
    this.sounds.set('victory', this.createVictory);
    this.sounds.set('defeat', this.createDefeat);
    
    // Environment sounds
    this.sounds.set('footstep', this.createFootstep);
    this.sounds.set('door_open', this.createDoorOpen);
    this.sounds.set('item_get', this.createItemGet);
  }

  // Play sound effect
  playSound(soundName, volume = 1.0, pitch = 1.0) {
    if (this.isMuted || !this.audioContext) return;
    
    const soundGenerator = this.sounds.get(soundName);
    if (soundGenerator) {
      try {
        soundGenerator.call(this, volume, pitch);
      } catch (error) {
        console.warn(`Failed to play sound: ${soundName}`, error);
      }
    }
  }

  // Create sword slash sound
  createSwordSlash(volume = 1.0, pitch = 1.0) {
    const duration = 0.3;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.sfxGain);
    
    // Sword swoosh effect
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200 * pitch, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100 * pitch, this.audioContext.currentTime + duration);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(500, this.audioContext.currentTime + duration);
    
    gainNode.gain.setValueAtTime(0.3 * volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Create magic cast sound
  createMagicCast(volume = 1.0, pitch = 1.0) {
    const duration = 0.8;
    
    // Create multiple oscillators for magical effect
    for (let i = 0; i < 3; i++) {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const delay = this.audioContext.createDelay();
      
      oscillator.connect(delay);
      delay.connect(gainNode);
      gainNode.connect(this.sfxGain);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime((440 + i * 110) * pitch, this.audioContext.currentTime);
      oscillator.frequency.linearRampToValueAtTime((880 + i * 220) * pitch, this.audioContext.currentTime + duration);
      
      delay.delayTime.value = i * 0.05;
      
      gainNode.gain.setValueAtTime(0.2 * volume, this.audioContext.currentTime + i * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      
      oscillator.start(this.audioContext.currentTime + i * 0.1);
      oscillator.stop(this.audioContext.currentTime + duration);
    }
  }

  // Create bow shot sound
  createBowShot(volume = 1.0, pitch = 1.0) {
    const duration = 0.2;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.sfxGain);
    
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(800 * pitch, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200 * pitch, this.audioContext.currentTime + duration);
    
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 5;
    
    gainNode.gain.setValueAtTime(0.4 * volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Create menu select sound
  createMenuSelect(volume = 1.0, pitch = 1.0) {
    const duration = 0.1;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.sfxGain);
    
    oscillator.type = 'square';
    oscillator.frequency.value = 800 * pitch;
    
    gainNode.gain.setValueAtTime(0.2 * volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Create critical hit sound
  createCriticalHit(volume = 1.0, pitch = 1.0) {
    const duration = 0.5;
    
    // Create dramatic critical hit sound
    for (let i = 0; i < 5; i++) {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.sfxGain);
      
      oscillator.type = i % 2 === 0 ? 'sawtooth' : 'square';
      oscillator.frequency.setValueAtTime((300 + i * 100) * pitch, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime((150 + i * 50) * pitch, this.audioContext.currentTime + duration);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3000, this.audioContext.currentTime);
      filter.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + duration);
      
      gainNode.gain.setValueAtTime(0.15 * volume, this.audioContext.currentTime + i * 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      
      oscillator.start(this.audioContext.currentTime + i * 0.02);
      oscillator.stop(this.audioContext.currentTime + duration);
    }
  }

  // Create heal sound
  createHealSound(volume = 1.0, pitch = 1.0) {
    const duration = 0.6;
    
    // Gentle, uplifting heal sound
    for (let i = 0; i < 4; i++) {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.sfxGain);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime((440 + i * 110) * pitch, this.audioContext.currentTime + i * 0.1);
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + i * 0.1);
      gainNode.gain.linearRampToValueAtTime(0.15 * volume, this.audioContext.currentTime + i * 0.1 + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      
      oscillator.start(this.audioContext.currentTime + i * 0.1);
      oscillator.stop(this.audioContext.currentTime + duration);
    }
  }

  // Create level up sound
  createLevelUp(volume = 1.0, pitch = 1.0) {
    const duration = 1.2;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C, E, G, C (major chord)
    
    notes.forEach((freq, index) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.sfxGain);
      
      oscillator.type = 'triangle';
      oscillator.frequency.value = freq * pitch;
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + index * 0.2);
      gainNode.gain.linearRampToValueAtTime(0.2 * volume, this.audioContext.currentTime + index * 0.2 + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      
      oscillator.start(this.audioContext.currentTime + index * 0.2);
      oscillator.stop(this.audioContext.currentTime + duration);
    });
  }

  // Set master volume
  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : this.masterVolume;
    }
  }

  // Set music volume
  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.musicGain) {
      this.musicGain.gain.value = this.musicVolume;
    }
  }

  // Set SFX volume
  setSFXVolume(volume) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    if (this.sfxGain) {
      this.sfxGain.gain.value = this.sfxVolume;
    }
  }

  // Mute/unmute
  setMuted(muted) {
    this.isMuted = muted;
    if (this.masterGain) {
      this.masterGain.gain.value = muted ? 0 : this.masterVolume;
    }
  }

  // Play music with fade in
  playMusic(audioElement, fadeInTime = 1.0) {
    if (this.isMuted) return;
    
    if (this.currentMusic && this.currentMusic !== audioElement) {
      this.fadeOutMusic(this.currentMusic, 0.5);
    }
    
    this.currentMusic = audioElement;
    audioElement.volume = 0;
    audioElement.currentTime = 0;
    
    const playPromise = audioElement.play();
    if (playPromise) {
      playPromise.then(() => {
        this.fadeInMusic(audioElement, fadeInTime);
      }).catch(error => {
        console.warn('Music play failed:', error);
      });
    }
  }

  // Fade in music
  fadeInMusic(audioElement, duration) {
    const targetVolume = this.masterVolume * this.musicVolume;
    const steps = 60; // 60 steps for smooth fade
    const stepTime = duration * 1000 / steps;
    const volumeStep = targetVolume / steps;
    
    let currentStep = 0;
    this.fadeInterval = setInterval(() => {
      currentStep++;
      audioElement.volume = Math.min(volumeStep * currentStep, targetVolume);
      
      if (currentStep >= steps) {
        clearInterval(this.fadeInterval);
      }
    }, stepTime);
  }

  // Fade out music
  fadeOutMusic(audioElement, duration) {
    const initialVolume = audioElement.volume;
    const steps = 60;
    const stepTime = duration * 1000 / steps;
    const volumeStep = initialVolume / steps;
    
    let currentStep = 0;
    const fadeOut = setInterval(() => {
      currentStep++;
      audioElement.volume = Math.max(initialVolume - (volumeStep * currentStep), 0);
      
      if (currentStep >= steps || audioElement.volume <= 0) {
        clearInterval(fadeOut);
        audioElement.pause();
      }
    }, stepTime);
  }

  // Resume audio context (required for user interaction)
  resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().then(() => {
        console.log('🎵 Audio Context resumed');
      });
    }
  }

  // Get audio context state
  getAudioState() {
    return {
      supported: !!this.audioContext,
      state: this.audioContext ? this.audioContext.state : 'unavailable',
      masterVolume: this.masterVolume,
      musicVolume: this.musicVolume,
      sfxVolume: this.sfxVolume,
      isMuted: this.isMuted
    };
  }

  // Cleanup
  destroy() {
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
    }
    
    if (this.currentMusic) {
      this.currentMusic.pause();
    }
    
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  // Additional sound effects (implement remaining sounds)
  createStaffHit(volume = 1.0, pitch = 1.0) {
    // Similar to sword slash but with different frequency profile
    this.createSwordSlash(volume * 0.8, pitch * 0.7);
  }

  createMenuConfirm(volume = 1.0, pitch = 1.0) {
    const duration = 0.15;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.sfxGain);
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(600 * pitch, this.audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(800 * pitch, this.audioContext.currentTime + duration);
    
    gainNode.gain.setValueAtTime(0.25 * volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  createMenuCancel(volume = 1.0, pitch = 1.0) {
    const duration = 0.2;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.sfxGain);
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(400 * pitch, this.audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(200 * pitch, this.audioContext.currentTime + duration);
    
    gainNode.gain.setValueAtTime(0.2 * volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  createEnemyHit(volume = 1.0, pitch = 1.0) {
    // Lower pitched, more aggressive sound
    this.createSwordSlash(volume, pitch * 0.6);
  }

  createVictory(volume = 1.0, pitch = 1.0) {
    // Triumphant fanfare
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C, E, G, C, E
    const duration = 2.0;
    
    notes.forEach((freq, index) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.sfxGain);
      
      oscillator.type = 'triangle';
      oscillator.frequency.value = freq * pitch;
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + index * 0.3);
      gainNode.gain.linearRampToValueAtTime(0.2 * volume, this.audioContext.currentTime + index * 0.3 + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      
      oscillator.start(this.audioContext.currentTime + index * 0.3);
      oscillator.stop(this.audioContext.currentTime + duration);
    });
  }

  createDefeat(volume = 1.0, pitch = 1.0) {
    // Somber defeat sound
    const duration = 1.5;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.sfxGain);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(220 * pitch, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(110 * pitch, this.audioContext.currentTime + duration);
    
    gainNode.gain.setValueAtTime(0.3 * volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  createFootstep(volume = 1.0, pitch = 1.0) {
    // Quick, muffled step sound
    const duration = 0.1;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.sfxGain);
    
    oscillator.type = 'brown';
    filter.type = 'lowpass';
    filter.frequency.value = 200;
    
    gainNode.gain.setValueAtTime(0.1 * volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  createDoorOpen(volume = 1.0, pitch = 1.0) {
    // Creaking door sound
    const duration = 0.8;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.sfxGain);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(150 * pitch, this.audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(200 * pitch, this.audioContext.currentTime + duration);
    
    gainNode.gain.setValueAtTime(0.15 * volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  createItemGet(volume = 1.0, pitch = 1.0) {
    // Pleasant item acquisition sound
    const notes = [523.25, 659.25, 783.99]; // C, E, G
    
    notes.forEach((freq, index) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.sfxGain);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = freq * pitch;
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + index * 0.1);
      gainNode.gain.linearRampToValueAtTime(0.2 * volume, this.audioContext.currentTime + index * 0.1 + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
      
      oscillator.start(this.audioContext.currentTime + index * 0.1);
      oscillator.stop(this.audioContext.currentTime + 0.5);
    });
  }
}