


function rollDice() {
    let rollNumber = Math.floor(Math.random() * 6 + 1);
    let currentPlayer = getCurrentPlayer();
    roundScore = addScore(rollNumber, currentPlayer);
    checkWin(currentPlayer);
    displayRollNumber(rollNumber)
    showWinner()
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
    let currentPlayer = getCurrentPlayer();
    currentPlayer.totalScore += currentPlayer.roundScore;
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
    constructor(name) {
        this.name = name;
        this.roundScore = 0;
        this.totalScore = 0;
    }
}



let breakPoints = 100;
function checkWin(currentPlayer) {
    let bothScores = currentPlayer.totalScore + currentPlayer.roundScore
    if (currentPlayer.totalScore >= breakPoints || bothScores >= breakPoints) {
        console.log(`${currentPlayer.name} is the Winner`);
        return true
    } else {
        console.log("still in play")
        return false
    }
}


const game = new Game();
const player1 = new Player("Player One");
const player2 = new Player("Player Two");
game.addPlayer(player1);
game.addPlayer(player2);

//UI Logic




window.addEventListener("load", function () {
    const rollBtn = document.getElementById("rollBtn");
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
    holdBtn.addEventListener("click", function() {
      hold();
      updateUI();
    });
    startBtn.addEventListener("click", function(){
      location.reload()
    })

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
        document.getElementById("rollNumber2").innerHTML = "&nbsp"
      } else {
        document.getElementById(2).setAttribute("class", "player activePlayer");
        document.getElementById(1).removeAttribute("class")
        document.getElementById(1).setAttribute("class", "player");
        document.getElementById("rollNumber1").innerHTML = "&nbsp"
      }

    }
});

   
function showWinner() {
    let currentPlayer = getCurrentPlayer();
    if (checkWin(currentPlayer) === true ) {
        document.getElementById("buttons").setAttribute("id", "hidden");
        const winnerH2 = document.createElement("h2");
        winnerH2.innerHTML = `${currentPlayer.name} wins!`;
        document.body.appendChild(winnerH2);
        if (currentPlayer.id === 1) {
            document.getElementById("2").remove();
        } else 
            {
            document.getElementById("1").remove();
        }
        return true
    }
}

function displayRollNumber(rollNumber) {
    const rollNumber1Display = document.getElementById("rollNumber1");
    const rollNumber2Display = document.getElementById("rollNumber2");
    let currentPlayer = getCurrentPlayer();

    if (rollNumber === 1) {
        if (currentPlayer.id === 1) {
            rollNumber2Display.textContent = "⚀";
        } else {
            rollNumber1Display.textContent = "⚀";
            }
    } if (rollNumber === 2) {
        if (currentPlayer.id === 1) {
            rollNumber1Display.textContent = "⚁";
        } else {
            rollNumber2Display.textContent = "⚁";
            }
    } if (rollNumber === 3) {
        if (currentPlayer.id === 1) {
            rollNumber1Display.textContent = "⚂";
        } else {
            rollNumber2Display.textContent = "⚂";
            }
    } if (rollNumber === 4) {
        if (currentPlayer.id === 1) {
            rollNumber1Display.textContent = "⚃";
        } else {
            rollNumber2Display.textContent = "⚃";
            }
    } if (rollNumber === 5) {
        if (currentPlayer.id === 1) {
            rollNumber1Display.textContent = " ⚄";
        } else {
            rollNumber2Display.textContent = "⚄";
            }
    } if (rollNumber === 6) {
        if (currentPlayer.id === 1) {
            rollNumber1Display.textContent = "⚅";
        } else {
            rollNumber2Display.textContent = " ⚅";
            }
    }
}


// ⚀ ⚁ ⚂ ⚃ ⚄ ⚅
