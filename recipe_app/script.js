apiCalls = {
    searchMealByName : "https://themealdb.com/api/json/v1/1/search.php?s=",
    getRandomMeal: "https://themealdb.com/api/json/v1/1/random.php",
    getMealById : "https://themealdb.com/api/json/v1/1/lookup.php?i="
}

async function getRandomMeal() {
    const response = await fetch(apiCalls['getRandomMeal'])
    const mealData = await response.json()
    const data = mealData['meals'][0]
    console.log(data)

    // adding the meal to the html 
    createMeal(data, isRandom=true)
}
async function searchByName(name) {
    const response = await fetch(apiCalls['searchMealByName']+name)
    const mealData = await response.json()
    console.log(mealData)
}
async function searchById(id) {
    const response = await fetch(apiCalls['getMealById']+id)
    const mealData = await response.json()
    console.log(mealData)
}

function createMeal(meal, isRandom=false) {

    mealTemp = `            
            <div class="meal-header">

            ${isRandom ? `<span class="random-meal">Random Meals</span>` : ''}
                <img src="${meal['strMealThumb']}" alt="">
            </div>
            <div class="meal-body">
                <h4>${meal['strMeal']}</h4>

                <!-- heart -->
                <button class="fav-btn"><i class="fas fa-heart"></i></button>
            </div>
            `

    const mealContainer = document.querySelector('.meal-container')

    mealContainer.innerHTML = mealTemp

    const btn = mealContainer.querySelector('.fav-btn')
    btn.addEventListener('click', ()=>{
        // changing the heart button onClick to active

        btn.classList.toggle('active')
    })
}


function getMealsFromLocalStorage(){

    // so this is how to get items from the local storage
    const mealIds = JSON.parse(localStorage.getItem('mealIds'))

    return mealIds === null ? [] : mealIds
}


// add a meal to local storage by its id
function addMealToLocalStorage(meal) {
    // getting ids 
    const mealIds = getMealsFromLocalStorage()

    console.log(mealIds)

    // updating the local storage
    // https://stackoverflow.com/questions/31048953/what-does-the-three-dots-notation-do-in-javascript
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))
}

// remove an id from local storage by its id
function removeMealFromLocalStorage(id) {
    const mealIds = getMealsFromLocalStorage()

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)))
    
}
getRandomMeal()