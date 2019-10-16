import Menu from "./menu";
const menuClass = new Menu()
menuClass.selection(0);

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu")
  menu.addEventListener('mouseover', menuClass.selectMouseOver)
  document.addEventListener('keydown', menuClass.keyPressed)
});