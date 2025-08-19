# 🎮 First Reality

A Final Fantasy inspired turn-based RPG that revisits old school combat mechanics with rogue-like elements.

[![Deploy to GitHub Pages](https://github.com/JonathanJohnson023/First-Reality/actions/workflows/deploy.yml/badge.svg)](https://github.com/JonathanJohnson023/First-Reality/actions/workflows/deploy.yml)

## 🚀 **[Play Now - Live Demo](https://jonathanjohnson023.github.io/First-Reality)**

## ✨ Features

- ✅ **Turn-Based Combat**: Strategic combat system with proper turn mechanics
- ✅ **Party System**: Control 4 unique characters (Knight, Cleric, Archer, Wizard)
- ✅ **Dynamic Enemies**: Random enemy encounters with varying difficulty
- ✅ **Audio Controls**: Volume slider with auto-mute title screen
- ✅ **Visual Feedback**: Damage animations and color-coded health bars
- ✅ **Battle Mechanics**: Attack and defend with damage calculations
- ✅ **Victory/Defeat**: Proper win/lose conditions with battle reset

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

