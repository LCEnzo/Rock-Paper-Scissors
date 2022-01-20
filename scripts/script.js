const pointsEl = document.querySelector(".score");
const rockIcon = document.querySelector("#rock");
const paperIcon = document.querySelector("#paper");
const scissorsIcon = document.querySelector("#scissors");
const infoPara = document.querySelector(".info-box p");
const playButton = document.querySelector("#play-button");

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

function updateScore(playerScore = 0, botScore = 0) {
    pointsEl.textContent = `${Math.floor(playerScore)}/${Math.floor(botScore)}`;

    if(playerScore == 5 || botScore == 5) {
        infoPara.textContent = `${botScore != 5 ? "You've " : "The bot has "} won`;

        setAfterGameState();
    }
}

function playRound(event) {
    let pick;
    if(event.target == rockIcon) pick = Rock;
    else if(event.target == paperIcon) pick = Paper;
    else if(event.target == scissorsIcon) pick = Scissors;
    else throw new Error(`Call on invalid DOM element ${event.target}.`);

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

function startOver(event) {
    initialize();
    const target = event.target;
    target.style['display'] = 'none';
    infoPara.textContent = '';
} 

function initialize() {
    playerScore = 0;
    botScore = 0;

    rockIcon.addEventListener("click", playRound);
    paperIcon.addEventListener("click", playRound);
    scissorsIcon.addEventListener("click", playRound);
    playButton.removeEventListener("click", startOver);

    updateScore();
}

function setAfterGameState() {
    rockIcon.removeEventListener('click', playRound);
    paperIcon.removeEventListener('click', playRound);
    scissorsIcon.removeEventListener('click', playRound);

    playButton.addEventListener("click", startOver);
    playButton.style['display'] = 'block';
}

initialize();