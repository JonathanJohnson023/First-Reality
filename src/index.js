import Menu from "./menu";

document.addEventListener("DOMContentLoaded", () => {
  let titleScreenBool = true
  const menuClass = new Menu()
  menuClass.selection(0);
  const menu = document.getElementById("menu")
  menu.addEventListener('mouseover', menuClass.selectMouseOver)
  document.addEventListener('keydown', menuClass.keyPressed)

  if(titleScreenBool){
    let titleScreen = document.getElementById("press-start")
    console.log("remounted")
    titleScreenBool = false
    document.body.addEventListener('click', function(){
      titleScreen.classList.remove("title-screen-appearing");      
      titleScreen.classList.add("title-screen-disappear");
    });
    let i = 0
    titleScreen.addEventListener("animationend", function(){
      i += 1
      if(i === 1) return 
      document.getElementById("title-screen-controller").classList.add("none");
      document.getElementById("title-screen-menu").classList.remove("none");
      document.getElementById("title-audio").play();
    })
  }

});