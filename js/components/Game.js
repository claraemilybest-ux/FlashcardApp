class Game{
    constructor(){
        this.questions
        this.date
        this.time
        this.category
        this.difficulty
    }
    newGame(questions, category, difficulty){
        this.questions = questions;
        this.category = category;
        this.difficulty = difficulty;
    }
}
const game = new Game();
export default game;