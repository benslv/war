import { Game } from "./Game";

const game = new Game();

let i = 0;

console.log("Game has started!");

while (!game.hasWinner()) {
	game.playRound();
	i += 1;
}

console.log(`Winner after ${i} rounds.`);
