//--------------------Variables----------------------------

var clicks = 0;
var tries = 0;
var triesCounter = 0;
var matchesCounter = 0;
var nameInput = document.getElementById("name-input");
var errorMessage = document.getElementById("error-message");
var playerName = document.getElementById("name-input");
var defaultCards = document.getElementsByClassName("card");
var chosenCards = [];
var chosenCardsName = [];
const gameBoard = document.getElementById("game");
const home = document.getElementById("home");
const background = document.getElementById("background");
var cardArray = [
    { 
        name: "pumba",
        img: "images/pumba.jpg",
        id: 1
    },
    { 
        name: "pumba",
        img: "images/pumba.jpg",
        id: 2
    },
    { 
        name: "simba",
        img: "images/simba.jpg",
        id: 3
    },
    { 
        name: "simba",
        img: "images/simba.jpg",
        id: 4
    },
    { 
        name: "nala",
        img: "images/nala.jpg",
        id: 5
    },
    { 
        name: "nala",
        img: "images/nala.jpg",
        id: 6
    },
    { 
        name: "timon",
        img: "images/timon.jpg",
        id: 7
    },
    { 
        name: "timon",
        img: "images/timon.jpg",
        id: 8
    },
    { 
        name: "zazu",
        img: "images/zazu.jpg",
        id: 9
    },
    { 
        name: "zazu",
        img: "images/zazu.jpg",
        id: 10
    },
    { 
        name: "rafiki",
        img: "images/rafiki.jpg",
        id: 11
    },
    { 
        name: "rafiki",
        img: "images/rafiki.jpg",
        id: 12
    }
]

//---------------------------------------------------------

window.onload = loadHome(); 

function loadHome() {
    
   background.style.opacity = "1";
  };


//------------------------Get User Name--------------------
function getName() {
    playerName.value;
}
//---------------------------------------------------------

//-----------------------Set Difficulty--------------------
function setDifficulty(e){
   var difficultyData = e.getAttribute("data-id");
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
    }
}
//----------------------------------------------------------

//-------------------------Check Input----------------------

function checkInput(){
    if (nameInput.value === ""){
        errorMessage.style.display = "block"; 
        errorMessage.classList.add("animate__wobble");
    } else if (nameInput.value != "") {
        home.style.display = "none";
        gameBoard.style.display = "block";
    }
}
//----------------------------------------------------------

//------------------Add Initial Settings--------------------

function addSettings(difficultyData){
    document.getElementById("name").innerHTML = playerName.value;
    document.getElementById("tries").innerHTML = tries;
    document.getElementById("difficulty").innerHTML = difficultyData;
}

//----------------------------------------------------------

//----------------------Shuffle Cards-----------------------

function shuffleCards(cardArray) {
    
    var i
    var j
    var x

    for (i = cardArray.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = cardArray[i].id;
        cardArray[i].id = cardArray[j].id;
        cardArray[j].id = x;     
    }
    return cardArray
}
shuffleCards(cardArray)
//----------------------------------------------------------

//--------------------Link front and back-------------------

function linkSides(e) {
    var defaultCardId = e.getAttribute("data-id");
    for (let i = 0; i < cardArray.length; i++){
        var cardId = cardArray[i].id;
        if (defaultCardId == cardId){
            e.setAttribute("src", cardArray[i].img);
            chosenCardsName.push(cardArray[i].name);
        }
    }
    flipCard(e)
}
//----------------------------------------------------------

//--------------------Flip Card-----------------------------

function flipCard(e){
    clicks++;
    addTriesCounter()
    chosenCards.push(e)
    if (chosenCards[0].getAttribute("data-id")!= chosenCards[1].getAttribute("data-id")){
        if (chosenCards.length == 2){
            findMatch()
            
        } else if (chosenCards.length > 2) {
            chosenCards.length = 2;
        }
    } else if (chosenCards[0].getAttribute("data-id") === chosenCards[1].getAttribute("data-id")){
        chosenCards[1].setAttribute("src", "images/default.jpg");
        chosenCards = [];
        chosenCardsName = [];
    }
    console.log(chosenCards)
    checkResult()
    
}

//-----------------Set Back to Default----------------------

function setDefault(){
    chosenCards[0].setAttribute("src", "images/default.jpg");
    chosenCards[1].setAttribute("src", "images/default.jpg");
    chosenCards = [];
    clicks = 0
}

//----------------------Tries Counter-----------------------

function addTriesCounter(){
    if (clicks % 2 == 0){
        triesCounter++
    }
    document.getElementById("tries-counter").innerHTML = triesCounter;
}

//----------------------Match Finder------------------------

function findMatch() {
    if (chosenCardsName[0] === chosenCardsName[1]){
        console.log(chosenCardsName)
        matchesCounter++
        console.log(matchesCounter)
        chosenCards[0].classList.add("grayscale");
        chosenCards[1].classList.add("grayscale");
        chosenCards[0].removeAttribute("onclick");
        chosenCards[1].removeAttribute("onclick");
        chosenCards = [];
     
    } else if (chosenCardsName[0] != chosenCardsName[1]) {
        setTimeout(setDefault, 500);
    }
    if (chosenCardsName.length > 1){
        chosenCardsName = [];
    }
}

//------------------Check results---------------------------

function checkResult(){
    if (matchesCounter == 6 && triesCounter <= tries){
        document.getElementById("result").style.display = "block";
        document.getElementById("result-text").innerHTML = "What a champion! You won!";

    } else if (triesCounter >= tries && matchesCounter != 6){
        document.getElementById("result").style.display = "block";
        document.getElementById("result-text").innerHTML = "Better luck next time! Give it another go!";

    }
}

//------------------Restart Game---------------------------

function restart() {
    location.reload();
}