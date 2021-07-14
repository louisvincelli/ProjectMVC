// var mark = require('dotenv').config()
// const RAPIDAPI_KEY = process.env.VITE_RAPIDAPI_KEY;
var searchFormEl = document.querySelector("#search-form");
var searchBtn = document.querySelector('#add-ingredient');
var recipeBtn = document.querySelector('#searchRecipeBtn');
// var searchInputVal = document.querySelector(".form-input");
const RAPIDAPI_KEY = "b991af6626msh20817527d58c008p114012jsnafbe85f9a112";
var pantry = []
const INGRD_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?query=";
const INGRD2RECIPES_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=apples%2Cflour%2Csugar&number=5&ignorePantry=true&ranking=1"
const SPOON_HOST = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

const getData = async (url, host) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": host,
    },
  });
  // Error Catching
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  // Response
  return await response.json();
};

//  Search Form Element specialized for ingredient input | Combines the search query with the API url
async function handleSearchFormSubmit(event) {
  event.preventDefault();
  // alert("handle form submit")
  var searchInputVal = document.querySelector(".form-input").value;
  if (!searchInputVal) {
    console.error("You need a search input value!");
    return;
  }
  // Takes the search query
  ingrdUrl = INGRD_URL + searchInputVal + "&number=4";
  console.log(ingrdUrl);
  return ingrdUrl;
};

// SAVE INGREDIENT INPUT QUERY | Saves to a pantry variable
async function appendPantry(event) {
  event.preventDefault();
  // alert("handle form submit")
  var searchInputVal = document.querySelector(".form-input").value;
  if (!searchInputVal) {
    console.error("You need a search input value!");
    return;
  }
  console.log(`Appending (${searchInputVal}) to pantry`)
  // Takes the search query 
  // pantry.push(searchInputVal+"%2C");
  pantry.push(searchInputVal);
  console.log(`Pantry items are:${pantry}`);
  localStorage.setItem("pantry",pantry)
  return pantry;
}

// SEARCH FOR RECIPES
async function searchRecipes(event) {
  event.preventDefault();
  console.log("+++++");

  let app = document.querySelector("#app");
  // // GET USER QUERIED INGREDIENTS
  urlString = localStorage.getItem("pantry").split("&")
  console.log(`ingredients string is: ${urlString}`)
  console.log("+++++");
  RECIPE_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" + urlString + "&number=5&ignorePantry=true&ranking=1"
  console.log(RECIPE_URL);

  const recipesObj = await getData(RECIPE_URL, SPOON_HOST);
  console.log(recipesObj);

  // Erases search results after each user query below search bar
  app.innerHTML = "";
  // UPDATE UI WITH INGREDIENT IMG & NAME DATA
  recipesObj.forEach((recipe,index) => {
    let img = recipe.image;
    app.innerHTML += `<div class="flex-row align-center justify-center min-100-vh bg-primary">
        <div class="col-12 col-md-9 flex-column align-center bg-light p-5">
          <h1 class="text-primary"> ${recipe.title}</h1>
            <img
            class="h-auto w-48 flex-none rounded-l object-cover"
            src=${img}
            alt="Image Description"
            />
          <form  class="form w-100">
          <button id="${index}-${recipe.title}" class="btn btn-outline-success" type="submit">Add</button>
          </form>
          
        </div>
       
      </div>`});
}

const runApiQueries = async (search) => {
  let app = document.querySelector("#app");
  // // GET USER QUERY URL
  const a = await handleSearchFormSubmit(event);
  console.log(`ingredient url is: ${a}`);
  // // GET INGREDIENT SETS
  const ingredientList = await getData(a, SPOON_HOST);
  console.log(ingredientList);

  // if (ingredientList > 0) {
  //   const response = await fetch(`/api/items`, {
  //     method: "POST",
  //     body: JSON.stringify({ ingredientList }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }

  // let matches = ingredientList.filter((ingredent) => {
  //   const regex = new RegExp(`^${search}`, "gi");
  //   return ingredent.name.match(regex);
  // });
  // console.log(matches);

  // if (search.length === 0) {
  //   matches = [];
  //   matchList.innerHTML = "";
  // }

  // Erases search results after each user query below search bar
  app.innerHTML = "";
  // UPDATE UI WITH INGREDIENT IMG & NAME DATA
  ingredientList.forEach((ingredient, index) => {
    let img =
      "https://spoonacular.com/cdn/ingredients_250x250/" + ingredient.image;
    app.innerHTML += `<div class="flex-row align-center justify-center min-100-vh bg-primary">
        <div class="col-12 col-md-9 flex-column align-center bg-light p-5">
          <h1 class="text-primary"> ${ingredient.name}</h1>
            <img
            class="h-auto w-48 flex-none rounded-l object-cover"
            src=${img}
            alt="Image Description"
            />
          <form  class="form w-100">
          <button id="${index}-${ingredient.name}" class="btn btn-outline-success" type="submit">Add</button>
          </form>
        </div>
       
      </div>`;
    // const addBtn = document.getElementById(`${index}-${ingredient.name}`);
    // addBtn.addEventListener("click", (event) => {
    //   event.preventDefault();
    //   console.log("+++++++++++++");
    //   console.log("+++++++++++++");
    //   console.log("+++++++++++++");
    //   console.log("+++++++++++++");
    //   console.log("+++++++++++++");
    //   console.log("+++++++++++++");
    //   console.log("+++++++++++++");
    //   console.log(event);

    //   test(event);
    // });
  });
};

{
  /* <script>
const test = (event) => {
  
  event.preventDefault();
  console.log(this);
  console.log(event);
  alert("addme");

};
document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("addmeeeee");
  console.log("submitted")});
</script> */
}
// const runApiQueries = async () => {

//   const app = document.querySelector('#app');

//   const ingredientList = await getData(INGRD_URL, SPOON_HOST)
//   console.log(ingredientList)

// }

// ingredientList.forEach((ingredient) => {
//     let img = "https://spoonacular.com/cdn/ingredients_250x250/"+ingredient.image;
//     app.innerHTML += `
//     <div class="max-w-2xl w-full flex border-2 border-gray-300 shadow-lg">
//       <img
//         class="h-auto w-48 flex-none rounded-l object-cover"
//         src=${img}
//         alt="Image Description"
//       />
//       <div
//         class="
//           bg-white
//           rounded-r
//           p-4
//           flex flex-col
//           justify-between
//           leading-normal
//         "
//       >
//         <div class="mb-0">
//           <div class="text-black font-bold text-xl mb-0">
//             ${ingredient.name}
//           </div>
//           <p class="text-grey-darker text-sm overflow-hidden overflow-ellipsis max-h-24">
//             ${ingredient.name}
//           </p>
//         </div>
//       </div>
//     </div>
//     `;
// });

// function test(params) {
//   alert("you hit test!");
// }

// searchInputVal.addEventListener("click", runApiQueries);
searchBtn.addEventListener("click", appendPantry);
recipeBtn.addEventListener("click", searchRecipes);

// if (ingredientList > 0) {
//   const response = await fetch(`/api/items`, {
//     method: 'POST',
//     body: JSON.stringify({ ingredientList }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// }

// var ingredients = JSON.stringify(ingredientList);
//comma separated list of ingredients that the recipe needs to search for
// var apiUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=' + ingredients + '&number=5&ignorePantry=true&ranking=1';
// var apiKey = process.env.VITE_RAPIDAPI_KEY;
// fetch(apiUrl)
//   .then(function (res) {
//     return res.json()
//   })
//   .then(function (data) {
//     var recipe1 = data[0];
//     document.getElementById('recipe1title').innerHTML(recipe1.title);
//     document.getElementById('recipe1list').innerHTML(recipe1.list);
//     document.getElementById('recipe1instructions').innerHTML(recipe1.instructions);
//     document.getElementById('recipe1image').src = recipe1.image;
//     //copy paste for more cards w ingredients.
//   })

//FRANCISCO ^^^^^^^^^

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute("data-id")) {
//     const id = event.target.getAttribute("data-id");

//     const response = await fetch(`/api/items/${id}`, {
//       method: "DELETE",
//     });
//   }
// };
// const test = (event) => {
//   //let app = document.querySelector("#app");
//   // // GET USER QUERY URL

//   console.log("-------------");
//   console.log("-------------");
//   console.log("-------------+");
//   console.log("-------------");
//   console.log("-------------");
//   console.log("-------------");
//   console.log(this + "fafasfasf");
//   console.log(event);
//   // alert("addme");
//   // const a = await handleSearchFormSubmit(event);
//   // console.log(`ingredient url is: ${a}`);
//   // // // GET INGREDIENT SETS
//   // const ingredientList = await getData(a, SPOON_HOST);
//   // console.log(ingredientList);
//   // if (ingredientList > 0) {
//   //   const response = await fetch(`/api/items`, {
//   //     method: "POST",
//   //     body: JSON.stringify({ ingredientList }),
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //   });
//   // }
// };

document
  .querySelector("#searchbtn")
  // .addEventListener("click", delButtonHandler);
