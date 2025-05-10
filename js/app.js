/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/
let playerScore;
let currentBranch;
let currentCard = 0;
let playerDeath = false;
let isFirstClick = true;

/*----- Cached Element References  -----*/
const choiceElements = document.querySelectorAll('.square')
// console.log(choiceElements)

const messageElement = document.querySelector('#message')

/*-------------- Functions -------------*/
function initialize() {
    playerScore = 0;

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
        aggroClick(element)
    } else if (currentBranch === 2) {
        stealthClick(element)
    } else if (currentBranch === 3) {
        dareDevilClick(element)
    }
    isFirstClick = false;
    // tallyPoints();
}

function dareDevilClick(element) {
    const playerPoints = aggroChoices[currentCard][parseInt(element.target.id) - 1].points;
    currentCard++;
    console.log(`Current Card:`, currentCard)
    console.log(element.target)
    messageElement.textContent = dareDevilStoryLines[currentCard].text;
    checkForEnding(element, dareDevilStoryLines)
   
    console.log(`PLAYERPOINTS:`, playerPoints)
    tallyPoints(playerPoints);
    
    if (!dareDevilChoices[currentCard]) {
        processEndings();
    } else {
        dareDevilChoices[currentCard].forEach((choice, index) => {    
            choiceElements[index].textContent = choice.text
            if (choice.instantDeath === true) {
                choiceElements[index].dataset.playerDeath = true;
            }
        })
    }
}

function stealthClick(element) {
    const playerPoints = aggroChoices[currentCard][parseInt(element.target.id) - 1].points;
    currentCard++;
    console.log(`Current Card:`, currentCard)
    console.log(element.target)
    messageElement.textContent = stealthStoryLines[currentCard].text;
    checkForEnding(element, stealthStoryLines)
    
    console.log(`PLAYERPOINTS:`, playerPoints)
    tallyPoints(playerPoints);

    if (!stealthChoices[currentCard]) {
        processEndings();
    } else {
        stealthChoices[currentCard].forEach((choice, index) => {
            choiceElements[index].textContent = choice.text
            if (choice.instantDeath === true) {
                choiceElements[index].dataset.playerDeath = true;
            }
        })
    }
}

function aggroClick(element) {
    console.log(`TARGET:`, element.target.id)
    const playerPoints = aggroChoices[currentCard][parseInt(element.target.id) - 1].points;
    currentCard++;
    console.log(`Current Card:`, currentCard)
    console.log(element.target)
    messageElement.textContent = aggroStoryLines[currentCard].text;
    checkForEnding(element, aggroStoryLines)
    
    console.log(`PLAYERPOINTS:`, playerPoints)
    tallyPoints(playerPoints);

    if (!aggroChoices[currentCard]) {
        processEndings();
    } else {
        aggroChoices[currentCard].forEach((choice, index) => {
            choiceElements[index].textContent = choice.text
            if (choice.instantDeath === true) {
                choiceElements[index].dataset.playerDeath = true;
            }
        })
    }
}

function tallyPoints(playerPoints) {
    const luckyPoints = Math.floor(Math.random() * (25 - 0 + 1))
    playerScore = luckyPoints + playerPoints + playerScore;
    console.log(`luckyPoints:`, luckyPoints)
    console.log(`playerScore:`, playerScore)
}

// function gameOver() {
//     if (playerDeath === true) {
//         messageElement.textContent = aggressiveStoryLines[4].text;
//         return;
//     }
// }

function processEndings() {
    const endButton = document.createElement('button')
    endButton.className = 'finishAdventure';
    endButton.textContent = "Finish Your Mission";
    const endingContainer = document.querySelector('#adventureContainer')
    endingContainer.appendChild(endButton)
    endButton.addEventListener('click', () => {
        if (currentBranch === 1) {
            processFinalScore(aggroEndings)
        } else if (currentBranch === 2) {
            processFinalScore(stealthEndings)
        } else {
            processFinalScore(dareDevilEndings)
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

function checkForEnding(element, storyLines) {
    if (element.target.dataset.playerDeath === "true") {
        playerDeath = true;
    }
    if (currentCard > 3 && playerDeath === true) {
        choiceElements.forEach(div => div.remove());
        messageElement.textContent = storyLines[4].text;
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
// const playerPoints = aggroChoices[currentCard][parseInt(element.target.id) - 1].points;
// function updateMessage() {
//     storyLines.forEach(story => {
//         if (branch === 1 && )
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
    
