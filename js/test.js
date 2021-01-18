console.log('%c ***************Testing to create a new Player***************', 'color: red; font-weight: bold;');

console.log("Player created:");
let player = new Player("Nahom", "Haile", "a123B", "819-111-1111", "n@a.com", 500);
console.table(player);

console.log('%c ***************Testing for creating card objects***************', 'color: red; font-weight: bold;');

let card1 = new Card('k', 'd',10);
let card2 = new Card('q', 'h', 10);
let card3 = new Card('j', 'c', 10);

console.log(`Card name: ${card1.cardName()}`);
console.log(`Rank: ` + `%c ${card1.rank}`, `color:blue;`);
console.log(`Suit: ` + `%c ${card1.suit}`, `color:blue;`);
console.log(`Value: ` + `%c ${card1.value}`, `color:blue;`);
console.log();
console.log(`Card name: ${card2.cardName()}`);
console.log(`Rank: ` + `%c ${card2.rank}`, `color:blue;`);
console.log(`Suit: ` + `%c ${card2.suit}`, `color:blue;`);
console.log(`Value: ` + `%c ${card3.value}`, `color:blue;`);
console.log();
console.log(`Card name:  ${card3.cardName()}`);
console.log(`Rank: ` + `%c ${card3.rank}`, `color:blue;`);
console.log(`Suit: ` + `%c ${card3.suit}`, `color:blue;`);
console.log(`Value: ` + `%c ${card3.value}`, `color:blue;`);


console.log("%c ***************Testing the deck***************" , 'color: red; font-weight: bold;');

let deck = new Deck();

console.log("My Deck");
deck.createDeck();
console.table(deck.cards);

console.log("My Deck Shuffled");
deck.shuffle();
console.table(deck.cards);



console.log("%c ***************Testing For dealers and players hand***************" , 'color: red; font-weight: bold;');

let dhand = new Hand();
let phand = new Hand();
deck.dealHands(phand.hand, dhand.hand);


console.log("*Dealers Hand*");
console.table(dhand.hand);
console.log(`Hand value: ` + `%c ${dhand.getHandValue()}`, `color:blue;`);
console.log(`Checking hand: ` + `%c ${dhand.checkHand()}`, `color:blue;`);

console.log("*Players Hand*");
console.table(phand.hand);
console.log(`Hand value: ` + `%c ${phand.getHandValue()}`, `color:blue;`);
console.log(`Checking hand: ` + `%c ${phand.checkHand()}`, `color:blue;`);

console.log("%c ***************Checking when the player hits:***************" , 'color: red; font-weight: bold;');
phand.hitMe(deck.dealCard());
console.log(`The ` + `%c ${phand.hand[phand.hand.length-1].cardName()}`, `color:blue;`,` got added to the players hand`);
console.table(phand.hand);
console.log(`Hand value for player is now: ` + `%c ${phand.getHandValue()}`, `color:blue;`);
dhand.hitMe(deck.dealCard());
console.log(`When the player hits, the dealer also gets another card: The ` + `%c ${dhand.hand[dhand.hand.length-1].cardName()}`, `color:blue;`);
console.table(dhand.hand);
console.log(`Hand value for dealer now is: ` + `%c ${dhand.getHandValue()}`, `color:blue;`);
console.log(`Comparing hand with dealer: ` + `%c ${phand.compareHands(dhand)}` , `color:blue;`);
phand.checkWinningHand(phand.compareHands(dhand), player);


console.log('%c ***************Testing players bank according to players winning state***************', 'color: red; font-weight: bold;');
player.makeBet(5000);
console.log(`Player bank is: ` + `%c ${player.money}` , `color:blue;`);
phand.assignBet(20, player);
console.log(`Players bet: ` + `%c $20`, 'color:blue;');
console.log(`Players bank after betting: ` + `%c ${player.money}`, 'color:blue;');
phand.checkWinningHand(phand.compareHands(dhand), player);
console.log(`Players bank is now: ` + `%c ${player.money}`, 'color:blue;');

console.log('%c Checking to see if my deck is updated:', 'color:red;');
console.table(deck.cards);
console.log(`Deck length: ${deck.cards.length}`);


console.log('%c ***************Testing Random generated hands***************', 'color: red; font-weight: bold;');

let hand1 = new Hand(new Card('a', 'c', 11), new Card('k', 'd', 10));

console.log("%c Testing for blackjack:", "color:blue;");
console.table(hand1.hand);
console.log(`Hand value: ${hand1.getHandValue()}`);
console.log(`Checking hand: ${hand1.checkHand()}`);

let hand2 = new Hand(new Card('j', 's', 10), new Card('q', 's', 10));

console.log("%c Testing for Two face cards:", "color:blue;");
console.table(hand2.hand);
console.log(`Hand value: ${hand2.getHandValue()}`);
console.log(`Checking hand: ${hand2.checkHand()}`);

let hand3 = new Hand(new Card('a', 'd', 11), new Card('a', 'c', 11) );

console.log("%c Testing Two Aces:", "color:blue;");
console.table(hand3.hand);
console.log(`Hand value: ${hand3.getHandValue()}`);
console.log(`Checking hand: ${hand3.checkHand()}`);
console.log(`Hand value Now: ${hand3.getHandValue()}`);
console.log(`Checking hand Again: ${hand3.checkHand()}`);

let hand4 = new Hand(new Card('k', 'd', 10), new Card('q', 'c', 10), new Card('j', 'd', 10));

console.log("%c Testing a Bust:", "color:blue;");
console.table(hand4.hand);
console.log(`Hand value: ${hand4.getHandValue()}`);
console.log(`Checking hand: ${hand4.checkHand()}`);

let hand5 = new Hand(new Card('a', 'c', 11), new Card('j', 'd', 10));

console.log("%c Testing for blackjack:", "color:blue;");
console.table(hand5.hand);
console.log(`Hand value: ${hand5.getHandValue()}`);
console.log(`Checking hand: ${hand5.checkHand()}`);