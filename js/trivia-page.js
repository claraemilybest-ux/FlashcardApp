import ScreenTransition from "./components/ScreenTransition.js";
import game from "./components/Game.js";

ScreenTransition.init();

//import dropdown from "./components/Dropdown.js";

const triviaText = document.getElementById('trivia');
triviaText.innerHTML = `<p>${game}</p>`
console.log(game);
