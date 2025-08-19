#!/usr/bin/env node

// Script to check GitHub Pages setup
console.log('🔍 GitHub Pages Setup Checker');
console.log('==============================');

console.log('📋 Required Settings:');
console.log('1. Repository Settings → Pages');
console.log('2. Source: "Deploy from a branch"');
console.log('3. Branch: "gh-pages"');
console.log('4. Folder: "/ (root)"');
console.log('5. Repository must be PUBLIC');

console.log('\n🌐 URLs to check:');
console.log('- Settings: https://github.com/JonathanJohnson023/First-Reality/settings/pages');
console.log('- Production: https://jonathanjohnson023.github.io/First-Reality/');
console.log('- Feature Preview: https://jonathanjohnson023.github.io/First-Reality/preview/feature/world-class-game-upgrade/');

console.log('\n🔧 If 404 persists:');
console.log('1. Check repository is public');
console.log('2. Verify gh-pages branch exists');
console.log('3. Ensure index.html is in the root');
console.log('4. Wait 5-10 minutes after deployment');
console.log('5. Clear browser cache');

console.log('\n✅ This script completed successfully!');