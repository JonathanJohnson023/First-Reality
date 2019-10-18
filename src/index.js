import Menu from "./menu";


document.addEventListener("DOMContentLoaded", () => {
  const menuClass = new Menu('#menu li')
  const menu = document.getElementById("menu")
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
        titleScreen.classList.add("title-screen-disappear");
        menu.addEventListener('mouseover', menuClass.selectMouseOver)
        document.addEventListener('keydown', menuClass.keyPressed)
      }
    });
    titleScreen.addEventListener("animationend", function(){
      i += 1
      if(i === 1){ return }
      document.getElementById("title-screen-controller").classList.add("none");
      document.getElementById("title-screen-menu").classList.remove("none");
      document.getElementById("title-audio").play();
    })
  }

});