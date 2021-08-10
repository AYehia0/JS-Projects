apiCalls = {
    searchMealByName : "https://themealdb.com/api/json/v1/1/search.php?s=",
    getRandomMeal: "https://themealdb.com/api/json/v1/1/random.php",
    getMealById : "https://themealdb.com/api/json/v1/1/lookup.php?i="
}

const favMealContainer = document.querySelector('.fav-meals')

async function getRandomMeal() {
    const response = await fetch(apiCalls['getRandomMeal'])
    const mealData = await response.json()
    const data = mealData['meals'][0]

    // adding the meal to the html 
    createMeal(data, isRandom=true)
}
async function searchMealByName(name) {
    const response = await fetch(apiCalls['searchMealByName']+name)
    const mealData = await response.json()
    const data = mealData['meals']

    return data
}
async function searchById(id) {
    const response = await fetch(apiCalls['getMealById']+id)
    const mealData = await response.json()
    console.log(mealData)
}

function createMeal(meal, isRandom=false) {

    mealTemp = `            
            ${isRandom ? `<span class="random-meal">Random Meals</span>` : ''}
                <img src="${meal['strMealThumb']}" alt="">
            </div>
            <div class="meal-body">
                <h4>${meal['strMeal']}</h4>

                <!-- heart -->
                <button class="fav-btn"><i class="fas fa-heart"></i></button>
            `

    const mealContainer = document.querySelector('.meal-container')

    // creating the div
    const mealToBeAdded = document.createElement('div')

    // adding the class
    mealToBeAdded.classList.add('meal-header')

    // adding the html
    mealToBeAdded.innerHTML = mealTemp

    mealContainer.appendChild(mealToBeAdded)

    const btn = mealContainer.querySelector('.fav-btn')
    btn.addEventListener('click', ()=>{

        // changing the heart button onClick to active
        if (btn.classList.contains('active')){

            // remove it
            btn.classList.remove('active')
            removeMealFromLocalStorage(meal)
        }else{

            // add it
            btn.classList.add('active')
            addMealToLocalStorage(meal)
        }
    })
}

function getMealsFromLocalStorage(){

    // so this is how to get items from the local storage
    const meal = JSON.parse(localStorage.getItem('meal'))

    return meal === null ? [] : meal
}


// add a all meal info to local storage 
function addMealToLocalStorage(meal) {

    const mealTemplate = {
        idMeal: meal['idMeal'],
        strMeal: meal['strMeal'],
        strMealThumb: meal['strMealThumb']
    } 
    // getting ids 
    let meals = getMealsFromLocalStorage()

    meals.push(mealTemplate)
    // updating the local storage
    // https://stackoverflow.com/questions/31048953/what-does-the-three-dots-notation-do-in-javascript
    localStorage.setItem('meal', JSON.stringify(meals))

    // reloading the page
    reloadPage(500)

}


function removeMealById(mealId, meals) {
    // searching 
    var ind
    for(var i=0; i<meals.length; i++){
        if(meals[i].idMeal === mealId){
            ind = i
            break
        }
    }
    // removing
    // The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place
    // short the shit : it removes at index
    meals.splice(ind, 1)

    // setItem put a key-value pair on the local storage
    // local storage stores as strings
    localStorage.setItem('meal', JSON.stringify(meals))

    // reloading the page
    reloadPage(250)
}
// remove a meal by its id
function removeMealFromLocalStorage(meal) {
    // getting all the meals from storage
    const meals = getMealsFromLocalStorage()

    // getting the id of the one to search
    const mealId = meal['idMeal']

    removeMealById(mealId, meals)

}

// adding meals to the favourite 
function addMealToFav(meal){

    console.log(meal)
    mealLiTemplate = `
        <img src=${meal['strMealThumb']} alt="${meal['strMeal']}" ><span>${meal['strMeal']}</span><button d="${meal.idMeal}" class="remove-meal-fav"><i class="fas fa-window-close"></i></button>
    `

    const favLi = document.createElement('li')

    favLi.innerHTML = mealLiTemplate

    // adding to the html
    favMealContainer.appendChild(favLi)
}

// get the liked meals from localStorage then add to the top of the page
function updateMealsToFav() {

    // getting from local storage
    const meals = getMealsFromLocalStorage()

    // adding them to the html by calling addMealToFav
    for(var i=0; i<meals.length; i++){

        // adding to HTML
        addMealToFav(meals[i])
    }
    
}
function removeMeal(){
    // checking for remove
    const removeButton = document.querySelectorAll('.remove-meal-fav')
    removeButton.forEach( el =>{
        el.addEventListener('click', () => {
            // delete 
            const id = el.getAttribute('d')

            // getting data from localStorage
            const meals = getMealsFromLocalStorage()

            // removing
            removeMealById(id, meals)
        })
    })
}

function reloadPage(timeout){
    setTimeout(() => {
        location.reload()
    }, timeout);
}


// searching 
const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')

searchBtn.addEventListener('click', async () => {
    // fetching the response and updating the page
    
    //getting the search value
    const searchValue = searchInput.value

    // if it's not null value aka empty
    if (searchValue) {
        const meals = await searchMealByName(searchValue)

        if (meals) {
            // displaying top 5 meals

            let topFiveMeals = meals.slice(0,5)

            topFiveMeals.forEach(meal =>{
                createMeal(meal, false)
            })
        }
    }
})
getRandomMeal()
updateMealsToFav()
removeMeal()