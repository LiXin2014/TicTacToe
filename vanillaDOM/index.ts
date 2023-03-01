const board = document.querySelector(".board");
const gameStatus = document.querySelector(".status");

document.querySelectorAll

type GameBoard = [[HTMLButtonElement, HTMLButtonElement, HTMLButtonElement],
                  [HTMLButtonElement, HTMLButtonElement, HTMLButtonElement],
                  [HTMLButtonElement, HTMLButtonElement, HTMLButtonElement]]

type CurrentMove = "X" | "O";
type Winner = "X" | "O" | "Tie" | undefined;

let gameBoard : GameBoard;
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
    if(gameBoard[0][0].innerText === gameBoard[0][1].innerText && gameBoard[0][0].innerText === gameBoard[0][2].innerText) {
        return gameBoard[0][0].innerText as Winner;
    }
    if(gameBoard[1][0].innerText === gameBoard[1][1].innerText && gameBoard[1][0].innerText === gameBoard[1][2].innerText) {
        return gameBoard[1][0].innerText as Winner;
    }
    if(gameBoard[2][0].innerText === gameBoard[2][1].innerText && gameBoard[2][0].innerText === gameBoard[2][2].innerText) {
        return gameBoard[2][0].innerText as Winner;
    }
    //check columns
    if(gameBoard[0][0].innerText === gameBoard[1][0].innerText && gameBoard[0][0].innerText === gameBoard[2][0].innerText) {
        return gameBoard[0][0].innerText as Winner;
    }
    if(gameBoard[0][1].innerText === gameBoard[1][1].innerText && gameBoard[0][1].innerText === gameBoard[2][1].innerText) {
        return gameBoard[0][1].innerText as Winner;
    }
    if(gameBoard[0][2].innerText === gameBoard[1][2].innerText && gameBoard[0][2].innerText === gameBoard[2][2].innerText) {
        return gameBoard[0][2].innerText as Winner;
    }
    //check diagnols
    if(gameBoard[0][0].innerText === gameBoard[1][1].innerText && gameBoard[0][0].innerText === gameBoard[2][2].innerText) {
        return gameBoard[0][0].innerText as Winner;
    }
    if(gameBoard[0][2].innerText === gameBoard[1][1].innerText && gameBoard[0][2].innerText === gameBoard[2][0].innerText) {
        return gameBoard[0][2].innerText as Winner;
    }

    if(movesMade === 9) {
        return "Tie";
    }
}

function createButtons() {
    const button1 = document.createElement("button");
    button1.setAttribute("data-columns", "0");
    button1.setAttribute("data-rows", "0");
    button1.addEventListener("click", onClick);

    const button2 = document.createElement("button");
    button2.setAttribute("data-columns", "1");
    button2.setAttribute("data-rows", "0");
    button2.addEventListener("click", onClick);

    const button3 = document.createElement("button");
    button3.setAttribute("data-columns", "2");
    button3.setAttribute("data-rows", "0");
    button3.addEventListener("click", onClick);

    const button4 = document.createElement("button");
    button4.setAttribute("data-columns", "0");
    button4.setAttribute("data-rows", "1");
    button4.addEventListener("click", onClick);

    const button5 = document.createElement("button");
    button5.setAttribute("data-columns", "1");
    button5.setAttribute("data-rows", "1");
    button5.addEventListener("click", onClick);

    const button6 = document.createElement("button");
    button6.setAttribute("data-columns", "2");
    button6.setAttribute("data-rows", "1");
    button6.addEventListener("click", onClick);

    const button7 = document.createElement("button");
    button7.setAttribute("data-columns", "0");
    button7.setAttribute("data-rows", "2");
    button7.addEventListener("click", onClick);

    const button8 = document.createElement("button");
    button8.setAttribute("data-columns", "1");
    button8.setAttribute("data-rows", "2");
    button8.addEventListener("click", onClick);

    const button9 = document.createElement("button");
    button9.setAttribute("data-columns", "2");
    button9.setAttribute("data-rows", "2");
    button9.addEventListener("click", onClick);

    const rows1 = document.createElement("div");
    rows1.classList.add("row");
    rows1.appendChild(button1);
    rows1.appendChild(button2);
    rows1.appendChild(button3);

    const rows2 = document.createElement("div");
    rows2.classList.add("row");
    rows2.appendChild(button4);
    rows2.appendChild(button5);
    rows2.appendChild(button6);

    const rows3 = document.createElement("div");
    rows3.classList.add("row");
    rows3.appendChild(button7);
    rows3.appendChild(button8);
    rows3.appendChild(button9);

    board?.appendChild(rows1);
    board?.appendChild(rows2);
    board?.appendChild(rows3);

    gameBoard = [[button1, button2, button3],
                 [button4, button5, button6],
                 [button7, button8, button9],]
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