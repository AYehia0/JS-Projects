// this is the github url to fetch some info about the github users 
const API_URL = "https://api.github.com/users/"

// getting elements 
const form = document.getElementById('form')
const userInput = document.getElementById('searchUsers')
const main = document.querySelector('main')

// getting the user info
async function getUserInfo(userName) {

    const res = await fetch(API_URL + userName)
    const userInfo = await res.json()
    return userInfo
}

function showUserInfo(user) {
    //info
    const userTemp = `
        <div class="user-container">
            <img src="${user.avatar_url}" alt="">
            <div class="profile-info">
                <h3 class="name">${user.name}</h3>
                <p class="bio">${user.bio}</p>
                <ul>
                    <li>${user.followers}</li>
                    <li>${user.following}</li>
                    <li>${user.public_repos}</li>
                </ul>
            </div>
        </div>
    `

    //overwrite it :D
    main.innerHTML = userTemp
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // getting the input value 
    const user = userInput.value

    if (user) {

        const userData = await getUserInfo(user)
        showUserInfo(userData)

        user.value = ""
    }
})
