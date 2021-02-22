const recipes = document.getElementById("recipes")

const fetchRecipe = (URL) => {
  fetch(URL)
  .then((response) => {
    return response.json()
  })
  .then((recipesData) => {
      console.log(recipesData)
      displayRecipe(recipesData)
  })
}

const displayRecipe = (recipesData) => {
    recipesData.hits.forEach((item) => {
        let img = item.recipe.image
        let label = item.recipe.label
        
        recipes.innerHTML += `
        <img src= '${img}'/>
        <h1>${label}</h1>
        `
    })
}

const handleInput = () => {
    const query = "chicken";
    const API_URL =  'https://api.edamam.com/search?q=' + query + '&app_id=aec4b6aa&app_key=b760316ae5d674221245ca577a9ae586'
    fetchRecipe(API_URL)
  }
  
  handleInput ();