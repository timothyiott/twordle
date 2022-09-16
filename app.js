let solution = "GROWN"
let guess = $("#inputTextField").val()
let tryNumber = 0

let arrayOfLetters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']
let arrayOfGuessesDivId = ['firstGuess', 'secondGuess', 'thirdGuess', 'fourthGuess', 'fifthGuess', 'sixthGuess', 'seventhGuess']

function loadPage(){
    $("#canvas").append(`<div id="keyboardLineOne" class="row justify-content-center align-items-center m-1">`)
    for(let i = 0; i < 10; i++){
        $(`#keyboardLineOne`).append(`<div id="${arrayOfLetters[i]}" class="col-1 p-2 border border-2 border border-dark bg-light mx-1 fs-5 text-center">${arrayOfLetters[i].toUpperCase()}</div>`)
    }
    $("#canvas").append(`<div id="keyboardLineTwo" class="row justify-content-center align-items-center m-1">`)
    for(let i = 10; i < 19; i++){
        $(`#keyboardLineTwo`).append(`<div id="${arrayOfLetters[i]}" class="col-1 p-2 border border-2 border border-dark bg-light mx-1 fs-5 text-center">${arrayOfLetters[i].toUpperCase()}</div>`)
    }
    $("#canvas").append(`<div id="keyboardLineThree" class="row justify-content-center align-items-center m-1">`)
    for(let i = 19; i < 26; i++){
        $(`#keyboardLineThree`).append(`<div id="${arrayOfLetters[i]}" class="col-1 p-2 border border-2 border border-dark bg-light mx-1 fs-5 text-center">${arrayOfLetters[i].toUpperCase()}</div>`)
    }
    $(`#keyboardLineThree`).append(`<div class="col-1"></div>`)

    $("#canvas").append(`<div class="row p-2">`)

    for(let i = 0; i < arrayOfGuessesDivId.length; i++){
        $("#canvas").append(`<div id=${arrayOfGuessesDivId[i]} class="row row justify-content-center align-items-center m-2">`)
        for(let j = 0; j < solution.length; j++){
            $(`#${arrayOfGuessesDivId[i]}`).append(`<div class="col-1 p-3 border border-2 border border-dark bg-light mx-1 fs-2 text-center text-light">A</div>`)
        }
    }
    tryNumber = 0
}

loadPage()

function reloadPage(){
    $("#keyboardLineOne").empty()
    $("#keyboardLineTwo").empty()
    $("#keyboardLineThree").empty()
    for(let i = 0; i < arrayOfGuessesDivId.length; i++){
        $(`#${arrayOfGuessesDivId[i]}`).empty()
    }
    loadPage()
}

$(document).keyup(function(event) {
    if (event.which === 13) {
        enterTry();
        $("#title").remove()
        $("#searchContainer").empty()
        $("#canvas").prepend(`<div id="searchContainer" class="row justify-content-center align-items-center">`)
            $("#searchContainer").append(`<button type="button" id="resetPage" onClick="reloadPage()" class="col-1 btn btn-warning border border-dark m-3">Reset</button>`)
            $("#searchContainer").append(`<input type="form-text" id="inputTextField" class="col-3 form-text text-center m-3 fs-2" />`)
            $("#searchContainer").append(`<button type="button" id="searchButton" onClick="enterTry()" onEnter="enterTry()" class="col-1 btn btn-warning border border-dark m-3">Submit</button>`)
        $("#canvas").prepend(`<h1 id="title" class="text-center">Twordle</h1>`)
    }
});

function enterTry(){
    let guess = $("#inputTextField").val().toUpperCase()
    if(guess.length != solution.length){
        alert("Invalid word length. Try again.")
    } else {  
        $(`#${arrayOfGuessesDivId[tryNumber]}`).empty()
        for(let i = 0; i < guess.length; i++){
            $(`#${arrayOfGuessesDivId[tryNumber]}`).append(`<div class="col-1 p-3 border border-2 border border-dark ${evaluateLetters(guess, i)} mx-1 fs-2 text-center">${guess[i].toUpperCase()}</div>`)
            for(let j = 0; j < solution.length; j++){
                if(guess[i] == solution[j]){
                    $(`#${guess[i]}`).removeClass('bg-light').addClass('bg-warning')
                }
            }
            if(guess[i] == solution[i]){
                $(`#${guess[i]}`).removeClass('bg-warning').addClass('bg-success')
            } else {
                $(`#${guess[i]}`).removeClass('bg-light').addClass('bg-secondary')
            }
        }
        tryNumber += 1
    }
    if(guess == solution){
        setTimeout(() => {
            alert(`Congratulations. You guessed it. ${'\n'}The answer was: ${solution}`)
        }, 100)
    }
}

function evaluateLetters(guess, index){
    let guessLetter = guess[index]
    if(guessLetter == solution[index]){
        return 'bg-success'
    } 
    for(let i = 0; i < solution.length; i++){
        if(guessLetter == solution[i]){
            return 'bg-warning'
        }
    }
    return 'bg-light'   
}

