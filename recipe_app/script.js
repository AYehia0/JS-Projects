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

    console.log(data)
    // adding the meal to the html 
    createMeal(data, isRandom=true)
}
async function searchMealByName(name) {
    const response = await fetch(apiCalls['searchMealByName']+name)
    const mealData = await response.json()
    const data = mealData['meals']

    return data
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

    if (isRandom) {
        const btn = document.querySelector('.fav-btn')

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

        const mealContainer = document.querySelector('.meal-container img')

        mealContainer.addEventListener('click', ()=>{

            const ingredients = getAllIngredients(meal)

            // removing the hidden class to append the meal data to the html
            const mealDetailCont = document.querySelector('.meal-detail-container')
            mealDetailCont.classList.remove('hidden')

            // updating the popup meal container 
            updateMealDetails(meal, ingredients)

        })

    } 
}

function getMealsFromLocalStorage(){

    // so this is how to get items from the local storage
    const meal = JSON.parse(localStorage.getItem('meal'))

    return meal === null ? [] : meal
}

// getting all the ingredints 
function getAllIngredients(meal) {
    const maxIngred = 20
    const ingredients = []

    for(var i=1; i<=maxIngred; i++) {
        let ing = meal[`strIngredient${i}`]
        let measure = meal[`strMeasure${i}`]

        if (!ing) {
            break
        }
        ingredients.push(`${ing} / ${measure}`)
    }

    return ingredients

}
// add a all meal info to local storage 
function addMealToLocalStorage(meal) {

    // getting all the ingredints 
    const ingredients = getAllIngredients(meal)

    const mealTemplate = {
        idMeal: meal['idMeal'],
        strMeal: meal['strMeal'],
        strMealThumb: meal['strMealThumb'],
        strInstructions: meal['strInstructions'],
        strIngredients:ingredients
    } 
    // getting ids 
    let meals = getMealsFromLocalStorage()

    meals.push(mealTemplate)
    // updating the local storage
    // https://stackoverflow.com/questions/31048953/what-does-the-three-dots-notation-do-in-javascript
    localStorage.setItem('meal', JSON.stringify(meals))

    // reloading the page
    reloadPage(5000)

}

function getMealIndexFromLocalStorageById(mealId, meals) {

    // searching 
    var ind
    for(var i=0; i<meals.length; i++){
        if(meals[i].idMeal === mealId){
            ind = i
            break
        }
    }
    return ind
}

function removeMealById(mealId, meals) {

    const ind = getMealIndexFromLocalStorageById(mealId, meals)
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

    mealLiTemplate = `
        <img src=${meal['strMealThumb']} alt="${meal['strMeal']}" d="${meal.idMeal}" ><span>${meal['strMeal']}</span><button  class="remove-meal-fav"><i class="fas fa-window-close"></i></button>
    `

    const favLi = document.createElement('li')

    favLi.innerHTML = mealLiTemplate

    // adding to the html
    favMealContainer.appendChild(favLi)

    // Here
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
    const favMeals = document.querySelectorAll('.fav-meals li')
    favMeals.forEach( el =>{
        el.querySelector('button').addEventListener('click', () => {
            // delete 
            const id = el.querySelector('img').getAttribute('d')

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
    const mealContainer = document.querySelector('.meal-container')
    
    // cleaning the container 
    mealContainer.innerHTML = ''

    //getting the search value
    const searchValue = searchInput.value

    const meals = await searchMealByName(searchValue)

    // ToDo : check for null if no meals 
    let topMeals = meals.slice(0,5)

    // if it's not null value aka empty
    if (searchValue) {

        if (meals) {
            // displaying top 5 meals

            topMeals.forEach(meal =>{
                createMeal(meal, false)
            })
        }
    }

    // liking meals aka adding to fav
    const btns = document.querySelectorAll('.fav-btn')

    btns.forEach( (btnFav, ind) => {

        btnFav.addEventListener('click', ()=>{
        
            // get meal from html container 
            const meal = topMeals[ind]

            // changing the heart button onClick to active
            if (btnFav.classList.contains('active')){

                // remove it
                btnFav.classList.remove('active')
                removeMealFromLocalStorage(meal)
            }else{

                // add it
                btnFav.classList.add('active')
                addMealToLocalStorage(meal)
            }

        })
    })

    //showing meal details 
    // checking if one of the meals is clicked
    const mealDetails = document.querySelectorAll('.meal-header img')

    mealDetails.forEach((img, ind) =>{
        img.addEventListener('click', ()=>{

            // the meal 
            const meal = topMeals[ind]
            const mealDetailCont = document.querySelector('.meal-detail-container')
            mealDetailCont.classList.remove('hidden')

            // ingredients 
            const ingredients = getAllIngredients(meal)

            // showing the contents
            updateMealDetails(meal, ingredients)
        })
    })

})


// update the html with all the details of the meal after removing the hidden class
function updateMealDetails(meal, ingredients) {

    const mealDetailContainer = document.querySelector('.meal-detail')

    // ToDo: add Yt link to the html card
    mealTemp = `
                <h1>${meal.strMeal}</h1>

                <img src="${meal.strMealThumb}" alt="">

                <p>
                    ${meal.strInstructions}
                </p>

                <h3>Ingredients:</h3>
                <ul>
                    ${ingredients.map( (ing) => `<li>${ing}</li>` ).join("")}
                </ul>    

    `
    mealDetailContainer.innerHTML = mealTemp
}

getRandomMeal()
updateMealsToFav()
removeMeal()

const closePopupBtn = document.querySelector('#close-popup')

closePopupBtn.addEventListener('click', ()=>{
    // change the class to hidden 
    document.querySelector('.meal-detail-container').classList.add('hidden')
})

const favImgs = document.querySelectorAll('.fav-meals li img')

favImgs.forEach(img => {
    img.addEventListener('click', ()=>{
        
        // getting meal from localStorage
        // getting the mealId 
        let mealId = img.getAttribute('d')

        const meals = getMealsFromLocalStorage()

        const mealIndex = getMealIndexFromLocalStorageById(mealId, meals)

        const meal = meals[mealIndex]
        // getting the ingredients from the localStorage is different from the getAllIngredents
        const ingredients = meal.strIngredients

        // removing the hidden class to append the meal data to the html
        const mealDetailCont = document.querySelector('.meal-detail-container')
        mealDetailCont.classList.remove('hidden')

        // updating the popup meal container 
        updateMealDetails(meal, ingredients)

    })
})

