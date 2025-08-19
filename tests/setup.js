// Test Setup Configuration
const { JSDOM } = require('jsdom');

// Setup DOM environment for testing
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable'
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Mock canvas and WebGL
global.HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  clearRect: jest.fn(),
  fillRect: jest.fn(),
  drawImage: jest.fn(),
  canvas: { width: 800, height: 600 }
}));

// Mock Audio API
global.Audio = jest.fn(() => ({
  play: jest.fn().mockResolvedValue(undefined),
  pause: jest.fn(),
  volume: 0.5,
  muted: false,
  src: ''
}));

// Mock Web Audio API
global.AudioContext = jest.fn(() => ({
  createOscillator: jest.fn(() => ({
    connect: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    frequency: { value: 440, setValueAtTime: jest.fn(), exponentialRampToValueAtTime: jest.fn() },
    type: 'sine'
  })),
  createGain: jest.fn(() => ({
    connect: jest.fn(),
    gain: { value: 1, setValueAtTime: jest.fn(), exponentialRampToValueAtTime: jest.fn() }
  })),
  destination: {},
  currentTime: 0,
  state: 'running',
  resume: jest.fn().mockResolvedValue(undefined)
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

// Mock performance API
global.performance = {
  now: jest.fn(() => Date.now())
};

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 16));

// Console capture for testing
const originalLog = console.log;
global.console._logs = [];
global.console.log = (...args) => {
  global.console._logs.push(args.join(' '));
  originalLog(...args);
};

// Game speed control for testing
global.GAME_SPEED_MULTIPLIER = 10;