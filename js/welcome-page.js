import dropdown from "./components/Dropdown.js";
import ScreenTransition from "./components/ScreenTransition.js";

ScreenTransition.init();

dropdown.render();

const openLoginBtn = document.getElementById('openLoginBtn');
    const closeLoginBtn = document.getElementById('closeLoginBtn');
    const loginOverlay = document.getElementById('loginOverlay');
    const openCreateAccountBtn = document.getElementById('openCreateAccountBtn');
    const closeCreateAccountBtn = document.getElementById('closeCreateAccountBtn');
    const createAccountOverlay = document.getElementById('createAccountOverlay')

    openLoginBtn.addEventListener('click', () => {
        loginOverlay.classList.remove('d-none');
    });

    closeLoginBtn.addEventListener('click', () => {
        if (!loginOverlay.classList.contains('d-none')){
            loginOverlay.classList.add('d-none');
        }
        if (!createAccountOverlay.classList.contains('d-none')){
            createAccountOverlay.classList.add('d-none');
        }
        
    });

    closeCreateAccountBtn.addEventListener('click', () => {
        if (!loginOverlay.classList.contains('d-none')){
            loginOverlay.classList.add('d-none');
        }
        if (!createAccountOverlay.classList.contains('d-none')){
            createAccountOverlay.classList.add('d-none');
        }
        
    });

    openCreateAccountBtn.addEventListener('click', () => {
        loginOverlay.classList.add('d-none');
        createAccountOverlay.classList.remove('d-none');
    });





