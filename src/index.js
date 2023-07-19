import './css/styles.css';
import { Game, Player } from './pigdice.js'


//UI Logic

const game = new Game();
const player1 = new Player("Player One");
const player2 = new Player("Player Two");
game.addPlayer(player1);
game.addPlayer(player2);


window.addEventListener("load", function () {
  const rollBtn = document.getElementById("rollBtn");
  const holdBtn = document.getElementById("holdBtn");
  const startBtn = document.getElementById("startBtn");
  const totalScore1Span = document.getElementById("totalScore1");
  const roundScore1Span = document.getElementById("roundScore1");
  const totalScore2Span = document.getElementById("totalScore2");
  const roundScore2Span = document.getElementById("roundScore2");


  rollBtn.addEventListener("click", function() {
    Game.rollDice();
    updateUI();
  });
  holdBtn.addEventListener("click", function() {
    Game.hold();
    updateUI();
  });
  startBtn.addEventListener("click", function(){
    location.reload();
  });

  function updateUI() {
    totalScore1Span.innerText = player1.totalScore;
    totalScore2Span.innerText = player2.totalScore;
    roundScore1Span.innerText = "(+" + player1.roundScore + ")";
    roundScore2Span.innerText = "(+" + player2.roundScore + ")";
    let cPlayer = Game.getCurrentPlayer().id;
    if (cPlayer === 1) {
      document.getElementById(1).setAttribute("class", "player activePlayer");
      document.getElementById(2).removeAttribute("class");
      document.getElementById(2).setAttribute("class", "player");
      document.getElementById("rollNumber2").innerHTML = "&nbsp";
    } else {
      document.getElementById(2).setAttribute("class", "player activePlayer");
      document.getElementById(1).removeAttribute("class");
      document.getElementById(1).setAttribute("class", "player");
      document.getElementById("rollNumber1").innerHTML = "&nbsp";
    }

  }
});

   
export function showWinner() {
  let currentPlayer = Game.getCurrentPlayer();
  if (Game.checkWin(currentPlayer) === true ) {
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
    return true;
  }
}

export function displayRollNumber(rollNumber) {
  const rollNumber1Display = document.getElementById("rollNumber1");
  const rollNumber2Display = document.getElementById("rollNumber2");
  let currentPlayer = Game.getCurrentPlayer();

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
