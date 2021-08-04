// end date for ramadan : Ramadan starts Saturday, April 2, 2022 : 2/4/2022
// now's date/time
// subtract

// getting elements
const daysId = document.getElementById('days')
const hoursId = document.getElementById('hours')
const minsId = document.getElementById('mins')
const secsId = document.getElementById('secs')


const ramadanDate = '2 Apr 2022'

function getDate(date) {
    // retrun the date : days, hours, mins , seconds 

    const endDate = new Date(date) 
    const currentDate = new Date()

    const diffDate = endDate - currentDate
    const totalSeconds = diffDate / 1000

    const days = Math.floor(totalSeconds / 3600/ 24)
    const hours = Math.floor(totalSeconds / 3600) % 24
    const mins = Math.floor(totalSeconds/ 60) % 60
    const secs = Math.floor(totalSeconds) % 60

    
    
    // updating the dom
    daysId.innerHTML = days
    hoursId.innerHTML = formatTime(hours)
    minsId.innerHTML = formatTime(mins)
    secsId.innerHTML = formatTime(secs)

}

function formatTime(time) {
    // check if time is less than 10
    if ( time < 10 ) 
        return `0${time}`
    return time
}
// init counting
getDate(ramadanDate)

setInterval(() =>{
        getDate(ramadanDate) 
    }, 1000)
