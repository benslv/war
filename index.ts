import Deck from "./Deck";


// Create one unshuffled deck.
const deck1 = new Deck();
console.log(deck1);

// Create one shuffled deck.
const deck2 = new Deck(true);
console.log(deck2);