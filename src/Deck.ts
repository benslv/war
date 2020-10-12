import { Card } from "./Card.model";

export class Deck {
	deck: Card[];

	// Constructor for the deck, with option to immediately shuffle it after creation.
	constructor(shuffle: boolean = false) {
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
				// Construct a card object according to the Card interface.
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

	// Returns this.deck (an array of objects) when called.
	get(): Card[] {
		return this.deck;
	}

	// Utility method for comparing two cards.
	// Returns 0 if equal, 1 if player 1's card is higher, -1 if player 2's card is higher.
	static compare(p1: Card, p2: Card): number {
		const values: object = {
			"2": 2,
			"3": 3,
			"4": 4,
			"5": 5,
			"6": 6,
			"7": 7,
			"8": 8,
			"9": 9,
			"10": 10,
			Jack: 11,
			Queen: 12,
			King: 13,
			Ace: 14,
		};

		if (values[p1.value] === values[p2.value]) return 0;

		return values[p1.value] > values[p2.value] ? 1 : -1;
	}
}
