/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/
let playerScore;
let currentBranch;
let currentCard = 0;
let playerDeath = false;
let isFirstClick = true;

/*----- Cached Element References  -----*/
const choiceElements = document.querySelectorAll('.square')

const messageElement = document.querySelector('#message')

/*-------------- Functions -------------*/
function initialize() {
    playerScore = 0;

    // render();
    // console.log("init 2")
}
window.onload = initialize;
// console.log("init 1")

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
        // TBD;
    }
    isFirstClick = false;
}

function stealthClick(element) {
    currentCard++;
    console.log(`Current Card:`, currentCard)
    console.log(element.target)
    messageElement.textContent = stealthStoryLines[currentCard].text;

    if (element.target.dataset.playerDeath === "true") {
        playerDeath = true;
    }
    if (currentCard > 3 && playerDeath === true) {
        choiceElements.forEach(div => div.remove());
        messageElement.textContent = stealthStoryLines[4].text;
        return; 
    } else if (currentCard > 3 && element.target.id === "2") {
        choiceElements.forEach(div => div.remove());
        messageElement.textContent = stealthStoryLines[5].text;
        console.log("second ending")
    } else if (currentCard > 3 && element.target.id === "3") {
        choiceElements.forEach(div => div.remove());
        messageElement.textContent = stealthStoryLines[6].text;
        console.log("third ending")
    }

    stealthChoices[currentCard].forEach((choice, index) => {

        choiceElements[index].textContent = choice.text
        console.log(choice.instantDeath, index)
        if (choice.instantDeath === true) {
            choiceElements[index].dataset.playerDeath = true;
            // console.log(playerDeath)
        }
    })
}

function aggroClick(element) {
    currentCard++;
    console.log(`Current Card:`, currentCard)
    console.log(element.target)
    messageElement.textContent = aggroStoryLines[currentCard].text;

    if (element.target.dataset.playerDeath === "true") {
        playerDeath = true;
    }
    if (currentCard > 3 && playerDeath === true) {
        choiceElements.forEach(div => div.remove());
        messageElement.textContent = aggroStoryLines[4].text;
        return; 
    } else if (currentCard > 3 && element.target.id === "2") {
        choiceElements.forEach(div => div.remove());
        messageElement.textContent = aggroStoryLines[5].text;
        console.log("second ending")
    } else if (currentCard > 3 && element.target.id === "3") {
        choiceElements.forEach(div => div.remove());
        messageElement.textContent = aggroStoryLines[6].text;
        console.log("third ending")
    }
    
    aggroChoices[currentCard].forEach((choice, index) => {

        choiceElements[index].textContent = choice.text
        console.log(choice.instantDeath, index)
        if (choice.instantDeath === true) {
            choiceElements[index].dataset.playerDeath = true;
            // console.log(playerDeath)
        }
    })
}

// function gameOver() {
//     if (playerDeath === true) {
//         messageElement.textContent = aggressiveStoryLines[4].text;
//         return;
//     }
// }

// function checkForEndings() {
//     document.querySelectorAll('.square')
//     if (event.target.card === 4.2) {
//         messageElement.textContent = test;
//     }
// }

// function updateMessage() {
//     storyLines.forEach(story => {
//         if (branch === 1 && )
//     })
// }

/*----------- Event Listeners ----------*/

choiceElements.forEach(choice => {
    choice.addEventListener('click', firstChoice)
    return; 
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
    
