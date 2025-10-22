import User from './user';

class PreviousUsers {
    constructor(){
        const savedUsers = localStorage.getItem(`previousUsers`);
        this.usersList = savedCartItems ? JSON.parse(savedUsers).map((user) => 
            new User(user.name, password, previousGames, generalStatistics)) : [];
    }
    newUser(name, password){
        const user = new User(name, password, [], {});
        if (this.checkUserExists(name)){
            console.log('That user name is already taken.');
            return;
        }
        this.usersList.push(user);
        this.updateUserStorage();
    }
    updateUserStorage(){
        localStorage.setItem('previousUsers', JSON.stringify(this.usersList))
    }
    checkUserExists(name){
        return this.usersList.some(user => user.name === name);
    }
    loginUser(name, password){
        const user = this.usersList.find(user => user.name === name);
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

}
const previousUsers = new PreviousUsers();

export default previousUsers;