import ScreenTransition from "./components/ScreenTransition.js";
import game from "./components/Game.js";
import currentUser from "./components/CurrentUser.js";
import previousUsers from "./components/PreviousUsers.js";
import currentGame from "./components/CurrentGame.js";

ScreenTransition.init();

//import dropdown from "./components/Dropdown.js";

currentGame.render();
console.log(currentGame);

const trivia = document.getElementById('trivia');
//trivia.innerHTML = `<p>${game} ${currentUser.user}</p>`

