const pointsEl = document.querySelector(".score");
const rockIcon = document.querySelector("#rock");
const paperIcon = document.querySelector("#paper");
const scissorsIcon = document.querySelector("#scissors");
const infoPara = document.querySelector(".info-box p");

const Rock = 0;
const Paper = 1;
const Scissors = 2;

const PlayerWin = 1;
const BotWin = -1;
const Tie = 0;

let playerScore = 0;
let botScore = 0;

function getBotHand() {
    let pick = Math.random();

    switch(true) {
        case pick <= 0.30:
            pick = Rock;
            break;
        case pick <= 0.5:
            pick = Paper;
            break;
        default:
            pick = Scissors; 
    }

    return pick;
}

function evalPicks(playerPick, botPick) {
    if(playerPick == botPick) return Tie;
    else if(playerPick == Rock) {
        return botPick == Paper ? BotWin : PlayerWin;
    }
    else if(playerPick == Paper) {
        return botPick == Scissors ? BotWin : PlayerWin;
    }
    else if(playerPick == Scissors) {
        return botPick == Rock ? BotWin : PlayerWin;
    }

    throw new Error(`evalPicksError, playerPick: ${playerPick}, botPick: ${botPick}`);
}

function updateScore(playerScore, botScore) {
    pointsEl.textContent = `${Math.floor(playerScore)}/${Math.floor(botScore)}`;
}

function playRound(pick) {
    if(typeof pick != 'number') {
        throw new TypeError("pick is not a number");
    }

    pick = Math.floor(pick);

    if(pick != Rock && pick != Paper && pick != Scissors) {
        throw new Error(`Math.floor(pick) must equal one of [Rock: ${Rock}, Paper: ${Paper}, Scissors: ${Scissors}].`);
    }

    const botPick = getBotHand();
    
    const win = evalPicks(pick, botPick); 
    if(win == PlayerWin) {
        playerScore++;
        infoPara.textContent = "You won";
    }
    else if(win == BotWin) {
        botScore++;
        infoPara.textContent = "Bot won";
    }
    else if(win == Tie) { 
        infoPara.textContent = "Tied, both picked ";

        if(pick == Rock) infoPara.textContent += "Rock";
        else if(pick == Paper) infoPara.textContent += "Paper";
        else if(pick == Scissors) infoPara.textContent += "Scissors";
    }
    else {
        throw new Error("evalPicks() returned bad value.");
    }

    updateScore(playerScore, botScore);
}

rockIcon.addEventListener("click", event => playRound(Rock))
paperIcon.addEventListener("click", event => playRound(Paper))
scissorsIcon.addEventListener("click", event => playRound(Scissors))