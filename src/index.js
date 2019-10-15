import Menu from "./menu";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('menu-canvas');
  new Menu(canvas).start();
});