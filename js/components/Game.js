class Game{
    constructor(questions, category, difficulty, amount){
        this.questions = questions
        this.category = category;
        this.difficulty = difficulty;
        this.amount = amount;
    }
    gameStats(date, time, wins){
        this.date = date;
        this.time = time;
        this.wins = wins;

    }
}
export default Game;