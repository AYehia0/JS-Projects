// this is the github url to fetch some info about the github users 
const API_URL = "https://api.github.com/users/"

// getting the user info
async function getUserInfo(userName) {

    const res = await fetch(API_URL + userName)
    const userInfo = await res.json()

    return userInfo
}

