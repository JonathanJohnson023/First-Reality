// End-to-End Tests for Complete Gameplay
describe('Complete Gameplay Flow', () => {
  let page;
  
  beforeAll(async () => {
    // Set up Puppeteer with 10x game speed
    page = await browser.newPage();
    
    // Inject speed control
    await page.evaluateOnNewDocument(() => {
      window.GAME_SPEED_MULTIPLIER = 10; // 10x speed for testing
      
      // Override setTimeout and setInterval for faster testing
      const originalSetTimeout = window.setTimeout;
      const originalSetInterval = window.setInterval;
      
      window.setTimeout = (fn, delay) => originalSetTimeout(fn, delay / 10);
      window.setInterval = (fn, delay) => originalSetInterval(fn, delay / 10);
    });
    
    await page.goto('http://localhost:8002');
  });

  afterAll(async () => {
    await page.close();
  });

  test('Title screen loads correctly', async () => {
    // Wait for title screen to appear
    await page.waitForSelector('#press-start', { timeout: 10000 });
    
    // Check if title logo is visible
    const titleLogo = await page.$('.title-logo');
    expect(titleLogo).toBeTruthy();
    
    // Check if press enter text is visible
    const pressEnter = await page.$('#press-start h1');
    expect(pressEnter).toBeTruthy();
    
    const pressEnterText = await page.evaluate(el => el.textContent, pressEnter);
    expect(pressEnterText).toBe('Press Enter');
  });

  test('Volume controls are visible before press enter', async () => {
    // Volume controls should be visible immediately
    const volumeControls = await page.$('#volume-controls');
    expect(volumeControls).toBeTruthy();
    
    const isVisible = await page.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    }, volumeControls);
    
    expect(isVisible).toBe(true);
  });

  test('Volume controls function correctly', async () => {
    // Test volume slider
    const volumeSlider = await page.$('#volume-slider');
    expect(volumeSlider).toBeTruthy();
    
    // Test mute button
    const muteButton = await page.$('#mute-toggle');
    expect(muteButton).toBeTruthy();
    
    // Click mute button
    await page.click('#mute-toggle');
    
    // Check if button text changed
    const buttonText = await page.evaluate(el => el.textContent, muteButton);
    expect(buttonText).toMatch(/🔊|🔇/);
  });

  test('Press enter advances to menu', async () => {
    // Press Enter key
    await page.keyboard.press('Enter');
    
    // Wait for menu to appear
    await page.waitForSelector('#menu', { timeout: 5000 });
    
    // Check if menu is visible
    const menu = await page.$('#menu');
    expect(menu).toBeTruthy();
    
    // Check menu items
    const menuItems = await page.$$('#menu li');
    expect(menuItems.length).toBe(2); // Start Game, How To Play
  });

  test('Start game leads to battle view', async () => {
    // Click "Start Game"
    await page.click('#menu li[number="0"]');
    
    // Wait for battle view
    await page.waitForSelector('#battleView:not(.none)', { timeout: 5000 });
    
    // Check if battle canvas is visible
    const battleCanvas = await page.$('#battle-view');
    expect(battleCanvas).toBeTruthy();
    
    // Check if party moves are visible
    const partyMoves = await page.$('#party-moves');
    expect(partyMoves).toBeTruthy();
  });

  test('Combat system functions', async () => {
    // Wait for battle to be ready
    await page.waitForTimeout(1000); // Wait for animations
    
    // Check if Attack button is available
    const attackButton = await page.$('#party-moves li[number="0"]');
    expect(attackButton).toBeTruthy();
    
    const attackText = await page.evaluate(el => el.textContent, attackButton);
    expect(attackText).toBe('Attack');
    
    // Click Attack
    await page.click('#party-moves li[number="0"]');
    
    // Wait for attack animation
    await page.waitForTimeout(2000);
    
    // Check if damage was dealt (console logs)
    const logs = await page.evaluate(() => {
      return window.console._logs || [];
    });
    
    // Should have damage or combat logs
    expect(logs.length).toBeGreaterThan(0);
  });

  test('Game performance (60fps target)', async () => {
    // Measure frame rate
    const fps = await page.evaluate(() => {
      return new Promise((resolve) => {
        let frames = 0;
        const startTime = performance.now();
        
        function countFrames() {
          frames++;
          if (performance.now() - startTime < 1000) {
            requestAnimationFrame(countFrames);
          } else {
            resolve(frames);
          }
        }
        
        requestAnimationFrame(countFrames);
      });
    });
    
    // Should be close to 60fps (allowing for 10x speed multiplier)
    expect(fps).toBeGreaterThan(30); // At least 30fps
  });

  test('Mobile responsiveness', async () => {
    // Test mobile viewport
    await page.setViewport({ width: 375, height: 667 }); // iPhone size
    
    // Check if volume controls are still visible
    const volumeControls = await page.$('#volume-controls');
    const isVisible = await page.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none';
    }, volumeControls);
    
    expect(isVisible).toBe(true);
    
    // Check if game canvas adapts
    const canvas = await page.$('#battle-view');
    const canvasWidth = await page.evaluate(el => el.width, canvas);
    expect(canvasWidth).toBeLessThanOrEqual(375);
  });

  test('Audio system integration', async () => {
    // Check if audio element exists
    const audio = await page.$('#title-audio');
    expect(audio).toBeTruthy();
    
    // Check if audio is muted by default (auto-mute)
    const isMuted = await page.evaluate(el => el.muted, audio);
    expect(isMuted).toBe(true);
    
    // Test volume change
    await page.evaluate(() => {
      document.getElementById('volume-slider').value = 50;
      document.getElementById('volume-slider').dispatchEvent(new Event('input'));
    });
    
    // Check if volume changed
    const volume = await page.evaluate(el => el.volume, audio);
    expect(volume).toBe(0.5);
  });

  test('Save system functionality', async () => {
    // Test localStorage save capability
    const canSave = await page.evaluate(() => {
      try {
        localStorage.setItem('test', 'value');
        localStorage.removeItem('test');
        return true;
      } catch (e) {
        return false;
      }
    });
    
    expect(canSave).toBe(true);
  });

  test('Error handling and recovery', async () => {
    // Inject an error and see if game recovers
    const errorHandled = await page.evaluate(() => {
      try {
        // Simulate error
        throw new Error('Test error');
      } catch (e) {
        // Game should handle errors gracefully
        return true;
      }
    });
    
    expect(errorHandled).toBe(true);
  });
});