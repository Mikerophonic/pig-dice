export class Game {
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

  rollDice() {
    let rollNumber = Math.floor(Math.random() * 6 + 1);
    let currentPlayer = this.getCurrentPlayer();
    let roundScore = this.addScore(rollNumber, currentPlayer);
    this.checkWin(currentPlayer);
    return rollNumber;
  }

  addScore(number, currentPlayer) {
    if (number !== 1) {
      currentPlayer.roundScore += number;
    } else {
      currentPlayer.roundScore = 0;
      this.nextTurn();
    }
    return currentPlayer.roundScore;
  }

  hold() {
    let currentPlayer = this.getCurrentPlayer();
    currentPlayer.totalScore += currentPlayer.roundScore;
    currentPlayer.roundScore = 0;
    this.nextTurn();
  }

  nextTurn() {
    this.round++;   
  }
    
  getCurrentPlayer() {
    let currentPlayerId = (this.round - 1) % Object.keys(this.players).length + 1;
    return this.players[currentPlayerId];
  }

  checkWin(currentPlayer) {
    let bothScores = currentPlayer.totalScore + currentPlayer.roundScore;
    if (currentPlayer.totalScore >= breakPoints || bothScores >= breakPoints) {
      return true;
    } else {
      return false;
    }
  }

}



export class Player {
  constructor(name) {
    this.name = name;
    this.roundScore = 0;
    this.totalScore = 0;
  }
}



let breakPoints = 100;



