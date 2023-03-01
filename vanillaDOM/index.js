var board = document.querySelector(".board");
var gameStatus = document.querySelector(".status");
document.querySelectorAll;
var gameBoard;
var current;
var movesMade = 0;
var gameOver = false;
var winner;
function onClick(event) {
    if (event.target) {
        var button = event.target;
        if (button.innerText !== "" || gameOver) {
            return;
        }
        button.innerText = current;
        movesMade++;
    }
    winner = checkWinLose();
    if (winner) {
        gameOver = true;
    }
    updateStatus();
    current = current === "X" ? "O" : "X";
}
function checkWinLose() {
    //check rows
    if (gameBoard[0][0].innerText === gameBoard[0][1].innerText && gameBoard[0][0].innerText === gameBoard[0][2].innerText) {
        return gameBoard[0][0].innerText;
    }
    if (gameBoard[1][0].innerText === gameBoard[1][1].innerText && gameBoard[1][0].innerText === gameBoard[1][2].innerText) {
        return gameBoard[1][0].innerText;
    }
    if (gameBoard[2][0].innerText === gameBoard[2][1].innerText && gameBoard[2][0].innerText === gameBoard[2][2].innerText) {
        return gameBoard[2][0].innerText;
    }
    //check columns
    if (gameBoard[0][0].innerText === gameBoard[1][0].innerText && gameBoard[0][0].innerText === gameBoard[2][0].innerText) {
        return gameBoard[0][0].innerText;
    }
    if (gameBoard[0][1].innerText === gameBoard[1][1].innerText && gameBoard[0][1].innerText === gameBoard[2][1].innerText) {
        return gameBoard[0][1].innerText;
    }
    if (gameBoard[0][2].innerText === gameBoard[1][2].innerText && gameBoard[0][2].innerText === gameBoard[2][2].innerText) {
        return gameBoard[0][2].innerText;
    }
    //check diagnols
    if (gameBoard[0][0].innerText === gameBoard[1][1].innerText && gameBoard[0][0].innerText === gameBoard[2][2].innerText) {
        return gameBoard[0][0].innerText;
    }
    if (gameBoard[0][2].innerText === gameBoard[1][1].innerText && gameBoard[0][2].innerText === gameBoard[2][0].innerText) {
        return gameBoard[0][2].innerText;
    }
    if (movesMade === 9) {
        return "Tie";
    }
}
function createButtons() {
    var button1 = document.createElement("button");
    button1.setAttribute("data-columns", "0");
    button1.setAttribute("data-rows", "0");
    button1.addEventListener("click", onClick);
    var button2 = document.createElement("button");
    button2.setAttribute("data-columns", "1");
    button2.setAttribute("data-rows", "0");
    button2.addEventListener("click", onClick);
    var button3 = document.createElement("button");
    button3.setAttribute("data-columns", "2");
    button3.setAttribute("data-rows", "0");
    button3.addEventListener("click", onClick);
    var button4 = document.createElement("button");
    button4.setAttribute("data-columns", "0");
    button4.setAttribute("data-rows", "1");
    button4.addEventListener("click", onClick);
    var button5 = document.createElement("button");
    button5.setAttribute("data-columns", "1");
    button5.setAttribute("data-rows", "1");
    button5.addEventListener("click", onClick);
    var button6 = document.createElement("button");
    button6.setAttribute("data-columns", "2");
    button6.setAttribute("data-rows", "1");
    button6.addEventListener("click", onClick);
    var button7 = document.createElement("button");
    button7.setAttribute("data-columns", "0");
    button7.setAttribute("data-rows", "2");
    button7.addEventListener("click", onClick);
    var button8 = document.createElement("button");
    button8.setAttribute("data-columns", "1");
    button8.setAttribute("data-rows", "2");
    button8.addEventListener("click", onClick);
    var button9 = document.createElement("button");
    button9.setAttribute("data-columns", "2");
    button9.setAttribute("data-rows", "2");
    button9.addEventListener("click", onClick);
    var rows1 = document.createElement("div");
    rows1.classList.add("row");
    rows1.appendChild(button1);
    rows1.appendChild(button2);
    rows1.appendChild(button3);
    var rows2 = document.createElement("div");
    rows2.classList.add("row");
    rows2.appendChild(button4);
    rows2.appendChild(button5);
    rows2.appendChild(button6);
    var rows3 = document.createElement("div");
    rows3.classList.add("row");
    rows3.appendChild(button7);
    rows3.appendChild(button8);
    rows3.appendChild(button9);
    board === null || board === void 0 ? void 0 : board.appendChild(rows1);
    board === null || board === void 0 ? void 0 : board.appendChild(rows2);
    board === null || board === void 0 ? void 0 : board.appendChild(rows3);
    gameBoard = [[button1, button2, button3],
        [button4, button5, button6],
        [button7, button8, button9],];
}
function createStatus() {
    var nextStatusText = document.createElement("p");
    nextStatusText.id = "next";
    nextStatusText.innerText = "Next: " + (current === "X" ? "O" : "X");
    gameStatus === null || gameStatus === void 0 ? void 0 : gameStatus.appendChild(nextStatusText);
}
function updateStatus() {
    var nextStatusText = document.querySelector("#next");
    if (gameOver) {
        nextStatusText.innerText = "Winner: " + winner;
    }
    else {
        nextStatusText.innerText = "Next: " + (current === "X" ? "O" : "X");
    }
}
function createResetButton() {
    var button = document.createElement("button");
    button.id = "reset";
    button.innerText = "Reset";
    gameStatus === null || gameStatus === void 0 ? void 0 : gameStatus.appendChild(button);
    button.addEventListener("click", function (event) {
        while (board === null || board === void 0 ? void 0 : board.firstChild) {
            board.removeChild(board.firstChild);
        }
        while (gameStatus === null || gameStatus === void 0 ? void 0 : gameStatus.firstChild) {
            gameStatus.removeChild(gameStatus.firstChild);
        }
        init();
    });
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
