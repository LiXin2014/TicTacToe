const board = document.querySelector(".board");
const gameStatus = document.querySelector(".status");
const ROW_COUNT = 3;
const COL_COUNT = 3;

type CellContent = HTMLButtonElement | undefined;

type GameBoard = [[CellContent, CellContent, CellContent],
                  [CellContent, CellContent, CellContent],
                  [CellContent, CellContent, CellContent]]

type CurrentMove = "X" | "O";
type Winner = "X" | "O" | "Tie" | undefined;

let gameBoard : GameBoard = [[undefined, undefined, undefined], 
                             [undefined, undefined, undefined], 
                             [undefined, undefined, undefined]]
let current: CurrentMove;
let movesMade: 0|1|2|3|4|5|6|7|8|9 = 0;
let gameOver = false;
let winner: Winner;

function onClick(event: MouseEvent) {
    if(event.target) {
        const button = event.target as HTMLButtonElement;
        if(button.innerText !== "" || gameOver) {
            return;
        }
        button.innerText = current;
        movesMade++;
    }
    
    winner = checkWinLose();
    
    if(winner) {
        gameOver = true;
    }
    updateStatus();
    current = current === "X" ? "O": "X";
}

function checkWinLose(): Winner | undefined {
    //check rows
    if(gameBoard[0][0]?.innerText === gameBoard[0][1]?.innerText && gameBoard[0][0]?.innerText === gameBoard[0][2]?.innerText) {
        return gameBoard[0][0]?.innerText as Winner;
    }
    if(gameBoard[1][0]?.innerText === gameBoard[1][1]?.innerText && gameBoard[1][0]?.innerText === gameBoard[1][2]?.innerText) {
        return gameBoard[1][0]?.innerText as Winner;
    }
    if(gameBoard[2][0]?.innerText === gameBoard[2][1]?.innerText && gameBoard[2][0]?.innerText === gameBoard[2][2]?.innerText) {
        return gameBoard[2][0]?.innerText as Winner;
    }
    //check columns
    if(gameBoard[0][0]?.innerText === gameBoard[1][0]?.innerText && gameBoard[0][0]?.innerText === gameBoard[2][0]?.innerText) {
        return gameBoard[0][0]?.innerText as Winner;
    }
    if(gameBoard[0][1]?.innerText === gameBoard[1][1]?.innerText && gameBoard[0][1]?.innerText === gameBoard[2][1]?.innerText) {
        return gameBoard[0][1]?.innerText as Winner;
    }
    if(gameBoard[0][2]?.innerText === gameBoard[1][2]?.innerText && gameBoard[0][2]?.innerText === gameBoard[2][2]?.innerText) {
        return gameBoard[0][2]?.innerText as Winner;
    }
    //check diagnols
    if(gameBoard[0][0]?.innerText === gameBoard[1][1]?.innerText && gameBoard[0][0]?.innerText === gameBoard[2][2]?.innerText) {
        return gameBoard[0][0]?.innerText as Winner;
    }
    if(gameBoard[0][2]?.innerText === gameBoard[1][1]?.innerText && gameBoard[0][2]?.innerText === gameBoard[2][0]?.innerText) {
        return gameBoard[0][2]?.innerText as Winner;
    }

    if(movesMade === 9) {
        return "Tie";
    }
}

function createButtons() {
    for(let row = 0; row<ROW_COUNT; row++) {
        const rows = document.createElement("div");
        rows.classList.add("row");

        for(let col=0; col<COL_COUNT; col++) {
            const button = document.createElement("button");
            button.setAttribute("data-rows", row.toString());
            button.setAttribute("data-columns", col.toString());
            button.addEventListener("click", onClick);
            gameBoard[row][col] = button;
            rows.appendChild(button);
        }

        board?.appendChild(rows);
    }
}

function createStatus() {
    const nextStatusText = document.createElement("p");
    nextStatusText.id="next";
    nextStatusText.innerText = `Next: ${current === "X" ? "O" : "X"}`;
    gameStatus?.appendChild(nextStatusText);
}

function updateStatus() {
    const nextStatusText = document.querySelector("#next") as HTMLParagraphElement;
    if(gameOver) {
        nextStatusText.innerText = `Winner: ${winner}`;
    } else {
        nextStatusText.innerText = `Next: ${current === "X" ? "O" : "X"}`;
    }
}

function createResetButton() {
    const button = document.createElement("button");
    button.id="reset";
    button.innerText = "Reset";
    gameStatus?.appendChild(button);
    button.addEventListener("click", (event) => {
        while(board?.firstChild) {
            board.removeChild(board.firstChild);
        }
        while(gameStatus?.firstChild) {
            gameStatus.removeChild(gameStatus.firstChild);
        }
        init();
    })
}

function createGame() {
    createButtons();
    createStatus();
    createResetButton();
}

function init() {
    createGame();
    current = "X";
    movesMade = 0;
    gameOver = false;
}
init();