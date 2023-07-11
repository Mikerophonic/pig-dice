let roundScore = 0;
let totalScore = 0;
let breakPoints = 100;

function rollDice() {
    let rollNumber = Math.floor(Math.random() * 6 + 1);
    const currentPlayer = getCurrentPlayer();
    roundScore = addScore(rollNumber, currentPlayer);
    checkWin(currentPlayer);
    console.log(rollNumber);
    return rollNumber;
}

function addScore(number, currentPlayer) {
    if (number !== 1) {
        currentPlayer.roundScore += number;
    } else {
        currentPlayer.roundScore = 0;
        nextTurn();
    }
    return currentPlayer.roundScore;
}

function hold() {
    const currentPlayer = getCurrentPlayer();
    currentPlayer.totalScore += roundScore;
    checkWin(currentPlayer);
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
    constructor() {
        this.players = {};
        this.currentId = 0;
        this.round = 1;
    }

    addPlayer(player) {
        player.id = this.assignId();
        this.players[player.id] = player;
    }

    assignId() {
        this.currentId += 1;
        return this.currentId;
    }
}

class Player {
    constructor() {
        this.roundScore = 0;
        this.totalScore = 0;
    }
}

function checkWin(currentPlayer) {
    if (breakPoints <= currentPlayer.totalScore || breakPoints <= currentPlayer.totalScore + currentPlayer.roundScore) {
        console.log("Winner");
    }
}

const game = new Game();
const player1 = new Player();
const player2 = new Player();
game.addPlayer(player1);
game.addPlayer(player2);


//UI Logic



window.addEventListener("load", function () {
    const rollAgainBtn = document.getElementById("rollBtn");
    const holdBtn = document.getElementById("holdBtn");
    const startBtn = document.getElementById("startBtn");
    const totalScore1Span = document.getElementById("totalScore1");
    const roundScore1Span = document.getElementById("roundScore1");
    const totalScore2Span = document.getElementById("totalScore2");
    const roundScore2Span = document.getElementById("roundScore2");
    const player1Div = document.getElementById("1")
    const player2Div = document.getElementById("2")
    rollBtn.addEventListener("click", function() {
      rollDice();
      updateUI();
    });
    rollBtn.addEventListener('click', function() {
        rollBtn.textContent = 'Roll Again';
      });
    holdBtn.addEventListener("click", function() {
      hold();
      updateUI();
    });
   

    function updateUI() {
    totalScore1Span.innerText = player1.totalScore;
    totalScore2Span.innerText = player2.totalScore;
    roundScore1Span.innerText = "(+" + player1.roundScore + ")";
    roundScore2Span.innerText = "(+" + player2.roundScore + ")";
    let cPlayer = getCurrentPlayer().id;

    if (cPlayer === 1) {
    document.getElementById(1).setAttribute("class", "player activePlayer");
    document.getElementById(2).removeAttribute("class")
    document.getElementById(2).setAttribute("class", "player");
    } else {
      document.getElementById(2).setAttribute("class", "player activePlayer");
      document.getElementById(1).removeAttribute("class")
      document.getElementById(1).setAttribute("class", "player");
    }
    
    }
});


