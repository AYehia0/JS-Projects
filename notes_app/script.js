function addNote() {
    noteTemplate = `
        <div class="notes-tools">
            <button id="edit-note"><i class="fas fa-edit"></i></button>
            <button id="delete-note"><i class="fas fa-trash"></i></button>
        </div>
        <div class="note hidden"></div>
        <textarea></textarea>
    `
    // creating the element
    const newNoteContainer = document.createElement('div')

    // adding the class name
    newNoteContainer.classList.add('notes-container')

    newNoteContainer.innerHTML = noteTemplate

    // appending to the html, body
    document.querySelector('body').appendChild(newNoteContainer)
}

const addNoteBtn = document.querySelector('.add-note')

addNoteBtn.addEventListener('click', () => {
    // adding a note to the html 
    addNote()

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
        })

        deleteBtn.addEventListener('click', () => {
            note.remove()
        })

    });

})

