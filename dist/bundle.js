/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/char.js":
/*!*********************!*\
  !*** ./src/char.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Character; });
class Character {
  constructor(job, ctx){
    this.level = 1;
    this.health = 100;
    this.job = job;
    this.KO = false;
    this.ctx = ctx
  }

  draw(index, bool){
    console.log("char draw")
    let heightFloat = this.spriteHeight(index)
    if(bool){
      return this.walkForward(index)
    }else if(this.job === "knight"){
      return [0, 0, 48, 64, this.ctx.width * 0.85, this.ctx.height * heightFloat + this.ctx.height * 0.3]
    }else if(this.job === "cleric"){
      return [0, 0, 47, 64, this.ctx.width * 0.85, this.ctx.height * heightFloat + this.ctx.height * 0.3]
    }else if(this.job === "archer"){
      return [0, 0, 64, 64, this.ctx.width * 0.85, this.ctx.height * heightFloat + this.ctx.height * 0.3]
    }else if(this.job === "wizard"){
      return [0, 0, 42, 64, this.ctx.width * 0.85, this.ctx.height * heightFloat + this.ctx.height * 0.3]
    }
  }

  walkForward(index){
    let heightFloat = this.spriteHeight(index)
    if(this.job === "knight"){
      return [48, 0, 48, 64, this.ctx.width * 0.75, this.ctx.height * heightFloat + this.ctx.height * 0.3]
    }else if(this.job === "cleric"){
      return [0, 0, 47* 2, 64, this.ctx.width * 0.75, this.ctx.height * heightFloat + this.ctx.height * 0.3]
    }else if(this.job === "archer"){
      return [0, 0, 64* 2, 64, this.ctx.width * 0.75, this.ctx.height * heightFloat + this.ctx.height * 0.3]
    }else if(this.job === "wizard"){
      return [0, 0, 42 * 2, 64, this.ctx.width * 0.75, this.ctx.height * heightFloat + this.ctx.height * 0.3]
    }
  }

  attack(){

  }

  spriteHeight(int){
    let numFloat = int + int * 0.5
    let num = Number(numFloat.toString().replace('.',''))
    return parseFloat(`0.${num}`)
  }


}

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var _char__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./char */ "./src/char.js");

class Game {
  constructor(ctx){
    this.party = []
    this.enemies = [];
    this.wave = 0;
    this.currentChar = null;
    this.ctx = ctx;
    
    this.draw = this.draw.bind(this);
  }

  draw(ctx){
    this.drawBackground(ctx);
    this.drawSprites(ctx);
    document.body.addEventListener("animationend" , () => {
      document.body.style.backgroundColor = "black";
    })
  }

  start(){
    console.log("hello from game")
    const knight = new _char__WEBPACK_IMPORTED_MODULE_0__["default"]("knight", this.ctx);
    const cleric = new _char__WEBPACK_IMPORTED_MODULE_0__["default"]("cleric", this.ctx);
    const archer = new _char__WEBPACK_IMPORTED_MODULE_0__["default"]("archer", this.ctx);
    const wizard = new _char__WEBPACK_IMPORTED_MODULE_0__["default"]("wizard", this.ctx);
    this.party.push(knight, cleric, archer, wizard);
  } 
  
  drawBackground(ctx){
    const background = new Image()
      background.src = "battle_backgrounds.png"
    ctx.drawImage(background, 522, 5, 270, 155, 0, 0, ctx.width, ctx.height)

  } 

  drawSprites(ctx){
    let current = this.currentChar
    this.party.forEach((obj, index) => {

      let sprite = new Image();
      sprite.src = `image${index}.png`;
      let cord = current === index ? obj.draw(index, true) : obj.draw(index);
      ctx.drawImage(sprite, ...cord , 125, 125 )
    })
  }

  addEnemy(){

  }

  


}

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameRouter; });
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu */ "./src/menu.js");

class GameRouter {
  constructor(menu,game,tutorial,canvas){  
    this.menu = menu;
    this.game = game;
    this.tutorial = tutorial;
    this.ctx = canvas.getContext("2d");
    this.menuCtx = canvas.getContext("2d")
    this.lastTime = 0;
    this.title = document.getElementById("title-screen-text-wrapper")
  }


  start(){
    const menu = document.getElementById("menu")
    menu.addEventListener('mouseover', this.menu.selectMouseOver)
    menu.addEventListener('click', (e) => { this.selectEventCallback(e) })
    document.addEventListener('keydown', (e) => { this.selectEventCallback(e) })

  }

  selectEventCallback(e){
    const menu = document.getElementById("menu")
    if(e.keyCode == 13 && !menu.classList.contains("none")){
      this.select(this.menu.keyPressed(e))
    }else if(e.type == "click"){
      this.select(this.menu.selectMouseClick(e))
    }else{
      return this.menu.keyPressed(e)
    }
  }

  select(selection){
    if (selection.innerText === "Start Game" ) {
      const titleAudio = document.getElementById("title-audio")
      this.title.classList.remove("appearing");
      this.title.classList.add("disappearing");
      titleAudio.volume = 0.3
      
      this.title.addEventListener("animationend", () => {
        this.title.classList.add("none");
        titleAudio.pause();      
        document.getElementById("battleView").classList.remove("none");
      }, {once: true})
      this.game.start();
      requestAnimationFrame(this.gameAnimate.bind(this));

    }else if(selection.innerText === "How To Play"){ 
      const menu = new _menu__WEBPACK_IMPORTED_MODULE_0__["default"]("")
      this.tutorial.start(menu)
    }
  }

  gameAnimate(time) {
    // const timeDelta = time - this.lastTime;
    this.ctx.width  = window.innerWidth;
    this.ctx.height = window.innerHeight;
    this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height);
    // this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.gameAnimate.bind(this));
  };


}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu */ "./src/menu.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _tutorial__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tutorial */ "./src/tutorial.js");
/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game_view */ "./src/game_view.js");






document.addEventListener("DOMContentLoaded", () => {
  const menuClass = new _menu__WEBPACK_IMPORTED_MODULE_0__["default"]('#menu li')
  const tutorial = new _tutorial__WEBPACK_IMPORTED_MODULE_2__["default"]
  const canvas = document.getElementById("battle-view");
  const menuCanvas = document.getElementById("battle-menu")
  const theGame = new _game__WEBPACK_IMPORTED_MODULE_1__["default"](canvas)
  canvas.width  = window.innerWidth * 0.85;
  canvas.height = window.innerHeight * 0.80;
  menuCanvas.width  = canvas.width - 50;
  menuCanvas.height = window.innerHeight - canvas.height - 50;
  const gameRouter = new _game_view__WEBPACK_IMPORTED_MODULE_3__["default"](menuClass, theGame, tutorial, canvas, menuCanvas)

  let i = 0
  let titleScreenBool = true
  menuClass.selection(0);

  if(titleScreenBool){
    let titleScreen = document.getElementById("press-start")
    console.log("remounted")
    titleScreenBool = false
     document.body.addEventListener('keydown', function(e){
      if(e.keyCode == 13){
        titleScreen.classList.remove("title-screen-appearing");
        menuClass.cursorSelect.play()
        titleScreen.classList.add("title-screen-disappear");
      }
    });
    titleScreen.addEventListener("animationend", function(){
      i += 1
      if(i === 1){ return }
      document.getElementById("title-screen-controller").classList.add("none");
      gameRouter.start()
      document.getElementById("title-screen-menu").classList.remove("none");
      document.getElementById("title-audio").play();
    })
  }

});

/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Menu; });
class Menu {
  constructor(querySelec){
    this.tokenMenu = 0

    this.cursor = document.createElement('img');
      this.cursor.className = 'selected';
      this.cursor.src = 'https://www.dropbox.com/s/1pq4d1ksjv3tuoz/FF7Cursor.png?raw=1';

    this.divShadow = document.createElement('div'); //shadow of the hand cursor.
      this.divShadow.className = 'shadow';

    this.cursorMove = new Audio(); //move sound.
      this.cursorMove.src ="https://www.dropbox.com/s/fiyx4q2mdwynraj/FF7CursorMove.mp3?raw=1";
      
    this.cursorSelect = new Audio();
      this.cursorSelect.src = 'https://www.dropbox.com/s/v04ewrevpnnsz03/FF7CursorSaveLoad.mp3?raw=1';

    this.menuItems = document.querySelectorAll(`${querySelec}`);

    this.selectMouseOver = this.selectMouseOver.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.selectMouseClick = this.selectMouseClick.bind(this);

  }

  selectMouseOver(e){
    e.preventDefault();
    if(e.target.parentNode.id == 'menu'){
      this.tokenMenu = parseInt(e.target.getAttribute("number"));
      this.selection(this.tokenMenu);
      this.cursorMove.play();
    }
  }

  selectMouseClick(e){
    e.preventDefault();
    if(e.target.parentNode.id == 'menu'){
      this.tokenMenu = parseInt(e.target.getAttribute("number"));
      this.cursorSelect.play();
      return this.menuItems[this.tokenMenu]
    }
  }

  keyPressed(e){
    e.preventDefault();
    if(e.keyCode == 38){  //ArrowUp
      this.tokenMenu > 0 ? this.tokenMenu -=1 : this.tokenMenu = 1
      this.selection(this.tokenMenu);
      this.cursorMove.play();
    } else if(e.keyCode == 40){ //ArrowDown
      this.tokenMenu < 1 ? this.tokenMenu +=1 : this.tokenMenu = 0
      this.selection(this.tokenMenu);
      this.cursorMove.play();
    } else if(e.keyCode == 13){
      this.cursorSelect.play();
      return this.menuItems[this.tokenMenu]
    }
  }

  selection(tokenMenu){
    this.menuItems[tokenMenu].prepend(this.cursor); //Prepend element before the selected target.
    this.menuItems[tokenMenu].prepend(this.divShadow); 
  }

  select(selectedNumber){
    return this.menuItems[selectedNumber]
  }

}

/***/ }),

/***/ "./src/tutorial.js":
/*!*************************!*\
  !*** ./src/tutorial.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tutorial; });
class Tutorial{
  constructor(menu){
    this.menu = menu
  }

  start(){
    console.log("hello from derp you derp")
    console.log(this.menu)
    this.menu
  }

  
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map