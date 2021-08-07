const questions = [

    {
        question : 'What is the range of numbers you can store in a variable of type byte?',
        answers : {
            a: "0 to 65535",
            b: "0 to 255",
            c: "-128 to 127",
            d: "0 to 9"
        },
        correct: "b"
    },
    {
        question : 'What is the only thing that computers understand ?',
        answers : {
            a: "Machine code",
            b: "High level languages",
            c: "Low level languages",
            d: "Algorithms"
        },
        correct: "a"
    },
    {
        question : 'Resolving errors in a program is known as ?',
        answers : {
            a: "Refixing",
            b: "Error checking",
            c: "Problem solving",
            d: "Debugging"
        },
        correct: "d"
    },
    {
        question : 'What is the name for software used to convert an assembly language into machine code ?',
        answers : {
            a: "Interpreter",
            b: "Assembler",
            c: "Compiler",
            d: "Translator"
        },
        correct: "c"
    },
    {
        question : 'Java, Python, PHP and C++ are examples of ?',
        answers : {
            a: "Low level languages",
            b: "Medium level languages",
            c: "Graphic arts languages",
            d: "High level languages"
        },
        correct: "d"
    },
    {
        question : 'JavaScript is the same as Java ?',
        answers : {
            a: "Yes",
            b: "No"
        },
        correct: "b"
    }
]

// return all the possible answers in a question to make room for
function getLengthOfAnswers(question) {
    return Object.keys(question['answers']).length
}

// generates Html Question Template using id list of max choices
function generateQuestionHtml(mcqLength, parentElement, contents ) {

    // max mcq questions 
    maxIds = ['a', 'b', 'c', 'd']

    for (var i=0; i<mcqLength; i++){

        htmlTemplate = `
        <ul>
            <li>
                <input type="radio" id=${maxIds[i]}
                name="answer">

                <label for=${maxIds[i]}>${contents[maxIds[i]]}</label>
            </li>
        </ul>
        `
        parentElement.insertAdjacentHTML('beforeend', htmlTemplate)
    }
}
// remove by tagname ul
function removeAppendedElements() {
    var elements = document.getElementsByTagName('ul'), ind

    for(ind = elements.length-1; ind >= 0; ind--) {
        elements[ind].parentNode.removeChild(elements[ind])
    }

}

// check the correct answer by checking the id stored for each question
function checkCorrectAns(id) {

    // getting the current question 
    const correctAns = questions[currentQuestion]['correct']
    if (id == correctAns)
        return true
    return false
}

// get selected answer by checking for .checked for each radio button
function getSelectedAnswer() {
    const allAnswers = document.getElementsByTagName('input')

    for(var i=0; i<allAnswers.length; i++) {
        if (allAnswers[i].checked)
            return allAnswers[i]
    }
    return null
}

// Display the score and change the button from submit to reload(start over)
function restScore(score) {

    // getting the quiz container to remove all inside
    const container = document.querySelector(".quiz-container")

    // changing the innerHtml
    container.innerHTML = `<h2>You scored ${score}/${questions.length}, Yeah!!</h2><button onClick="window.location.reload()">Start Again</button>`

}
// update the html with the question from the question list
function loadQuestion() {
    
    // getting the question
    const questionData = questions[currentQuestion]
    const questionContents = questionData['answers']

    // getting the questions mcq number
    ansLength = getLengthOfAnswers(questionData)

    // getting the container div
    const container = document.querySelector('#mcqs')
    const questionName = document.getElementById('question-body')

    // changing things
    questionName.innerText = questionData['question']

    generateQuestionHtml(ansLength, container, questionContents)

}

// getting the submit button 
const submitButton = document.querySelector('#send-answer')
// adding eventListener 
submitButton.addEventListener('click', ()=> {

    if (currentQuestion < questions.length) {
        const ans = getSelectedAnswer()

        // check if no element was selected
        if (ans){
            // get the id
            ansId = ans.id

            // check if the answer is correct or not
            if (checkCorrectAns(ansId))
                score++
            
            // remove the appended items
            removeAppendedElements()

            currentQuestion++

            if (currentQuestion < questions.length) 
                loadQuestion()

        }
    }
    if (currentQuestion == questions.length){
        // displaying the score
        console.log("Last score is:", score)

        restScore(score)
    }
})

currentQuestion = 0
score = 0

loadQuestion()