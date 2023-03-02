var board = document.querySelector(".board");
var gameStatus = document.querySelector(".status");
var ROW_COUNT = 3;
var COL_COUNT = 3;
var gameBoard = [["", "", ""],
    ["", "", ""],
    ["", "", ""]];
var current;
var movesMade = 0;
var gameOver = false;
var winner;
function onClick(event, row, col) {
    if (event.target) {
        var button = event.target;
        if (button.innerText !== "" || gameOver) {
            return;
        }
        button.innerText = current;
        movesMade++;
    }
    gameBoard[row][col] = current;
    winner = checkWinLose();
    if (winner !== "") {
        gameOver = true;
    }
    updateStatus();
    current = current === "X" ? "O" : "X";
}
var victories = [
    [
        [0, 0],
        [0, 1],
        [0, 2],
    ],
    [
        [1, 0],
        [1, 1],
        [1, 2],
    ],
    [
        [2, 0],
        [2, 1],
        [2, 2],
    ],
    [
        [0, 0],
        [1, 0],
        [2, 0],
    ],
    [
        [0, 1],
        [1, 1],
        [2, 1],
    ],
    [
        [0, 2],
        [1, 2],
        [2, 2],
    ],
    [
        [0, 0],
        [1, 1],
        [2, 2],
    ],
    [
        [0, 2],
        [1, 1],
        [2, 0],
    ],
];
function checkWinLose() {
    if (movesMade === 9) {
        return "Tie";
    }
    for (var _i = 0, victories_1 = victories; _i < victories_1.length; _i++) {
        var victory = victories_1[_i];
        var cell1 = gameBoard[victory[0][0]][victory[0][1]];
        var cell2 = gameBoard[victory[1][0]][victory[1][1]];
        var cell3 = gameBoard[victory[2][0]][victory[2][1]];
        if (cell1 !== "" && cell1 === cell2 && cell1 === cell3) {
            return cell1;
        }
    }
    return "";
}
function createButtons() {
    var _loop_1 = function (row) {
        var rows = document.createElement("div");
        rows.classList.add("row");
        var _loop_2 = function (col) {
            var button = document.createElement("button");
            button.setAttribute("data-rows", row.toString());
            button.setAttribute("data-columns", col.toString());
            button.addEventListener("click", function (event) { return onClick(event, row, col); });
            rows.appendChild(button);
        };
        for (var col = 0; col < COL_COUNT; col++) {
            _loop_2(col);
        }
        board === null || board === void 0 ? void 0 : board.appendChild(rows);
    };
    for (var row = 0; row < ROW_COUNT; row++) {
        _loop_1(row);
    }
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
    gameBoard = [["", "", ""],
        ["", "", ""],
        ["", "", ""]];
    current = "X";
    movesMade = 0;
    gameOver = false;
}
init();
