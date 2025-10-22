import previousUsers from "../components/PreviousUsers.js";
class CurrentUser {
    constructor(){
        this.user = null;
        this.loginStatus = false;
    }
    setCurrentUser(user){
        this.user = user;
        this.name = user.name;
        const loginArea = document.getElementById('login');
        this.loginStatus = true;
        loginArea.innerHTML = `<h2>Welcome, ${this.name}!</h2>`;

    }
    render(){
        const loginArea = document.getElementById('login');
        
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
                this.setCurrentUser(previousUsers.loginUser(document.getElementById('nameLogin').value, document.getElementById('passwordLogin').value));
                loginOverlay.classList.add('d-none');
        });
        formCreateAccount.addEventListener('submit', (event) => {
            event.preventDefault();
            this.setCurrentUser(previousUsers.newUser(document.getElementById('nameCreate').value, document.getElementById('passwordCreate').value));
            createAccountOverlay.classList.add('d-none'); 

        });
    }
    
}
const currentUser = new CurrentUser();

export default currentUser;