import User from '../components/user.js';

class PreviousUsers {
    constructor(){
        const savedUsers = localStorage.getItem(`previousUsers`);
        this.usersList = savedUsers ? JSON.parse(savedUsers).map((user) => 
            new User(user.name, user.password, user.previousGames)) : [];
    }
    newUser(name, password){
        if (this.checkUserExists(name)){
            console.log('That user name is already taken.');
            return;
        }
        const user = new User(name, password, []);
        this.usersList.push(user);
        this.updateUserStorage();
        return user;
    }
    updateUserStorage(){
        localStorage.setItem('previousUsers', JSON.stringify(this.usersList))
    }
    updateUser(user){
        console.log(user);
        const index = this.usersList.findIndex((userOfList) => userOfList.name === user.name);
        this.usersList[index] = user;
        console.log(this.usersList);

        this.updateUserStorage();
    }
    clearStorage(){
        this.usersList = [];
        this.updateUserStorage();
    }
    checkUserExists(name){
        return this.usersList.some(user => user.name === name);
    }
    loginUser(name, password){
        const user = this.usersList.find(user => user.name === name);
        console.log(user);
        if (!user){
            console.log('User not found.');
            return;
        }
        if (user.password !== password){
            console.log('Incorrect password.');
            return;
        }
        console.log('Login successful.');
            return user;
        
    }
    getUsers(){
        console.log(this.usersList);
        return this.usersList;
    }

}
const previousUsers = new PreviousUsers();

export default previousUsers;