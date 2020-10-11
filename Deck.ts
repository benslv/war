export default class Deck {
	deck: { suit: string; value: string | number }[];

	// Constructor for the deck, with option to immediately shuffle it after creation.
	constructor(shuffle: boolean=false) {
		this.deck = [];

		const suits: string[] = ["Hearts", "Spades", "Clubs", "Diamonds"];
		const values: string[] = [
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"Jack",
			"Queen",
			"King",
			"Ace",
		];

		// Generate all the possible combinations of card type.
		for (let suit of suits) {
			for (let value of values) {
				// Contruct a card object according to the Card interface.
				const card: Card = {
					suit: suit,
					value: value,
				};

				this.deck.push(card);
			}
		}

		// Shuffle the deck if needed.
		if (shuffle) this.shuffle();
	}

	shuffle() {
		let i = this.deck.length;

		while (i--) {
			const ri = Math.floor(Math.random() * (i + 1));

			// Looks like a cool use of ES6 array destructuring to swap the values in two positions of an array. Neat!
			[this.deck[i], this.deck[ri]] = [this.deck[ri], this.deck[i]];
		}
	}
}

interface Card {
	suit: string;
	value: string;
}
