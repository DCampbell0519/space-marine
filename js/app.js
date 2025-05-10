/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/
let playerScore;
let currentBranch;
let currentCard;
let playerDeath;
let isFirstClick;

/*----- Cached Element References  -----*/
const choiceElements = document.querySelectorAll('.square')
// console.log(choiceElements)

const messageElement = document.querySelector('#message')

/*-------------- Functions -------------*/
function initialize() {
    playerScore = 0;
    currentCard = 0;
    playerDeath = false;
    isFirstClick = true;
    // document.getElementById('gameContainer').style.display = 'flex';
    // document.getElementById('adventureContainer').style.display = 'none';
    // render();
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
    console.log(`TARGET:`, element.target.id)
    const playerPoints = choices[currentCard][parseInt(element.target.id) - 1].points;
    currentCard++;
    console.log(`Current Card:`, currentCard)
    console.log(element.target)
    messageElement.textContent = storyLines[currentCard].text;
    checkForClimax(element, storyLines)
    
    console.log(`PLAYERPOINTS:`, playerPoints)
    tallyPoints(playerPoints);

    if (!choices[currentCard]) {
        processEndings();
    } else {
        choices[currentCard].forEach((choice, index) => {
            choiceElements[index].textContent = choice.text
            if (choice.instantDeath === true) {
                choiceElements[index].dataset.playerDeath = true;
            }
        })
    }
}

function checkForClimax(element, storyLines) {
    if (element.target.dataset.playerDeath === "true") {
        playerDeath = true;
    }
    if (currentCard > 3 && playerDeath === true) {
        choiceElements.forEach(div => div.remove());
        messageElement.textContent = storyLines[4].text;
        endButton.remove();
        return; 
    } else if (currentCard > 3 && element.target.id === "2") {
        choiceElements.forEach(div => div.remove());
        messageElement.textContent = storyLines[5].text;
        console.log("second ending")
    } else if (currentCard > 3 && element.target.id === "3") {
        choiceElements.forEach(div => div.remove());
        messageElement.textContent = storyLines[6].text;
        console.log("third ending")
    }
}

function processEndings() {
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

function resetYourMission() {
    const resetButton = document.createElement('button')
    const resetContainer = document.querySelector('#adventureContainer')
    resetButton.className = 'resetMission';
    resetButton.textContent = "Reset Mission"
    resetContainer.appendChild(resetButton)
    resetButton.addEventListener('click', () => {
        initialize();
    })
}

function tallyPoints(playerPoints) {
    const luckyPoints = Math.floor(Math.random() * (25 - 0 + 1))
    playerScore = luckyPoints + playerPoints + playerScore;
    console.log(`luckyPoints:`, luckyPoints)
    console.log(`playerScore:`, playerScore)
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

// function render() {
//     const startButton = document.getElementById('startButton');
//     const gameContainer = document.getElementById('gameContainer');
//     const adventureContainer = document.getElementById('adventureContainer');

//     startButton.addEventListener('click', () => {
//         gameContainer.style.display = 'none';
//         adventureContainer.style.display = 'flex';
//         messageElement.textContent = aggroStoryLines[currentCard].text;
//         aggroChoices[currentCard].forEach((choice, index) => {
//             choiceElements[index].textContent = choice.text;
//         })
//     })
// }

/*----------- Event Listeners ----------*/

choiceElements.forEach(choice => {
    choice.addEventListener('click', firstChoice)
})

document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('adventureContainer').style.display = 'flex';
    messageElement.textContent = aggroStoryLines[currentCard].text;
    aggroChoices[currentCard].forEach((choice, index) => {
        choiceElements[index].textContent = choice.text
        })
    })


//     const messageElement
//     aggressiveStoryLines.forEach(story => {
//         if (branch === 1 && card === 1) {
//             messageElement.textContent = story.text;
//         }      
//     })
    
