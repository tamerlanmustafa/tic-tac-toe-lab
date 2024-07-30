/*-------------------------------- Constants --------------------------------*/


const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEL = document.querySelector('#reset')

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


/*---------------------------- Variables (state) ----------------------------*/
let turn = 'X'
let winner = false
let tie = false
let currentCell

let board = [
    '', '', '',
    '', '', '',
    '', '', '',
]




/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/




function updateBoard() {
    board.forEach((square, index) => {
        if (square === 'X') {
            currentCell = document.getElementById(index)
            currentCell.style.backgroundColor = '#EB3678'
            currentCell.innerHTML = square
        } else if (square === 'O') {
            currentCell = document.getElementById(index)
            currentCell.style.backgroundColor = '#FB773C'
            currentCell.innerHTML = square
        } else if (square === '') {
            currentCell = document.getElementById(index)
            currentCell.style.backgroundColor = '#39b6e0'
            
        }
    })
}


/// HANDLE CLICK

function handleClick(event) {
    
    const squareIndex = event.target.id

    if (board[squareIndex] !== '' || winner) {
        return
    }
    placePiece(squareIndex)
    checkForWinner()
    checkForTie() 
    switchPlayerTurn()
    updateBoard()
    updateMessage()
}


squareEls.forEach((squareEl ) => {
    squareEl.addEventListener('click', handleClick)
})

function placePiece(index) {
    board[index] = turn

}

/////////////



function checkForWinner() {
    
    winningCombos.forEach(winningCombo => {
        let combo = winningCombo
        if (
            board[combo[0]] !== '' &&
            board[combo[0]] === board[combo[1]] &&
            board[combo[1]] === board[combo[2]] 
        )

        {
            winner = true

        }
    })
}



function checkForTie() {
    tie = board.every(square => square !== '') && !winner;
} 

function switchPlayerTurn() {

    if (!winner) {
        if (turn === 'X') {
            turn = 'O'
        } else if (turn === 'O') {
            turn = 'X'
        }
    }
}


function updateMessage() {
    if (!winner && !tie) {
        messageEl.innerText = `Game in progress... Turn: ${turn} `
    } else if (!winner && tie) {
        messageEl.innerHTML = 'It is a Tie'
    } else {
        messageEl.innerHTML = `Congratulations! ${turn} won!`
    }
}





function init() {
 
    updateBoard()
    updateMessage()
}



init()

/*----------------------------- Event Listeners -----------------------------*/



