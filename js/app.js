/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/
let playerScore;
let currentBranch;
let currentCard = 0;
let playerDeath = false;

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

function handleClick(element) {
    // console.log("choice test")
    currentCard++;
    console.log(`Current Card:`, currentCard)
    console.log(element.target)
    messageElement.textContent = aggressiveStoryLines[currentCard].text;
    if (element.target.dataset.playerDeath === "true") {
        playerDeath = true;
    }
    if (currentCard > 3 && playerDeath === true) {
        choiceElements.forEach(div => div.remove());
        messageElement.textContent = aggressiveStoryLines[4].text;
        return; 
    } else if (currentCard > 3 && element.target.id === "2") {
        choiceElements.forEach(div => div.remove());
        messageElement.textContent = aggressiveStoryLines[5].text;
        console.log("second ending")
    } else if (currentCard > 3 && element.target.id === "3") {
        choiceElements.forEach(div => div.remove());
        messageElement.textContent = aggressiveStoryLines[6].text;
        console.log("third ending")
    }
    
    choices[currentCard].forEach((choice, index) => {

        choiceElements[index].textContent = choice.text
        console.log(choice.instantDeath, index)
        if (choice.instantDeath === true) {
            choiceElements[index].dataset.playerDeath = true;
            // console.log(playerDeath)
        }
    // if (aggressiveStoryLines.branch === 1 && aggressiveStoryLines.)
    })
    // gameOver()
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
    choice.addEventListener('click', handleClick)
})

document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('adventureContainer').style.display = 'flex';
    messageElement.textContent = aggressiveStoryLines[currentCard].text;
    choices[currentCard].forEach((choice, index) => {
        choiceElements[index].textContent = choice.text
    })
    
})
//     const messageElement
//     aggressiveStoryLines.forEach(story => {
//         if (branch === 1 && card === 1) {
//             messageElement.textContent = story.text;
//         }      
//     })
    
