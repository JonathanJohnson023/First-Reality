export default class Menu {
  constructor(querySelec){
    this.tokenMenu = 0

    this.cursor = document.createElement('img');
      this.cursor.className = 'selected';
      this.cursor.src = 'https://www.dropbox.com/s/1pq4d1ksjv3tuoz/FF7Cursor.png?raw=1';

    this.divShadow = document.createElement('div'); //shadow of the hand cursor.
      this.divShadow.className = 'shadow';

    this.cursorMove = new Audio(); //move sound.
      this.cursorMove.src ="https://www.dropbox.com/s/fiyx4q2mdwynraj/FF7CursorMove.mp3?raw=1";
      this.cursorMove.volume = 0.4
      
    this.cursorSelect = new Audio();
      this.cursorSelect.src = 'https://www.dropbox.com/s/v04ewrevpnnsz03/FF7CursorSaveLoad.mp3?raw=1';
      this.cursorSelect.volume = 0.4

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