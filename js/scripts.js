
let roundScore = 0;
let totalScore = 0;

function rollDice() {
    let rollNumber = Math.floor(Math.random() * 6 + 1);
    const currentPlayer = getCurrentPlayer();
    currentPlayer.roundScore = addScore(rollNumber);
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

function Game() {
  this.players = {};
  this.currentId = 0;
  this.round = 1;
}

Game.prototype.addPlayer = function(player) {
  player.id = this.assignId();
  this.players[player.id] = player;
};

Game.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

function Player(roundScore, totalScore) {
  this.roundScore = 0;
  this.totalScore = 0;
}

Player.prototype.gameCard = function() {
  return "Player: " + this.id + " " + "Round: " + this.round + " " + "Round Score: " + this.roundScore + " " + "Total Score: " + this.totalScore
}

const game = new Game();
const player1 = new Player()
const player2 = new Player()
game.addPlayer(player1);
game.addPlayer(player2);

// function rollDice() {
//   let rollNumber = Math.floor(Math.random() * 6 + 1);
//   return rollNumber;
// }

// let roundScore = 0;
// let totalScore = 0;

// function addScore(number) {
//   if (number !== 1) {
//     roundScore += number;
//   } else {
//     roundScore = 0;
//   }
//   return roundScore;
// }

// function hold() {
//   totalScore += roundScore;
//   roundScore = 0;
// }

// function nextTurn() {
//   roundScore = 0;
// }

// function getCurrentPlayer() {
//   const currentPlayerId = (game.round % Object.keys(game.players).length);
//   return game.players[currentPlayerId];
// }

// function Game() {
//   this.players = {};
//   this.currentId = 0;
//   this.round = 1;
// }

// Game.prototype.addPlayer = function(player) {
//   player.id = this.assignId();
//   this.players[player.id] = player;
// };

// Game.prototype.assignId = function() {
//   this.currentId += 1;
//   return this.currentId;
// };

// function Player(roundScore, totalScore) {
//   this.roundScore = roundScore;
//   this.totalScore = totalScore;
// }

// Player.prototype.gameCard = function() {
//   return "Player: " + this.playerId + " " + "Round: " + this.round + " " + "Round Score: " + this.roundScore + " " + "Total Score: " + this.totalScore;
// }

// const game = new Game();
// const player1 = new Player();
// const player2 = new Player();
// game.addPlayer(player1);
// game.addPlayer(player2);

// const currentPlayer = getCurrentPlayer();
// currentPlayer.roundScore = rollDice();
// currentPlayer.roundScore = addScore(rollDice());
// currentPlayer.roundScore = addScore(rollDice());
// hold();
// console.log(currentPlayer.gameCard());