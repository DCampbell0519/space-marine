/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/
let playerScore;

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

function handleClick(choice) {
    console.log("choice test")
}

/*----------- Event Listeners ----------*/
choiceElements.forEach(choice => {
    choice.addEventListener('click', handleClick)
})

document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('adventureContainer').style.display = 'flex';
})

