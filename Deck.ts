export default class Deck {
	deck: { suit: string; value: string | number }[];

	constructor() {
		this.deck = [];

		const suits: string[] = ["Hearts", "Spades", "Clubs", "Diamonds"];
		const values: (string | number)[] = [
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			"Jack",
			"Queen",
			"King",
			"Ace",
		];

		for (let suit of suits) {
			for (let value of values) {
				this.deck.push({
					suit: suit,
					value: value,
				});
			}
		}
	}
}
