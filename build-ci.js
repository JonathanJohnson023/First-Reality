#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting CI build process...');

try {
  // Set Node.js options for legacy compatibility
  process.env.NODE_OPTIONS = '--openssl-legacy-provider';
  
  console.log('📦 Node.js version:', process.version);
  console.log('🔧 Using legacy OpenSSL provider');
  
  // Check if dist directory exists
  const distPath = path.join(__dirname, 'dist');
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
    console.log('📁 Created dist directory');
  }
  
  // Run webpack build
  console.log('🔨 Building with webpack...');
  execSync('npx webpack --mode=production --progress', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_OPTIONS: '--openssl-legacy-provider' }
  });
  
  // Verify build output
  if (fs.existsSync(path.join(distPath, 'bundle.js'))) {
    console.log('✅ Build successful! bundle.js created');
    
    // List build artifacts
    const files = fs.readdirSync(distPath);
    console.log('📦 Build artifacts:', files.join(', '));
    
    // Check file sizes
    files.forEach(file => {
      const filePath = path.join(distPath, file);
      const stats = fs.statSync(filePath);
      console.log(`   ${file}: ${(stats.size / 1024).toFixed(1)}KB`);
    });
    
  } else {
    throw new Error('Build failed: bundle.js not found');
  }
  
  console.log('🎉 CI build completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}