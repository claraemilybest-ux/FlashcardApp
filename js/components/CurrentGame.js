import Game from "../components/Game.js";

class CurrentGame{
    constructor(){
        const savedCurrent = JSON.parse(localStorage.getItem(`currentGame`));
        console.log(savedCurrent);
        if (savedCurrent){
            this.game = new Game (savedCurrent.questions, savedCurrent.category, savedCurrent.difficulty, savedCurrent.amount);
        }
        
    }
    setCurrentGame(questions, category, difficulty, amount){
        this.game = new Game(questions, category, difficulty, amount);
        localStorage.setItem('currentGame', JSON.stringify(this.game));

    }
    render(){
        const trivia = document.getElementById('trivia');
        this.questions = this.game.questions;
        console.log(this.questions);
        for (let i = this.questions.length -1; i >= 0; i--){
            const currentQuestion = this.questions[i];
            
            let answers = [];
            answers.push({text: currentQuestion.correct_answer, correct: true})

            const incorrect = currentQuestion.incorrect_answers;
            for (let k = incorrect.length -1; k >= 0; k--){
                answers.push({text: incorrect[k], correct: false})

            }
            console.log(answers);
            answers = this.shuffleAnswers(answers);
            console.log(answers);
            
            trivia.innerHTML = `
            <h1 class="row d-flex justify-content-center">${this.game.questions.question}</h1>
        
            <div class="row">
                <button class="answer answer1 col m-1">wrong</button>
                <button class="answer answer2 col m-1">wrong</button>
            </div>
            <div class="row">
                <button class="answer answer3 col m-1">wrong</button>
                <button class="answer answer4 col m-1">right</button>
            </div>
            `;
        }
    }
    shuffleAnswers(array){
        //shuffle questions
        for (let i = array.length -1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    endGame(){
        const date = new Date().getTime();
        this.game.gameStats(date, time, wins);
    }
}
const currentGame = new CurrentGame();

export default currentGame;