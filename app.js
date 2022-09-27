let solution = [
    "JORNIE", "I", "COULD", "NOT", "HAVE", "ASKED", "FOR", "A", "MORE", "AMAZING", "BEAUTIFUL", "TALENTED", "AND", "GODLY",
    "WOMAN", "THERE", "IS", "NOBODY", "ELSE", "THAT", "I", "WANT", "TO", "SPEND", "THE", "REST", "OF", "MY",
    "LIFE", "WITH", "I", "AM", "SO", "GRATEFUL", "TO", "GOD", "FOR", "HOW", "OUR", "FRIENDSHIP", "HAS", "GROWN",
    "FROM", "BIBLE", "READING", "TO", "TEXTING", "CALLING", "VIRTUAL", "DATES", "AND", "NOW", "BEING", "TOGETHER", "I", "CHERISH",
    "THE", "JOURNEY", "ARE", "YOU", "READY", "TO", "START", "THE", "NEXT", "CHAPTER", "OF", "OUR", "LIVES", "TOGETHER"
]
let guess = $("#inputTextField").val()
let tryNumber = 0
let iterationNumber = 0
let continueGuessing = true

let arrayOfLetters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']
let arrayOfGuessesDivId = ['firstGuess', 'secondGuess', 'thirdGuess', 'fourthGuess', 'fifthGuess', 'sixthGuess', 'seventhGuess']

function loadPage(){
    rebuildSearchContainer()
    $("#canvas").append(`<div id="keyboardLineOne" class="row justify-content-center align-items-center m-1">`)
    for(let i = 0; i < 10; i++){
        $(`#keyboardLineOne`).append(`<div id="${arrayOfLetters[i]}" class="col-1 p-2 border border-2 border border-dark bg-light mx-1 fs-3 text-center">${arrayOfLetters[i].toUpperCase()}</div>`)
    }
    $("#canvas").append(`<div id="keyboardLineTwo" class="row justify-content-center align-items-center m-1">`)
    for(let i = 10; i < 19; i++){
        $(`#keyboardLineTwo`).append(`<div id="${arrayOfLetters[i]}" class="col-1 p-2 border border-2 border border-dark bg-light mx-1 fs-3 text-center">${arrayOfLetters[i].toUpperCase()}</div>`)
    }
    $("#canvas").append(`<div id="keyboardLineThree" class="row justify-content-center align-items-center m-1">`)
    for(let i = 19; i < 26; i++){
        $(`#keyboardLineThree`).append(`<div id="${arrayOfLetters[i]}" class="col-1 p-2 border border-2 border border-dark bg-light mx-1 fs-3 text-center">${arrayOfLetters[i].toUpperCase()}</div>`)
    }
    $(`#keyboardLineThree`).append(`<div class="col-1"></div>`)

    $("#canvas").append(`<div class="row p-2">`)

    for(let i = 0; i < arrayOfGuessesDivId.length; i++){
        $("#canvas").append(`<div id=${arrayOfGuessesDivId[i]} class="row row justify-content-center align-items-center m-2">`)
        for(let j = 0; j < solution[iterationNumber].length; j++){
            $(`#${arrayOfGuessesDivId[i]}`).append(`<div class="col-1 p-3 border border-2 border border-dark bg-light mx-1 fs-2 text-center text-light">A</div>`)
        }
    }
    tryNumber = 0
}

function reloadPage(){
    $("#canvas").empty()
    loadPage()
}

$(document).keyup(function(event) {
    if (event.which === 13) {
        enterTry();
        rebuildSearchContainer()
    }
});

$(document).keyup(function(event){
    if(event.which === 9){
        nextIteration()
    }
})

function rebuildSearchContainer(){
    $("#title").remove()
        $("#searchContainer").empty()
        $("#canvas").prepend(`<div id="searchContainer" class="row justify-content-center align-items-center">`)
            $("#searchContainer").append(`<div class="col-1 m-3"></div>`)    
            $("#searchContainer").append(`<button type="button" id="resetPage" onClick="reloadPage()" class="col-1 btn btn-warning border border-dark m-3 fs-4">Reset</button>`)
            $("#searchContainer").append(`<input type="form-text" id="inputTextField" class="col-3 form-text text-center m-3 fs-2" />`)
            $("#searchContainer").append(`<button type="button" id="searchButton" onClick="enterTry()" onEnter="enterTry()" class="col-1 btn btn-warning border border-dark m-3 fs-4">Submit</button>`)
            $("#searchContainer").append(`<button type="button" id="nextButton" onClick="nextIteration()" class="col-1 btn btn-warning border border-dark m-3 fs-4">Next</button>`)
        $("#canvas").prepend(`<h1 id="title" class="text-center">Twordle</h1>`)
}

function enterTry(){
    if(continueGuessing === true){
        let guess = $("#inputTextField").val().toUpperCase()
        if(guess.length != solution[iterationNumber].length){
            alert("Invalid word length. Try again.")
        } else {  
            $(`#${arrayOfGuessesDivId[tryNumber]}`).empty()
            for(let i = 0; i < guess.length; i++){
                $(`#${arrayOfGuessesDivId[tryNumber]}`).append(`<div class="col-1 p-3 border border-2 border border-dark ${evaluateLetters(guess, i)} mx-1 fs-2 text-center">${guess[i].toUpperCase()}</div>`)
                for(let j = 0; j < solution[iterationNumber].length; j++){
                    if(guess[i] == solution[iterationNumber][j]){
                        $(`#${guess[i]}`).removeClass('bg-light').addClass('bg-warning')
                    }
                }
                if(guess[i] == solution[iterationNumber][i]){
                    $(`#${guess[i]}`).removeClass('bg-warning').addClass('bg-success')
                } else {
                    $(`#${guess[i]}`).removeClass('bg-light').addClass('bg-secondary')
                }
            }
            tryNumber += 1
        }
        if(guess == solution[iterationNumber]){
            setTimeout(() => {
                alert(`Congratulations. You guessed it. ${'\n'}The answer was: ${solution[iterationNumber]}`)
                continueGuessing = false
            }, 100)
        }
        rebuildSearchContainer()
    } else {
        alert("Press the next button.")
    }
}

function evaluateLetters(guess, index){
    let guessLetter = guess[index]
    if(guessLetter == solution[iterationNumber][index]){
        return 'bg-success'
    } 
    for(let i = 0; i < solution.length; i++){
        if(guessLetter == solution[iterationNumber][i]){
            return 'bg-warning'
        }
    }
    return 'bg-light'   
}

function nextIteration(){
    iterationNumber += 1
    // var sound = new Howl({
    //     scr: ['./Jeopardy_Theme_Song.mp3'],
    //     volume: 0.8
    // });
    // sound.play();

    if(iterationNumber === solution.length){
        $("#searchContainer").empty()
        $("#keyboardLineOne").empty()
        $("#keyboardLineTwo").empty()
        $("#keyboardLineThree").empty()
        for(let i = 0; i < arrayOfGuessesDivId.length; i++){
            $(`#${arrayOfGuessesDivId[i]}`).empty()
        }
        $("#canvas").append(`<h2 id="congratsBox" class='text-center col-12 bg-warning border border-dark p-3'>Congradulations!!! You have solved the puzzle. The solution phrase is:</h2>`)
        $("#congratsBox").append(`<p class="text-warning">a</p>
            <p>Jornie, I could not have asked for a more amazing, beautiful, talented, and godly</p>
            <p>woman. There is nobody else that I want to spend the rest of my 
            <p>life with. I am so grateful  to God for how our friendship has grown.</p>
            <p>From Bible reading to texting, calling, virtual dates, and now being together, I cherish</p>
            <p>the journey. Are you ready to start the next chapter of our lives together? </p>`)
    } else {
        reloadPage()
    }
    continueGuessing = true
}