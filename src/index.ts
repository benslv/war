import { Game } from "./Game";
const fs = require("fs");

const NUM_GAMES: number = 10_000;
let total_rounds: number = 0;

let rounds = [];

let max_rounds: number = 0;
let min_rounds: number = Infinity;

console.log("Game has started!");

for (let j = 0; j < NUM_GAMES; j++) {
	try {
		const game: Game = new Game();
		let i = 0;
		while (!game.hasWinner()) {
			game.playRound();
			i += 1;
		}
		total_rounds += i;
		rounds.push(i);

		max_rounds = Math.max(i, max_rounds);
		min_rounds = Math.min(i, min_rounds);
	} catch (err) {
		continue;
	}
}

console.log(`Total number of rounds played: ${total_rounds}.`);
console.log(`Average number of rounds to win was ${Math.round(total_rounds / NUM_GAMES)}.`);
console.log(`Maximum # rounds: ${max_rounds}.\nMinimum # rounds: ${min_rounds}.`);

fs.writeFileSync("output.txt", JSON.stringify(rounds), (err) => console.error(err));