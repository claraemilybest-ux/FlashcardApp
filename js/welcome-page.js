//`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
fetchOptions();

document.getElementById('trivia-setup').addEventListener('submit', function (e) {
  e.preventDefault();
  fetchQuestion();
});

async function fetchQuestion() {
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
  } catch (error){
    console.error('Error fetching questions:', error)
  }
  
  const data = await response.json();
  console.log(data);
}

async function fetchOptions() {
  const form = document.getElementById('trivia-setup');
  const difficulty = ['easy', 'medium', 'hard']
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

  
}

