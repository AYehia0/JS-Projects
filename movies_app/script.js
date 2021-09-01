// it's better to hide the api key in the backend by creating a server
const API_KEY = keys.API_KEY

const API_URL = 'https://api.themoviedb.org/3'

const IMG_URL = 'https://image.tmdb.org/t/p/w1280'

const movies_collections = `${API_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`


async function getMovieCollections() {
    // making a get request 
    const res = await fetch(movies_collections)
    const data = await res.json()

    return data
}

function addMoviesToHtml(movies) {

    const mainContainer = document.querySelector('.main')

    // make sure that the html is clean
    mainContainer.innerHTML = ""


    movies.forEach(movie => {
        
        const movieUrl = IMG_URL + movie.poster_path
        const ratingColor = getRateColor(movie.vote_average)
        const movieTemplate = `
            <img src="${movieUrl}" alt="">
            <div class="movie-details">
                <h3>${movie.title}</h3>
                <span class="${ratingColor}">${movie.vote_average}</span>
            </div>
        `

        // appending to the html
        const movieEl = document.createElement('div')
        movieEl.classList = "movie"
        movieEl.innerHTML = movieTemplate

        mainContainer.appendChild(movieEl)
    })


}

// display movies to the screen
async function mainMoviesList (){

    // getting the movies
    const movies = await getMovieCollections()


    console.log(movies.results)

    addMoviesToHtml(movies.results)

}

function getRateColor(rate) {
    if (rate >= 8) return "green"
    if (rate >= 5) return "orange"
    return "red"
}
console.log("hello world")
mainMoviesList()