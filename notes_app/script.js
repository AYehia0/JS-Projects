function showNoteToHtml(textNote = "") {

    noteTemplate = `
        <div class="notes-tools">
            <button id="edit-note"><i class="fas fa-edit"></i></button>
            <button id="delete-note"><i class="fas fa-trash"></i></button>
        </div>
        <div class="note ${textNote ? "" : "hidden"}"></div>
        <textarea class=" ${textNote ? "hidden" : ""}"></textarea>
    `
    // creating the element
    const newNoteContainer = document.createElement('div')

    // adding the class name
    newNoteContainer.classList.add('notes-container')

    newNoteContainer.innerHTML = noteTemplate
    
    if (textNote) {
        newNoteContainer.querySelector('.note').innerHTML = marked(textNote)
    }

    // appending to the html, body
    document.querySelector('body').appendChild(newNoteContainer)
}

function addToLs(note) {

    localStorage.setItem('notes', JSON.stringify(note))
}

function updateLocalStorage() {
    // setting up the notes 

    const notes = document.querySelectorAll('textarea')

    const notesArr = []

    notes.forEach(note => {
        if (note.value) {
            notesArr.push(note.value)
        }
    })

    // putting to ls
    localStorage.setItem('notes', JSON.stringify(notesArr))

}

function getNotesFromLsToHtml() {

    // getting notes from localStorage
    const notes = JSON.parse(localStorage.getItem('notes'))

    //adding to html

    if(notes) {
        notes.forEach(note => {
            showNoteToHtml(note)
        })
    }
}
const addNoteBtn = document.querySelector('.add-note')

getNotesFromLsToHtml()

addNoteBtn.addEventListener('click', () => {


    showNoteToHtml()
    // getting the elements 
    const noteContainers = document.querySelectorAll('.notes-container')

    noteContainers.forEach(note => {

        let btn = note.querySelector('#edit-note')
        let textArea = note.querySelector('textarea')
        let noteMain = note.querySelector('.note')
        let deleteBtn = note.querySelector('#delete-note')

        btn.addEventListener('click', () => {
            // toggle between hidden
            noteMain.classList.toggle('hidden')
            textArea.classList.toggle('hidden')
 
        })

        textArea.addEventListener('input', (e) => {
            const input  = e.target.value
            noteMain.innerHTML = marked(input)

            // adding to the localStorage
            updateLocalStorage()

        })

        deleteBtn.addEventListener('click', () => {
            note.remove()
            updateLocalStorage()
        })

    });
    

})