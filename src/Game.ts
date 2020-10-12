import { Card } from "./Card.model";
import { Deck } from "./Deck";

export class Game {
	p1Deck: Card[];
	p2Deck: Card[];

	constructor() {
		// Create a new, shuffled deck to play with.
		const deck = new Deck(true);

		// Split the deck in half and allocate to each player.
		this.p1Deck = deck.get().splice(0, 26);
		this.p2Deck = deck.get().splice(-26);
	}

	playRound(): void {
		const p1Card: Card = this.p1Deck.shift();
		const p2Card: Card = this.p2Deck.shift();

		// Remove the top card from each players' decks and compare them.
		const outcome: number = Deck.compare(p1Card, p2Card);

		// console.log(`Player 1: ${p1Card.value}\nPlayer 2: ${p2Card.value}`);

		switch (outcome) {
			case 0: // Cards are equal.
				// console.log(`WAR!!! Both players played: ${p1Card.value}`);
				// this.war();
				this.war(p1Card, p2Card);
				break;
			case 1: // Player 1 wins.
				this.p1Deck.push(p1Card);
				this.p1Deck.push(p2Card);
				// console.log(
				// 	`Player 1 won, with ${p1Card.suit}-${p1Card.value} against ${p2Card.suit}-${p2Card.value}`,
				// );
				break;
			case -1: // Player 2 wins.
				this.p2Deck.push(p2Card);
				this.p2Deck.push(p1Card);
				// console.log(
				// 	`Player 2 won, with ${p2Card.suit}-${p2Card.value} against ${p1Card.suit}-${p1Card.value}`,
				// );
				break;
		}
	}

	war(p1Card: Card, p2Card: Card): void {
		let outcome: number; // Outcome determining which player won (1: Player 1, -1: Player 2, 0: Draw).
		let winner: boolean = false; // Set to true when outcome is non-zero.

		// Face up and face down "piles" for each of the two players.
		// Initialised with a card from the top of each of their decks.
		let p1FaceDown: Card[] = [this.p1Deck.shift()];
		let p1FaceUp: Card[] = [this.p1Deck.shift()];

		let p2FaceDown: Card[] = [this.p2Deck.shift()];
		let p2FaceUp: Card[] = [this.p2Deck.shift()];

		while (!winner) {
			// Compare the two face up cards on the table.
			outcome = Deck.compare(p1FaceUp[0], p2FaceUp[0]);

			if (outcome !== 0) {
				winner = true;
			} else {
				// If no winner is found, add a new card face up and face down in each of the players' spaces.
				// Each player is checked to see if they have at least two cards remaining in their deck.
				// If not, they'll lose the war, and subsequently the entire game.
				if (this.p1Deck.length >= 2) {
					p1FaceDown.unshift(this.p1Deck.shift());
					p1FaceUp.unshift(this.p1Deck.shift());
				} else {
					outcome = -1;
					break;
				}

				if (this.p2Deck.length >= 2) {
					p2FaceDown.unshift(this.p2Deck.shift());
					p2FaceUp.unshift(this.p2Deck.shift());
				} else {
					outcome = 1;
					break;
				}
			}
		}

		switch (outcome) {
			case 1: // Player 1 wins.
				// Add all the cards from each players' face up and face down piles to Player 1's deck.
				this.p1Deck.push(
					p1Card,
					p2Card,
					...p1FaceUp,
					...p1FaceDown,
					...p2FaceUp,
					...p2FaceDown,
				);
				// console.log("Pushed cards to Player 1's deck.");
				break;
			case -1: // Player 2 wins.
				// Add all the cards from each players' face up and face down piles to Player 2's deck.
				this.p2Deck.push(
					p2Card,
					p1Card,
					...p2FaceUp,
					...p2FaceDown,
					...p1FaceUp,
					...p1FaceDown,
				);
				// console.log("Pushed cards to Player 2's deck.");
				break;
		}
	}

	hasWinner(): boolean {
		return this.p1Deck.length === 52 || this.p2Deck.length === 52;
	}

	printDeckSize(): void {
		console.log(this.p1Deck.length, this.p2Deck.length);
	}
}
