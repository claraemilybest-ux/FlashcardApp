import previousUsers from "../components/PreviousUsers.js";
import User from "./user.js";
class CurrentUser {
    constructor(){
        const savedCurrent = JSON.parse(localStorage.getItem(`currentUser`));
        console.log(savedCurrent);
        
        if (!savedCurrent){
            this.loginStatus = false;
        } else{
            this.user = new User (savedCurrent.name, savedCurrent.password, savedCurrent.previousGames);
        }
    }
    setCurrentUser(user){
        if (!user){
            // invalid login or user creation failed
            const loginArea = document.getElementById('login');
            if (loginArea) loginArea.classList.remove('d-none');
            console.warn('No user provided to setCurrentUser');
            return;
        }
        this.user = user;
        this.loginStatus = true;
        try {
            localStorage.setItem('currentUser', JSON.stringify(this.user));
        } catch (e) {
            console.warn('Could not persist currentUser to localStorage', e);
        }
        // re-render the login area to show the logged-in state
        this.render();

    }
    saveGame(game){
        this.user.previousGames.push(game);
        console.log(this.user);
        previousUsers.updateUser(this.user);
        // persist the updated current user so other pages (e.g. stats) see the new game
        try {
            localStorage.setItem('currentUser', JSON.stringify(this.user));
        } catch (e) {
            console.warn('Could not persist currentUser to localStorage', e);
        }
        console.log('gameSaved');
    }
    displayStats(){
        //display user
        const statsArea = document.getElementById('stats');
        if (!this.user){
            statsArea.innerHTML = `
                <div>No user logged in. <a href="index.html">Go to home</a></div>
            `;
            return;
        }

        statsArea.innerHTML = `
        <div id="userDisplay">${this.user.name}</div>
        <div id="gamesDisplay">
        <h3>Past Games</h3>
        </div>
        <div id="statsDisplay"></div>
        <button id="newGame">New Game</button>
        `;

        let totalGames = this.user.previousGames.length;
        let totalWins = 0;
        let totalQuestions = 0;
        let fastestTime = null;

        //past games
        this.user.previousGames.forEach((game) => {
            const gameStats = document.createElement('div');
            gameStats.classList.add('flex-column', 'mb-3', 'p-2', 'border', 'border-secondary', 'rounded');
            gameStats.innerHTML = `
            Game:
            Category: ${game.category}, Difficulty: ${game.difficulty}, Date: ${game.date},  
            Score: ${game.wins}/${game.amount}, Time taken: ${game.time.minutes}:${game.time.seconds}
            `;
            document.getElementById('gamesDisplay').appendChild(gameStats);
            totalWins += game.wins;
            totalQuestions += game.questions.length;
            if (!fastestTime || (game.time.minutes * 60 + game.time.seconds) < (fastestTime.minutes * 60 + fastestTime.seconds)){
                fastestTime = game.time;
            }
            
        });

        //date
        //score
        //time
        //category
        //difficulty

        //stats
        const statsDisplay = document.getElementById('statsDisplay');
        statsDisplay.innerHTML = `
        <h3>Statistics</h3>
        <div>Total Games Played: ${totalGames}</div>
        <div>Average Score: ${totalGames > 0 ? ((totalWins / totalQuestions) * 100).toFixed(2) : 0}%</div>
        <div>Fastest Time: ${fastestTime ? `${fastestTime.minutes}:${fastestTime.seconds}` : 'N/A'}</div>
        `;
        //total games played
        //average score
        //fastest time

        //button to welcome page
        const newGame = document.getElementById('newGame');
        newGame.addEventListener('click', ()=> {
            window.location.href = 'index.html';
        });
    }
    render(){
        const loginArea = document.getElementById('login');
        if (!loginArea) return;

        // If user is logged in, show name + logout button
        if (this.user){
            loginArea.innerHTML = `
                <div id="userInfo">
                    <span class="me-2">Signed in: ${this.user.name}</span>
                    <button id="logoutBtn" class="btn btn-sm btn-outline-secondary">Log out</button>
                </div>
            `;
            const logoutBtn = document.getElementById('logoutBtn');
            logoutBtn.addEventListener('click', () => this.logout());
            return;
        }

        loginArea.innerHTML = `
        <div id="loginOverlay" class="d-none bg-light">
            <h2>Sign In</h2>
            <form id="formLogin">
            <div>
                <label for="name">User Name</label>
                <input type="name" name="name" id="nameLogin" placeholder="username123" required />
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" name="password" id="passwordLogin" placeholder="••••••••" required />
            </div>
                        
            <button type="submit">Login</button>      
            </form>
            <button id="openCreateAccountBtn">Create a Account</button>
            <button id="closeLoginBtn">Back</button>
        </div>
        <div id="createAccountOverlay" class="d-none bg-light">
            <h2>Create a Account</h2>
            <form id="formCreateAccount">
            <div>
                <label for="name">User Name</label>
                <input type="name" name="name" id="nameCreate" placeholder="username123" required />
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" name="password" id="passwordCreate" placeholder="••••••••" required />
            </div>
                        
            <button type="submit">Create</button>      
            </form>
            <button id="closeCreateAccountBtn">Back</button>
        </div>
        <button id="openLoginBtn" type="button" >Sign In</button>
        `;
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
        });

        closeCreateAccountBtn.addEventListener('click', () => {
            if (!createAccountOverlay.classList.contains('d-none')){
                createAccountOverlay.classList.add('d-none');
            }
        });

        openCreateAccountBtn.addEventListener('click', () => {
            loginOverlay.classList.add('d-none');
            createAccountOverlay.classList.remove('d-none');
        });
        const formCreateAccount = document.getElementById('formCreateAccount');
        const formLogin = document.getElementById('formLogin');
        formLogin.addEventListener('submit', (event) => {
                event.preventDefault();
                const user = previousUsers.loginUser(document.getElementById('nameLogin').value, document.getElementById('passwordLogin').value);
                if (!user){
                    // show a simple inline message for failed login
                    alert('Login failed: check username/password');
                    return;
                }
                this.setCurrentUser(user);
                if (loginOverlay) loginOverlay.classList.add('d-none');
        });
        formCreateAccount.addEventListener('submit', (event) => {
            event.preventDefault();
            const newUser = previousUsers.newUser(document.getElementById('nameCreate').value, document.getElementById('passwordCreate').value);
            if (!newUser){
                alert('Could not create user. Name may already be taken.');
                return;
            }
            this.setCurrentUser(newUser);
            if (createAccountOverlay) createAccountOverlay.classList.add('d-none'); 

        });
    }
    logout(){
        // clear current user and update UI
        try { localStorage.removeItem('currentUser'); } catch(e){}
        this.user = null;
        this.loginStatus = false;
        this.render();
    }
    
}
const currentUser = new CurrentUser();

export default currentUser;