// 1 deposit some money
// 2 determine no. of lines to bet on
// 3 collect bet amount 
// 4 spin the slot machine
// 5 check if user won 
// 6 give users their winning \
// 7 play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2

}




// const SYMBOLS = Object.keys(SYMBOLS_COUNT);
const deposit = () => {
    while (true) {
        const depositAmount = prompt(" Enter the deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);
        if (numberDepositAmount <= 0 || isNaN(numberDepositAmount)) {
            console.log("Invalid amount, try again");
        } else {
            return numberDepositAmount;
        }
    }
};


// const depositAmount = deposit();
// console.log(depositAmount);

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt(" Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);
        if (numberOfLines > 3 || isNaN(numberOfLines) || numberOfLines <= 0) {
            console.log("Invalid number, try again");
        } else {
            return numberOfLines;
        }
    }
};

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet, try again");
        } else {
            return numberBet;
        }
    }
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        //   console.log(symbol,count)
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    // console.log(symbols)
    return reels;
}
//A


const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != rows.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString)
    }

};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }

    }
    return winnings;
}



const game = () => {
    let balance = deposit();

    while(true){
    console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines();
    // console.log(numberOfLines);
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    console.log(reels)
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines)

    console.log("You won, $" + winnings.toString());

    if(balance <=0){
        console.log("YOu ran out of money!")
        break;
    }
    const playAgain = prompt("Do you want to play again(Y/N)? " );
    if(playAgain != "y")break;
    }
}

game();