import currentGame from "./CurrentGame.js";

class Dropdown {
    constructor(){

    }
    render(){
        console.log('rendering');
        const body = document.getElementById('dropdown');
        body.innerHTML = `
        <form name="trivia-setup" id="trivia-setup" class="p-4 border border-gray-300 rounded-md shadow-md bg-white container justify-content-center">
          <div class="justify-content-center mb-3 g-0 vw-fit">
            Category: <select name="category" id="category">
            </select>
          </div>
          <div>
          Difficulty: <select name="difficulty" id="difficulty">
          </select>
          </div>
          <div>
          Type: <select name="type" id="type">
          </select>
          </div>
          <div>
          Amount of Questions: <input type="number" id="quantity" name="quantity" min="5" max="35" value="10" class="border border-gray-300 rounded-md">
          </div>
          <div>
          <input type="submit" value="Start">
          </div>
        </form>
        `;
        this.fetchOptions();
    }

    async fetchOptions() {
        const form = document.getElementById('trivia-setup');
        for (const element of ['category', 'difficulty', 'type']) {
            const select = form.elements[element];
            let data;
            if (element === 'category'){
            try{
                const response = await fetch(`https://opentdb.com/api_category.php`, {
                method: 'GET',
                });
                data = await response.json();
            } catch (error){
                console.error('Error fetching categories:', error);
            }
            } else if (element === 'difficulty'){
            data = [{name: 'Easy', value: 'easy'}, {name: 'Medium', value: 'medium'}, {name: 'Hard', value: 'hard'}];
            } else{
            data = [{name: 'Multiple Choice', value: 'multiple'}, {name: 'True / False', value: 'boolean'}];
            }
            
            for( const item of data.trivia_categories || data){
            const option = document.createElement('option');
            if (element === 'category'){
                option.value = item.id;
                option.text = item.name;
            } else{
                option.value = item.value;
                option.text = item.name;
            }
            
            select.add(option);
            }
        }
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.fetchGame();
        })
    }

    async fetchGame() {
        const form = document.getElementById('trivia-setup');
        const formData = new FormData(form);
        const amount = formData.get('quantity');
        const category = formData.get('category');
        const difficulty = formData.get('difficulty');
        const type = formData.get('type');
        try{
            const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`, {
                method: 'GET',
            });
            const data = await response.json();
            const questions = data.results;
            
            console.log(questions);
            
            console.log('game started');
            currentGame.setCurrentGame(questions, category, difficulty, amount);
            
            window.location.href = 'trivia-page.html';

        } catch (error){
            console.error('Error fetching questions:', error)
        }
        
        
    }
}
const dropdown = new Dropdown();

export default dropdown;