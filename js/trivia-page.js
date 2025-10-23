import ScreenTransition from "./components/ScreenTransition.js";
import game from "./components/Game.js";
import currentUser from "./components/CurrentUser.js";
import previousUsers from "./components/PreviousUsers.js";

ScreenTransition.init();

//import dropdown from "./components/Dropdown.js";

const triviaText = document.getElementById('trivia');
triviaText.innerHTML = `<p>${game} ${currentUser.user}</p>`

