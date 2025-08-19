# 🎮 First Reality

A Final Fantasy inspired turn-based RPG that revisits old school combat mechanics with rogue-like elements.

[![Deploy to GitHub Pages](https://github.com/JonathanJohnson023/First-Reality/actions/workflows/deploy.yml/badge.svg)](https://github.com/JonathanJohnson023/First-Reality/actions/workflows/deploy.yml)

## 🚀 **[Play Now - Live Demo](https://jonathanjohnson023.github.io/First-Reality)**

## ✨ Features

### 🎮 **Core Gameplay**
- ✅ **Turn-Based Combat**: Strategic combat system with proper turn mechanics
- ✅ **Party System**: Control 4 unique characters (Knight, Cleric, Archer, Wizard)
- ✅ **Dynamic Enemies**: Random enemy encounters with varying difficulty
- ✅ **99 Level Progression**: Exponential leveling with stat growth
- ✅ **Skill Trees**: 20+ unique abilities across 4 character classes
- ✅ **Equipment System**: Weapons, armor, and accessories with stat bonuses

### 🔊 **Audio Experience**
- ✅ **Professional Sound System**: Web Audio API with 15+ procedural sound effects
- ✅ **Volume Controls**: Premium volume slider with glassmorphism design
- ✅ **Auto-Mute Title Screen**: Respects user preferences (starts muted)
- ✅ **Dynamic Audio**: Unique sounds for each character class and action
- ✅ **Fade Transitions**: Smooth audio transitions between game states

### 💾 **Save System**
- ✅ **Advanced Save/Load**: Local storage with automatic backup system
- ✅ **Auto-Save**: Configurable automatic saving every 60 seconds
- ✅ **Import/Export**: Backup saves to files for portability
- ✅ **Statistics Tracking**: Comprehensive gameplay analytics
- ✅ **Achievement System**: Unlockable rewards and progression tracking

### 🎨 **Visual & UI**
- ✅ **Premium Animations**: 15+ smooth animations for combat and effects
- ✅ **Damage Numbers**: Floating combat feedback with critical hit effects
- ✅ **Health Color Coding**: Visual health status indicators (green/yellow/red)
- ✅ **Loading Screens**: Professional loading experience with progress bars
- ✅ **Responsive Design**: Adapts seamlessly to all screen sizes

### 📱 **Mobile Support**
- ✅ **Touch Controls**: Virtual D-pad and action buttons
- ✅ **Responsive Layout**: Optimized for phones and tablets
- ✅ **Gesture Support**: Swipe and tap interactions
- ✅ **60fps Performance**: Smooth gameplay on mobile devices

### ⚔️ **Advanced Combat**
- ✅ **Critical Hits**: 15% chance for 2x damage with special effects
- ✅ **Elemental Magic**: Fire, Ice, Lightning spells with unique properties
- ✅ **Status Effects**: Poison, Slow, Stun, Buffs, and Debuffs
- ✅ **Multi-Target Skills**: Area attacks and group healing abilities
- ✅ **Skill Prerequisites**: Unlock advanced abilities through progression

## 🎯 One-Command Setup

```bash
npm install && npm start
```

Then open: **http://localhost:8000**

## 🛠️ Development

### Prerequisites
- Node.js (v14+ recommended)
- Python 3 (for local server)

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd first-reality

# Install dependencies
npm install

# Development mode (with file watching)
npm run dev

# Production build
npm run build

# Start local server
npm run serve
```

## 🎮 Controls

| Control | Action |
|---------|--------|
| **Arrow Keys** | Navigate menus |
| **Enter** | Select menu items |
| **Volume Slider** | Control audio (top-right) |
| **🔊/🔇 Button** | Toggle mute |

## ⚔️ Game Mechanics

### Combat System
- **Turn Order**: All party members act → All enemies act → Repeat
- **Actions**: 
  - **Attack**: Deal 15-45 damage to random enemy
  - **Defend**: Reduce incoming damage by 50%
- **Health**: Color-coded bars (Green → Yellow → Red)
- **Victory**: Defeat all enemies
- **Defeat**: All party members reach 0 HP

### Characters
- **Knight**: Balanced fighter
- **Cleric**: Support character  
- **Archer**: Ranged attacker
- **Wizard**: Magic user

## 🚢 Deployment

### GitHub Pages (Automatic)
1. Push to `main` branch
2. GitHub Actions builds and deploys automatically
3. Access at: `https://jonathanjohnson023.github.io/First-Reality`

### Manual Deployment
```bash
npm run build
# Upload contents to your web server
```

## 📁 Project Structure

```
first-reality/
├── src/                 # Source code
│   ├── index.js        # Main entry point
│   ├── game.js         # Game logic
│   ├── char.js         # Character system
│   ├── monster.js      # Enemy system
│   ├── menu.js         # Menu system
│   └── game_view.js    # View controller
├── styles/             # CSS styles
├── assets/             # Game assets
├── dist/               # Built files
├── .github/workflows/  # CI/CD pipeline
└── index.html          # Main HTML file
```

## 🔧 Technical Details

- **Engine**: Vanilla JavaScript with HTML5 Canvas
- **Build Tool**: Webpack 4
- **Deployment**: GitHub Pages with Actions
- **Compatibility**: Modern browsers with ES6+ support

## 🎨 Screenshots

*Combat System*
- Turn-based battles with visual feedback
- Health tracking and damage animations
- Strategic defend mechanics

*Audio Controls*
- Volume slider in top-right corner
- Auto-mute title screen
- User-controlled audio experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm start`
5. Create a pull request
6. GitHub Actions will auto-deploy on merge

## 📜 License

ISC License - Feel free to use and modify!

---

**Ready to play?** → **[Launch Game](https://jonathanjohnson023.github.io/First-Reality)** 🎮

