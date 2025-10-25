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
        this.questions = this.game.questions;
        this.timerId = null;
        this.wins = 0;
        this.index = this.questions.length;
        this.counter = 0;

        this.startTime = new Date();

        this.nextQuestion();

       
    }
    runQuestion(){
        const currentQuestion = this.questions[this.index];
        const questionDisplay = document.getElementById('gameQuestion');
        questionDisplay.innerHTML = currentQuestion.question;
        //create list to store answers
        let answers = [];

        //add correct answer
        answers.push({text: currentQuestion.correct_answer, correct: true})

        //get incorrect answers and add them to list
        const incorrect = currentQuestion.incorrect_answers;
        for (let k = incorrect.length -1; k >= 0; k--){
            answers.push({text: incorrect[k], correct: false})

        }
        
        //shuffle answers
        answers = this.shuffleAnswers(answers);

        //count how many button to add to a row
        let rowOn = 0;

        //go through all the answers and make their button usable
        answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerHTML = answer.text;
            button.classList.add('answer', 'col', 'm-1');
            if (answer.correct) {
                button.dataset.correct = true;
            }

            //when answer chosen
            button.addEventListener('click', async (event) => {
                if(event.target.dataset.correct === 'true'){
                    this.wins++
                    (document.getElementById('gameQuestion')).innerText = `Correct!`;
                    console.log('win');
                    console.log(this.wins);
                }else{
                    (document.getElementById('gameQuestion')).innerText = `Wrong!`;
                    console.log('lose');
                }

                //wait 2 seconds
                //move to next question
                
                await this.delay(1000);
                this.nextQuestion();
                
                
            });

            if(rowOn < 2){
                document.getElementById('row1').appendChild(button);
            }else{
                document.getElementById('row2').appendChild(button);
            }
            rowOn++
        });

    // preserve `this` by using an arrow wrapper (or use this.nextQuestion.bind(this))
    this.timerId = setTimeout(() => this.nextQuestion(), 10000);
            
    }
    nextQuestion(){
        clearTimeout(this.timerId);
        
        const trivia = document.getElementById('trivia');
        trivia.innerHTML = `
            <h1 id="gameQuestion" class="row d-flex justify-content-center"></h1>
        
            <div id="row1" class="row"></div>
            <div id="row2" class="row"></div>

            <div id="counter"></div>
            `;
        if(!(this.index > 0)){
            this.endGame();
        } else{
            this.index--
            this.questionCounter();
            this.runQuestion();
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
    delay(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    questionCounter(){
        this.counter++
        const counterDisplay = document.getElementById('counter');
        counterDisplay.innerHTML = `Question ${this.counter} of ${this.questions.length}`;
    }
    endGame(){
        console.log("game ended");
        const endTime = new Date();
        const time = endTime - this.startTime;
        const date = endTime.toLocaleString();
        console.log(`date ${date}`);
        console.log(`time ${time}`);
        this.game.gameStats(date, time, this.wins);
    }
}
const currentGame = new CurrentGame();

export default currentGame;