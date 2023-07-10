
let roundScore = 0;
let totalScore = 0;
let breakPoints = 100;

function rollDice() {
    let rollNumber = Math.floor(Math.random() * 6 + 1);
    const currentPlayer = getCurrentPlayer();
    currentPlayer.roundScore = addScore(rollNumber);
    checkWin();
    return rollNumber;
}

function addScore(number) {
    if (number !== 1) {
    roundScore += number;
    } else {
    roundScore = 0;
    nextTurn();
    }   
    return roundScore;
}

function hold() {
    const currentPlayer = getCurrentPlayer();
    currentPlayer.totalScore += roundScore;
    checkWin();
    currentPlayer.roundScore = 0;
    nextTurn();
}

function nextTurn() {
    game.round++;
}

function getCurrentPlayer() {
    const currentPlayerId = (game.round - 1) % Object.keys(game.players).length + 1;
    return game.players[currentPlayerId];
}

class Game {
  constructor(){
    this.players = {};
    this.currentId = 0;
    this.round = 1;
  }
}

Game.prototype.addPlayer = function(player) {
  player.id = this.assignId();
  this.players[player.id] = player;
};

Game.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

class Player {
    constructor(roundScore, totalScore) {
        this.roundScore = 0;
        this.totalScore = 0;
    }
}

function checkWin() {
  const currentPlayer = getCurrentPlayer();
  if (breakPoints <= currentPlayer.totalScore || breakPoints <= currentPlayer.totalScore + currentPlayer.roundScore) {
    return console.log("Winner")    
  }
}

const game = new Game();
const player1 = new Player()
const player2 = new Player()
game.addPlayer(player1);
game.addPlayer(player2);


//UI Logic



window.addEventListener("load", function () {
    const rollAgainBtn = document.getElementById("rollAgainBtn");
    const holdBtn = document.getElementById("holdBtn");
    const totalScore1Span = document.getElementById("totalScore1");
    const roundScore1Span = document.getElementById("roundScore1");
    const totalScore2Span = document.getElementById("totalScore2");
    const roundScore2Span = document.getElementById("roundScore2");
    const player1Div = document.getElementById("player1")
    const player2Div = document.getElementById("player2")
    rollAgainBtn.addEventListener("click", rollDice);
    holdBtn.addEventListener("click", hold);
});

// function highlightPlayer() {
//     if (((game.round - 1) % Object.keys(game.players).length + 1) === 1) {
//         player2Div.removeAttribute("class", "hidden")
//     } else {
//         player1Div.removeAttribute("class", "hidden")
//     }
// }

// highlightPlayer()

// function displayScores
