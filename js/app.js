
/*---------- Variables (state) ---------*/
let playerScore;
let currentBranch;
let currentCard;
let playerDeath;
let isFirstClick;

/*----- Cached Element References  -----*/
let choiceElements = document.querySelectorAll('.square')
const freshChoices = choiceElements;

const messageElement = document.querySelector('#message')

const startButton = document.getElementById('startButton')

const gameContainer = document.getElementById('gameContainer')

const adventureContainer = document.getElementById('adventureContainer')

/*-------------- Functions -------------*/
function initialize() {
    playerScore = 0;
    currentCard = 0;
    playerDeath = false;
    isFirstClick = true;
}
window.onload = initialize;

function firstChoice(element) {
    if (element.target.id === "1" && isFirstClick === true) {
       currentBranch = 1;
    } else if (element.target.id === "2" && isFirstClick === true) {
        currentBranch = 2;
    } else if (element.target.id === "3" && isFirstClick === true) {
        currentBranch = 3;
    } 

    if (currentBranch === 1) {
        handleClick(element, aggroChoices, aggroStoryLines)
    } else if (currentBranch === 2) {
        handleClick(element, stealthChoices, stealthStoryLines)
    } else if (currentBranch === 3) {
        handleClick(element, dareDevilChoices, dareDevilStoryLines)
    }
    isFirstClick = false;
}

function handleClick(element, choices, storyLines) {
    const playerPoints = choices[currentCard][parseInt(element.target.id) - 1].points;
    currentCard++;
    messageElement.textContent = storyLines[currentCard].text;
    checkForClimax(element, storyLines)
    tallyPoints(playerPoints);
    if (!choices[currentCard]) {
        if (!playerDeath) {
            processEndings();
        }
        return;
    }    
    choices[currentCard].forEach((choice, index) => {
        choiceElements[index].textContent = choice.text
        if (choice.instantDeath === true) {
            choiceElements[index].dataset.playerDeath = "true";
        } else {
            delete choiceElements[index].dataset.playerDeath;
        }
    })
};

function checkForClimax(element, storyLines) {
    if (element.target.dataset.playerDeath === "true") {
        playerDeath = true;
    }
    if (currentCard > 3 && playerDeath === true) {
        choiceElements.forEach(div => div.remove());
        messageElement.textContent = storyLines[4].text;
        resetYourMission();
        return; 
    } else if (currentCard > 3 && element.target.id === "2") {
        choiceElements.forEach(div => div.remove());
        messageElement.textContent = storyLines[5].text;
    } else if (currentCard > 3 && element.target.id === "3") {
        choiceElements.forEach(div => div.remove());
        messageElement.textContent = storyLines[6].text;
    }
}

function tallyPoints(playerPoints) {
    const luckyPoints = Math.floor(Math.random() * (25 - 0 + 1))
    playerScore = luckyPoints + playerPoints + playerScore;
}

function processEndings() {
    if (playerDeath === true) return;
    const endButton = document.createElement('button')
    endButton.className = 'finishAdventure';
    endButton.textContent = "Finish Your Mission";
    const endingContainer = document.querySelector('#adventureContainer')
    endingContainer.appendChild(endButton)
    endButton.addEventListener('click', () => {
        if (currentBranch === 1) {
            processFinalScore(aggroEndings)
            endButton.remove();
            resetYourMission();
        } else if (currentBranch === 2) {
            processFinalScore(stealthEndings)
            endButton.remove();
            resetYourMission();
        } else {
            processFinalScore(dareDevilEndings)
            endButton.remove();
            resetYourMission();
        }
    })
}

function processFinalScore(ending) {
    if (playerScore > 120) {
        messageElement.textContent = ending[0].text;
    } else if (playerScore < 75) {
        messageElement.textContent = ending[1].text;
    } else if (playerScore >= 75) {
        messageElement.textContent = ending[2].text;
    }
}

function resetYourMission() {
    const resetButton = document.createElement('button')
    const resetContainer = document.querySelector('#adventureContainer')
    resetButton.className = 'resetMission';
    resetButton.textContent = "Reset Mission"
    resetContainer.appendChild(resetButton)
    
    resetButton.addEventListener('click', () => {
        const existingEndButton = document.querySelector('.finishAdventure')
        if (existingEndButton) {
            existingEndButton.remove();
        }
        initialize();
        currentBranch = undefined;
        choiceElements = freshChoices;
        choiceElements.forEach((element) => {
            element.removeAttribute('data-player-death');
            document.querySelector(".choices").appendChild(element);
        })
        resetContainer.removeChild(resetButton)
        reRender();
    })
}

function deploy() {
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('adventureContainer').style.display = 'flex';
    messageElement.textContent = aggroStoryLines[currentCard].text;
    aggroChoices[currentCard].forEach((choice, index) => {
        choiceElements[index].textContent = choice.text
        })
    
}
function reRender() {
    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('adventureContainer').style.display = 'none';
    messageElement.textContent = aggroStoryLines[currentCard].text;
    aggroChoices[currentCard].forEach((choice, index) => {
        choiceElements[index].textContent = choice.text
        })
}

/*----------- Event Listeners ----------*/

choiceElements.forEach(choice => {
    choice.addEventListener('click', firstChoice)
})

document.getElementById('startButton').addEventListener('click', () => {
    deploy();
})

    
