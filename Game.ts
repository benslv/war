import { Deck } from "./Deck";

export class Game {
	p1: { suit: string; value: string }[];
	p2: { suit: string; value: string }[];

	constructor() {
		const deck = new Deck(true);
		const deckSize = deck.get().length;

		this.p1 = deck.get().splice(0, deckSize / 2);
		this.p2 = deck.get().splice(-deckSize / 2);

		console.log(this.p1, this.p2);
	}
}
