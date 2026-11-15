let POSSIBLE_WORDS = ["obdurate", "verismilitude", "defenestrate", 
    "obsequious", "dissonant", "toady", "imdempotent"];
let guesses = "";
let word = "";
let MAX_GUESSES = 6;
let guessCount = MAX_GUESSES;
function newGame() {
    let randomIndex = parseInt(Math.random() * POSSIBLE_WORDS.length);
    word = POSSIBLE_WORDS[randomIndex];
    // Reset guesses and guess count for a new game
    guesses = "";
    guessCount = MAX_GUESSES;
    document.getElementById("guess").value = "";
    updateScreen();
}
function guess(){
    let input = document.getElementById("guess");
    // Convert the input to lowercase to ensure case insensitivity
    let letter = input.value.toLowerCase();
    // Clear the Input Field after every guess and keep the cursor focused inside it
    input.value = "";
    input.focus();
    // Don't allow guess before word is chosen OR game is finished(Lost OR Won) OR input is empty OR Don't allow same guesses multiple times
    if (word === "" || guessCount <= 0 || isGameWon() || letter === "" || guesses.indexOf(letter) >= 0) {
        return;
    }
    if(word.indexOf(letter) < 0){
        guessCount--;
    }
    guesses += letter;
    updateScreen();
}
// Check if the game is won by verifying if all letters in the word have been guessed
function isGameWon() {
    // If the word is empty, the game cannot be won, Safeguard against empty word scenario
    if (word === "") {
        return false;
    }
    for (let i = 0; i < word.length; i++) {
        if (guesses.indexOf(word.charAt(i)) < 0) {
            return false;
        }
    }
  return true;
}
function updateScreen() {
    let clueString ="";
    for (let i = 0; i < word.length; i++) {
        let letter = word.charAt(i);
        if(guesses.indexOf(letter) >= 0){
            clueString += letter + " ";
        }else{
            clueString += "_ ";
        }
    }
    let clue = document.getElementById("clue");
    clue.textContent = clueString;
    // Dialog for Winning and Losing shown in Guesses Area, Changed to .innerHTML to allow for line breaks in the message
    let guessArea = document.getElementById("guesses");
    if (guessCount <= 0) {
        guessArea.innerHTML = "You lose! The word was: " + word + "<br>Guessed Letters: " + guesses;
    } else if (isGameWon()) {
        guessArea.innerHTML = "You win!<br>Guessed Letters: " + guesses;
    } else {
        guessArea.innerHTML = "Guessed Letters: " + guesses;
    }
    let image = document.getElementById("hangmanpic");
    image.src = `images/hangman${guessCount}.gif`;
}