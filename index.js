//--------------------Variables----------------------------


var tries = 0;
var nameInput = document.getElementById("name-input");
var errorMessage = document.getElementById("error-message");
var playerName = document.getElementById("name-input")
const gameBoard = document.getElementById("game");
const home = document.getElementById("home");



//------------------------Get User Name--------------------
function getName() {
    playerName.value;
    console.log(playerName);
}
//---------------------------------------------------------

//-----------------------Set Difficulty--------------------
function setDifficulty(e){
   var difficultyData = e.getAttribute("data-id");
   console.log(difficultyData);
   getName();
   triesNumber(difficultyData);
   checkInput();
   addSettings(difficultyData);
}
//----------------------------------------------------------

//-----------------------Set Tries--------------------------
function triesNumber(difficulty) {
    if(difficulty == "easy"){
        tries = 15;
    } else if (difficulty == "medium") {
        tries = 12;
    } else if (difficulty == "expert") {
        tries = 9;
    } console.log(tries);
}
//----------------------------------------------------------

//-------------------------Check Input----------------------

function checkInput(){
    if (nameInput.value === ""){
        errorMessage.style.display = "block";
    } else if (nameInput.value != "") {
        home.style.display = "none";
        gameBoard.style.display = "block";
    }
}
//----------------------------------------------------------

function addSettings(difficultyData){
    document.getElementById("name").innerHTML = playerName.value;
    document.getElementById("tries").innerHTML = tries;
    document.getElementById("difficulty").innerHTML = difficultyData;
}

