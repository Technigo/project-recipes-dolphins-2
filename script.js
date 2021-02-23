const recipes = document.getElementById("recipes")
const userInput = document.getElementById('user-input')
const searchButton = document.getElementById('search-button')
const accordion = document.getElementById('accordion')
const filterBtn = document.getElementById('filter')

const fetchRecipe = (URL) => {
  fetch(URL)
    .then((response) => {
      return response.json()
    })
    .then((recipesData) => {
      console.log(recipesData)
      displayRecipe(recipesData)
      if (recipesData.count === 0) {
        alert('No hits')
      }
    })
    .catch((error) => {
      alert('error')
    })
}

const displayRecipe = (recipesData) => {
  recipesData.hits.forEach((item) => {
    let img = item.recipe.image
    let label = item.recipe.label

    recipes.innerHTML += `
    <div class="recipes-wrap">
      <a href=${item.recipe.shareAs}>
        <div class="img-container">
          <img src= '${img}'/>
          </div>
        </a>
      <h1>${label}</h1>
    </div>
    `
  })
}

/* displayRecipe(arrayRecipe) */

const handleInput = (userInput) => {
  const query = userInput;
  let API_URL = 'https://api.edamam.com/search?q=' + query + '&app_id=aec4b6aa&app_key=b760316ae5d674221245ca577a9ae586'
  fetchRecipe(API_URL)
  console.log(API_URL)

  filterBtn.addEventListener('click', () => {
    let filterItems = ""
    recipes.innerHTML = "";
    const checked = document.querySelectorAll('.checkbox:checked')
    checked.forEach((box) => filterItems += `&health=${box.value}`)
    console.log(filterItems)
    filter(filterItems)
    filterItems = ""
    userInput.value = ""
  })

  const filter = (items) => {
    API_URL = API_URL + items
    console.log(API_URL)
    fetchRecipe(API_URL)
  }
}

//eventListeners 
searchButton.addEventListener('click', (event) => {
  event.preventDefault()
  recipes.innerHTML = "";
  handleInput(userInput.value)
  userInput.value = ""
})

accordion.addEventListener('click', () => {
  accordion.classList.toggle('active')
})

fetchRecipe("https://api.edamam.com/search?q=chicken&app_id=aec4b6aa&app_key=b760316ae5d674221245ca577a9ae586")