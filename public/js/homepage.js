const newFormHandler = async (event) => {
  event.preventDefault();

  const RAPIDAPI_KEY = process.env.VITE_RAPIDAPI_KEY;

  const INGRD_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?query=appl&number=10&intolerances=egg"
  //const INGRD2RECIPES_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=apples%2Cflour%2Csugar&number=5&ignorePantry=true&ranking=1"
  const SPOON_HOST = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"

  const getData = async (url, host) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": host,
      },
    });
    // Error Catching
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Response
    return await response.json();
  }
  const runApiQueries = async () => {

    const app = document.querySelector('#app');

    const ingredientList = await getData(INGRD_URL, SPOON_HOST)
    console.log(ingredientList)

  }
  ingredientList.forEach((ingredient) => {
      let img = "https://spoonacular.com/cdn/ingredients_250x250/"+ingredient.image;
      app.innerHTML += `
      <div class="max-w-2xl w-full flex border-2 border-gray-300 shadow-lg">
        <img
          class="h-auto w-48 flex-none rounded-l object-cover"
          src=${img}
          alt="Image Description"
        />
        <div
          class="
            bg-white
            rounded-r
            p-4
            flex flex-col
            justify-between
            leading-normal
          "
        >
          <div class="mb-0">
            <div class="text-black font-bold text-xl mb-0">
              ${ingredient.name}
            </div>
            <p class="text-grey-darker text-sm overflow-hidden overflow-ellipsis max-h-24">
              ${ingredient.name}
            </p>
          </div>
        </div>
      </div>
      `;
  });
};


  if (virtualFridge > 0) {
    const response = await fetch(`/api/items`, {
      method: 'POST',
      body: JSON.stringify({ virtualFridge }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  var ingredients = JSON.stringify(virtualFridge);
  //comma separated list of ingredients that the recipe needs to search for
  var apiUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=' + ingredients + '&number=5&ignorePantry=true&ranking=1';
  var apiKey = process.env.VITE_RAPIDAPI_KEY;
  fetch(apiUrl)
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      var recipe1 = data[0];
      document.getElementById('recipe1title').innerHTML(recipe1.title);
      document.getElementById('recipe1list').innerHTML(recipe1.list);
      document.getElementById('recipe1instructions').innerHTML(recipe1.instructions);
      document.getElementById('recipe1image').src = recipe1.image;
      //copy paste for more cards w ingredients.
    })




  //FRANCISCO ^^^^^^^^^

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });
    }
  };

  document
    .querySelector('#addbtn')
    .addEventListener('click', newFormHandler);

  document
    .querySelector('#searchbtn')
    .addEventListener('click', delButtonHandler);