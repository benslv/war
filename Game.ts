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

		switch (outcome) {
            case 0: // Cards are equal.
                console.log(`WAR!!! Both players played: ${p1Card.value}`);
				this.war();
				break;
			case 1: // Player 1 wins.
				this.p1Deck.push(p1Card);
				this.p1Deck.push(p2Card);
				console.log(
					`Player 1 won, with ${p1Card.suit}-${p1Card.value} against ${p2Card.suit}-${p2Card.value}`,
				);
				break;
			case -1: // Player 2 wins.
				this.p2Deck.push(p2Card);
				this.p2Deck.push(p1Card);
				console.log(
					`Player 2 won, with ${p2Card.suit}-${p2Card.value} against ${p1Card.suit}-${p1Card.value}`,
				);
				break;
        }
        
        return;
	}

	war(): void {
		let outcome: number;
		let winner: boolean = false;

		let p1FaceDown: Card[] = [this.p1Deck.shift()];
		let p1FaceUp: Card[] = [this.p1Deck.shift()];

		let p2FaceDown: Card[] = [this.p2Deck.shift()];
		let p2FaceUp: Card[] = [this.p2Deck.shift()];

		while (!winner) {
			outcome = Deck.compare(p1FaceUp[0], p2FaceUp[0]);

			if (outcome !== 0) {
				winner = true;
			} else {
				p1FaceDown.unshift(this.p1Deck.shift());
				p1FaceUp.unshift(this.p1Deck.shift());
				p2FaceDown.unshift(this.p2Deck.shift());
				p2FaceUp.unshift(this.p2Deck.shift());
			}
		}

		switch (outcome) {
			case 1: // Player 1 wins.
				this.p1Deck = [
					...this.p1Deck,
					...p1FaceUp,
					...p1FaceDown,
					...p2FaceUp,
					...p2FaceDown,
				];
				break;
			case -1: // Player 2 wins.
				this.p2Deck = [
					...this.p2Deck,
					...p2FaceUp,
					...p2FaceDown,
					...p1FaceUp,
					...p1FaceDown,
				];
				break;
        }
        
        return;
	}

	hasWinner(): boolean {
		return this.p1Deck.length === 52 || this.p2Deck.length === 52;
	}

	printDeckSize(): void {
		console.log(this.p1Deck.length, this.p2Deck.length);
	}
}
