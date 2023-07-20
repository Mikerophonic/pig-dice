import { Game, Player } from './../src/pigdice.js'

describe ('Game', () => {
    
    let game;
    beforeEach(() => {
        game = new Game();
      });

    test('It should create a game object with three properties, players, IDs and round', () => {
        expect(game.players).toEqual({}); 
        expect(game.currentId).toEqual(0);
        expect(game.round).toEqual(1);
    });
    
    test('It should add a player with a unique ID', () => {
        const player1 = new Player("Player 1")
        game.addPlayer(player1);
        expect(game.players["1"].name).toEqual("Player 1");
        expect(game.currentId).toEqual(1);
    });

    test('It should roll a number between 1 and 6', () => {
        const player1 = new Player("Player 1")
        game.addPlayer(player1)
        const result = game.rollDice();
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);    
    });

    test('If a 1 is rolled, the player score will go to zero', () => {
        const player1 = new Player("Player 1");
        game.addPlayer(player1);
        game.addScore(1, player1);
        expect(game.players["1"].roundScore).toEqual(0);
    });
    
    test('If a 2-6 is rolled, the player score will add the rolled value to their current score', () => {
        const player1 = new Player("Player 1");
        game.addPlayer(player1);
        let result = game.addScore(game.rollDice(), player1)
        expect(game.players["1"].roundScore).toEqual(result);
    });

    test('If a player decides to hold, their roundscore will move to their totalscore', () => {
        const player1 = new Player("Player 1");
        game.addPlayer(player1);
        const player2 = new Player("Player 2");
        game.addPlayer(player2);
        game.addScore(5, player1)
        game.hold();
        expect(game.players["1"].totalScore).toEqual(5);
        expect(game.players["1"].roundScore).toEqual(0);
    });

    test('It should be the next round after holding', () => {
        const player1 = new Player("Player 1");
        game.addPlayer(player1);
        game.hold();
        expect(game.round).toEqual(2);
    })

    test('It should be the next players turn after a player holds', () => {
        const player1 = new Player("Player 1");
        game.addPlayer(player1);
        const player2 = new Player("Player 2");
        game.addPlayer(player2);
        expect(game.getCurrentPlayer().name).toEqual("Player 1");
        game.hold();
        expect(game.getCurrentPlayer().name).toEqual("Player 2");
    })

    test('It should check if the current players roundscore plus total score is equal to or greater than the winning score', () => {
        const player1 = new Player("Player 1");
        game.addPlayer(player1);
    });

});