const suits = ["s", "h", "d", "c"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
const rank = [2, 3, 4, 5, 6, 7, 8, 9, 10, "j", "q", "k", "a"];

function Player(_firstName, _lastName, _username, _phoneNumber, _email, _money) {
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.username = _username;
    this.phoneNumber = _phoneNumber;
    this.email = _email;
    this.money = _money;
    this.makeBet = (amt) => {
        this.money -= amt;
    }
}

function Card(_rank, _suit, _value) {
    this.rank = _rank;
    this.suit = _suit;
    this.value = _value;
    this.faceUp = false;
    this.image = `<img src='./images/cards/${this.rank}${this.suit}.png'>`;
    this.imageBack = "<img src='./images/cards/back.png' id='backCard'>";
    this.image2 = `./images/cards/${this.rank}${this.suit}.png`;
    this.cardName = () => {
        return `${this.rank} of ${this.suit}`;
    };
    if (this.rank === 'j' || this.rank === 'q' || this.rank === 'k')
        this.value = 10;
    else if (this.rank === 'a')
        this.value = 11;
    else
        this.value = this.rank;
} // Card()


function Deck() {
    let cards = [];
    this.cards = cards;
    // this.dealersStack = [];
    // this.playersStack = [];
    this.randomStack = [];

    this.createDeck = () => {
        for (let i = 0; i < 4; i++) {
            for (let numRank = 0; numRank < rank.length; numRank++) {
                for (let numSuit = 0; numSuit < suits.length; numSuit++) {
                    this.cards[this.cards.length] = new Card(rank[numRank], suits[numSuit], values[numRank]);
                } // for(numSuit < suits.length)
            } // for(numValue < values.length)
        } // for(i<4)
    };
    this.shuffle = () => {
        for (let numShuffles = 0; numShuffles < 7; numShuffles++) {
            for (let numCard = 0; numCard < this.cards.length; numCard++) {
                let currentIndex = Math.ceil(Math.random() * this.cards.length - 1);
                let tempCard = this.cards[numCard];
                this.cards[numCard] = this.cards[currentIndex];
                this.cards[currentIndex] = tempCard;
            }
        }
    };
    this.dealHands = (playersHand, dealersHand) => {
        playersHand.push(this.cards.pop());
        dealersHand.push(this.cards.pop());
        playersHand.push(this.cards.pop());
        dealersHand.push(this.cards.pop());
    };
    this.dealCard = () => {
        return this.cards.pop();
    };
    this.dealHand = (hand, hand2) => {
        this.randomStack[0] = hand;
        this.randomStack[1] = hand2;
    };
}


function Hand(...cards) {
    let hand = [...cards];
    this.hand = hand;
    this.playersTurn = true;
    this.bet;

    this.hitMe = (Card) => {
        // if the players or dealer hits hit me a new card gets added to his Hand
        this.hand.push(Card);
    };

    this.stay = () => {
        this.playersTurn = false;
    };

    this.assignBet = (amount, player) => {
        this.bet = amount;
        player.money -= this.bet;
    };

    this.getHandValue = () => {
        let handValue = 0;
        for (let i = 0; i < hand.length; i++) {
            handValue += hand[i].value;
        }
        return handValue;
    };

    this.checkHand = () => {
        // I have to check if it is over 21
        // then I have to lower the A from a 11 to 1 if the total is above 21
        // I have to check if the players hand is lower then 21
        // I have to check if the dealer goes over 21 => then he busts and the player wins
        // I have to check if player has a blackjack
        if (this.getHandValue() > 21) {
            for (let j = 0; j < this.hand.length; j++) {
                if (this.hand[j].rank === 'a') {
                    this.hand[j].value = 1;
                    if (this.getHandValue() < 21) {
                        return "Ace gets lowered";
                    }
                }
            }
            return "Bust";
        } else if (this.getHandValue() === 21) {
            for (let i = 0; i < this.hand.length; i++) {
                if ((this.hand[i].rank === 'a' || this.hand[i].rank === 'k') && (this.hand[i + 1].rank === 'a' || this.hand[i + 1].rank === 'k'))
                    return "Natural BlackJack";
                else if ((this.hand[i].rank === 'a' || this.hand[i].rank === 'j') && (this.hand[i + 1].rank === 'a' || this.hand[i + 1].rank === 'j'))
                    return "Natural BlackJack";
                else if ((this.hand[i].rank === 'a' || this.hand[i].rank === 'q') && (this.hand[i + 1].rank === 'a' || this.hand[i + 1].rank === 'q'))
                    return "Natural BlackJack";
            }
            return 'BlackJack';
        } else
            return "Safe";
    };

    this.compareHands = (dHand) => {
        if (dHand.getHandValue() <= 21) {
            if (this.getHandValue() > dHand.getHandValue() && (this.getHandValue() <= 21 && dHand.getHandValue() <= 21))
                return 'The Player Wins';
            else if (this.getHandValue() === dHand.getHandValue() && this.getHandValue() <= 21)
                return 'Push';
            else
                return 'The Dealer wins';
        } else {
            return 'The Player Wins';
        }
    };

    this.checkWinningHand = (outcome, player) => {
        if (outcome === "The Player Wins")
            player.money += (this.bet * 2);
        else if (outcome === "Push")
            player.money += this.bet;
        else if (outcome === "BlackJack")
            player.money += (this.bet * 2) + (this.bet / 2);
    }
}

function changeCreds() {
    localStorage.clear();
}

let hereBefore = function () {
    if (localStorage.playedBefore && localStorage.previousName.toUpperCase() === localStorage.firstName.toUpperCase()) {
        $$("#usernameAndName").innerHTML = `Welcome back, ${localStorage.username} aka ${localStorage.firstName} ${localStorage.lastName} (${decodeURIComponent(localStorage.email)})<br>`;
        let phone = localStorage.phoneNum;
        phone = phone.replace(/\./g, '');
        phone = `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6)}`;
        $$("#pNumAndCity").innerHTML = `Your phone number is: ${phone} and you live in ${decodeURIComponent(localStorage.city)}.<br>`;
        localStorage.bankRoll = localStorage.moneyEarned;
        $$("#bank").innerHTML = `You have $${localStorage.bankRoll} left in your bank roll.<br>`;
        $$("#lastVisit").innerHTML = localStorage.lastVisit;
        $$("#creds").innerHTML = `Not ${localStorage.firstName} ${localStorage.lastName}?`;
        $$("#notUser").addEventListener("click", changeCreds, false);
        localStorage.removeItem('playedBefore');
        localStorage.removeItem('previousName');
        localStorage.removeItem('lastVisit');
    }
    else {
        $$("#name").innerHTML = "Name: " + localStorage.firstName + " " + localStorage.lastName;
        $$("#usernameP").innerHTML = "Username: " + localStorage.username;
        $$("#pNum").innerHTML = "Phone number: " + localStorage.phoneNum;
        $$("#city").innerHTML = "City: " + decodeURIComponent(localStorage.city);
        $$("#email").innerHTML = "Email: " + decodeURIComponent(localStorage.email);
        $$("#money").innerHTML =  localStorage.bankRoll;
        $$("#credsP").style = "display: none;";
        localStorage.removeItem('playedBefore');
        localStorage.removeItem('previousName');
        localStorage.removeItem('lastVisit');
    }
};

function gameSetup() {
    hereBefore();
    let player = new Player(`${localStorage.firstName}`, `${localStorage.lastName}`, `${localStorage.username}`, `${localStorage.phoneNum}`, `${decodeURIComponent(localStorage.email)}`, `${localStorage.bankRoll}`);
    let deck = new Deck();
    let playersHand;
    let dealersHand;
    deck.createDeck();
    deck.shuffle();
    let play = $$("#play");
    let hitMe = $$("#hitMe");
    hitMe.disabled = true;
    hitMe.style = "background-color: #dddddd;";
    let stay = $$("#stay");
    stay.disabled = true;
    stay.style = "background-color: #dddddd;";
    let bet = $$("#betInput");
    let errorMessage = $$("#errorMessage");
    let bank = $$("#money");

    function checkMoney() {
        if (parseInt(bet.value) <= 0) {
            errorMessage.innerHTML = "Please make a bet bigger than 0.";
            $$("#dealersCards").innerHTML = "";
            $$("#playersCards").innerHTML = "";
        } else if (player.money <= 0) {
            errorMessage.innerHTML = "You have no more money.";
            play.disabled = true;
            hitMe.disabled = true;
            stay.disabled = true;
        } else if (bet.value === "") {
            errorMessage.innerHTML = "Please make a bet before you play!";
        } else if (parseInt(bet.value) > player.money) {
            errorMessage.innerHTML = "You can't bet more than how much you have.";
        } else if (isNaN(bet.value)) {
            errorMessage.innerHTML = "Bet has to be in digits.";
        } else if (parseInt(bet.value) > 0 && parseInt(bet.value) <= player.money) {
            play.disabled = true;
            play.style = "background-color: #dddddd;";
            errorMessage.innerHTML = "";
            bet.disabled = true;
            startUpGame();
            bank.innerHTML = `$${player.money}`;
        }
    }

    function playButtonLogic() {
        checkMoney();
        $$("#dealersHandValue").innerHTML = "";
        $$("#winningHand").style = "";
        $$("#winningHand").innerHTML = "";
    }

    $$("#play").addEventListener('click', playButtonLogic, false);

    function displayResults() {
        hitMe.disabled = true;
        hitMe.style = "background-color: #dddddd;";
        stay.disabled = true;
        stay.style = "background-color: #dddddd;";
        play.disabled = false;
        play.style = "background-color: white;";
        bet.disabled = false;
        $$("#playersHandValue").innerHTML = playersHand.getHandValue();
        $$("#dealersHandValue").innerHTML = dealersHand.getHandValue();
        $$("#winningHand").style = 'border: 4px solid red';
        $$("#winningHand").innerHTML = playersHand.compareHands(dealersHand) + ", Make another bet";
        playersHand.checkWinningHand(`${playersHand.compareHands(dealersHand).toString()}`, player);
        bank.innerHTML = `$${player.money}`;
        if(playersHand.getHandValue() > dealersHand.getHandValue() || dealersHand.getHandValue() > 21){
            setUpMetals();
        }
    }

    function equalAndGreaterThanTwentyOne(){
        if (dealersHand.getHandValue() <= 16) {
            flipCard();
            dealersHand.hitMe(deck.dealCard());
            $$("#dealersCards").innerHTML += dealersHand.hand[dealersHand.hand.length - 1].image;
            displayResults();
        } else if (dealersHand.getHandValue() >= 17) {
            flipCard();
            dealersHand.stay();
            displayResults();
        } else {
            flipCard();
            displayResults();
        }
    }

    function hitButtonLogic() {
        playersHand.hitMe(deck.dealCard());
        $$("#playersCards").innerHTML += playersHand.hand[playersHand.hand.length - 1].image;
        $$("#playersHandValue").innerHTML = playersHand.getHandValue();
        playersHand.checkHand();
        if (playersHand.getHandValue() === 21) {
            equalAndGreaterThanTwentyOne();
        }
        if (playersHand.getHandValue() > 21) {
            equalAndGreaterThanTwentyOne();
        }
        clearInterval(clearMetals);
        $$("#playersHandValue").innerHTML = playersHand.getHandValue();
    }

    $$("#hitMe").addEventListener('click', hitButtonLogic, false);

    function stayButtonLogic() {
        bet.disabled = false;
        hitMe.disabled = true;
        hitMe.style = "background-color: #dddddd;";
        stay.disabled = true;
        stay.style = "background-color: #dddddd;";
        play.disabled = false;
        play.style = "background-color: white;";
        flipCard();
        if (dealersHand.getHandValue() >= 17) {
            flipCard();
            dealersHand.stay();
            displayResults();
        } else if (dealersHand.getHandValue() <= 16) {
            dealersHand.hitMe(deck.dealCard());
            dealersHand.checkHand();
            $$("#dealersCards").innerHTML += dealersHand.hand[dealersHand.hand.length - 1].image;
            displayResults();
        } else if (dealersHand.getHandValue() < 21 && dealersHand.getHandValue() < playersHand.getHandValue()) {
            dealersHand.hitMe(deck.dealCard());
            dealersHand.checkHand();
            $$("#dealersCards").innerHTML += dealersHand.hand[dealersHand.hand.length - 1].image;
            displayResults();
        } else {
            displayResults();
        }
    }

    $$("#stay").addEventListener('click', stayButtonLogic, false);

    function displayCards() {
        $$("#dealersCards").innerHTML = dealersHand.hand[0].imageBack;
        $$("#dealersCards").innerHTML += dealersHand.hand[1].image;
        $$("#playersCards").innerHTML = playersHand.hand[0].image;
        $$("#playersCards").innerHTML += playersHand.hand[1].image;
    }

    function flipCard() {
        $$("#backCard").src = dealersHand.hand[0].image2;
    }

    function startUpGame() {
        playersHand = new Hand();
        dealersHand = new Hand();
        playersHand.assignBet(parseInt(bet.value), player);
        bank.innerHTML = `$${player.money}`;
        deck.dealHands(playersHand.hand, dealersHand.hand);
        hitMe.disabled = false;
        hitMe.style = "background-color: white;";
        stay.disabled = false;
        stay.style = "background-color: white;";
        displayCards();
        $$("#playersHandValue").innerHTML = playersHand.getHandValue();
        if (playersHand.getHandValue() === 21) {
            flipCard();
            displayResults();
            stay.disabled = false;
        }
        if (playersHand.getHandValue() > 21) {
            flipCard();
            displayResults();
            stay.disabled = false;
        }
    }

    function leaveGame() {
        let previousName = localStorage.firstName;
        let moneyEarned = player.money;
        localStorage.clear();
        localStorage.previousName = previousName;
        localStorage.moneyEarned = moneyEarned;
        localStorage.playedBefore = true;
        let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
            "November", "December"];
        let now = new Date();
        let hour = now.getHours();
        let time;
        let minute = now.getMinutes();
        if (hour >= 13) {
            hour -= 12;
            time = "p.m.";
        }
        else if (hour ===12)
            time = "p.m.";
        else
            time = "a.m.";
        if (minute < 10)
            minute = "0" + minute;
        localStorage.lastVisit = `Your last visit was ${month[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} at ${hour}:${minute} ${time}`;
        window.location = `./quitPage.html?moneyEarned=${player.money}&name=${player.firstName}`;
    }

    $$("#quit").addEventListener('click', leaveGame, false);
}

window.addEventListener('load', gameSetup, false);

