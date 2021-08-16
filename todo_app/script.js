const formSubmit = document.getElementById("form-submit")
const inputElement = document.querySelector('.todo-input')


function updateHtmlFromLS() {
    
    const todosItems = JSON.parse(localStorage.getItem('todos'))

    todosItems.forEach(todoEl => {

        // create li for each item
        let liEl = document.createElement('li')
        
        // setting the text of the todoEl
        liEl.innerText = todoEl.text

        // setting the completed class if true
        if (todoEl.completed) {
            liEl.classList.toggle('completed')
        }

        // adding to the html
        document.querySelector('.list-container ul').appendChild(liEl)
    })

}

function updateLS() {

    const todosElements = document.querySelectorAll('li')

    const todos = []

    todosElements.forEach(el => {
        todos.push({
            text: el.innerText,
            completed: el.classList.contains("completed")
        })
    })

    // updating
    localStorage.setItem("todos", JSON.stringify(todos))
}

updateHtmlFromLS()

formSubmit.addEventListener('submit', (e) => {
    e.preventDefault()

    // getting the value of the input tag 
    const todoText = inputElement.value

    if (todoText) {

        // create li and append to the html
        const todoOne = document.createElement('li')
        todoOne.innerText = todoText

        // appending 
        document.querySelector('.list-container ul').appendChild(todoOne )

        // clearing the input form 
        inputElement.value = ""

        todoOne.addEventListener('click', () => {
            todoOne.classList.toggle('completed')
            updateLS()
        })

        todoOne.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            todoOne.remove()
            updateLS()
        })
       
        updateLS()
    }
})

// checking all todos
document.querySelectorAll('li').forEach(todo => {
    todo.addEventListener('click', () => {
        todo.classList.toggle('completed')
        updateLS()
    })

    // removing a todo item
    todo.addEventListener('contextmenu', (e) => {
        // to prevent 
        e.preventDefault()

        todo.remove()
        updateLS()

    })
})


