import { Game } from "./Game";

const game = new Game();

while (true) {
	game.playRound();
	game.printDeckSize();
}
