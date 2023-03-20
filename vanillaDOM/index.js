var board = document.querySelector(".board");
var statusText = document.querySelector(".status");
var ROW_COUNT = 3;
var COL_COUNT = 3;
var gameStatus = {
    gameBoard: [["", "", ""],
        ["", "", ""],
        ["", "", ""]],
    current: "X",
    gameOver: false,
    winner: "",
    currentStep: 0
};
var steps = [];
var movesMade = 0;
/*let gameBoard: GameBoard = [["", "", ""],
                            ["", "", ""],
                            ["", "", ""]]

let current: CurrentMove;
let movesMade: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 0;
let gameOver = false;
let winner: Winner;*/
function onClick(event, row, col) {
    var gameBoard = gameStatus.gameBoard, current = gameStatus.current, gameOver = gameStatus.gameOver, currentStep = gameStatus.currentStep;
    if (event.target) {
        var button = event.target;
        if (button.innerText !== "" || gameOver || currentStep < movesMade) {
            return;
        }
        button.innerText = current;
        movesMade++;
        gameStatus.currentStep++;
    }
    gameBoard[row][col] = current;
    gameStatus.winner = checkWinLose();
    if (gameStatus.winner !== "") {
        gameStatus.gameOver = true;
    }
    updateStatus();
    gameStatus.current = current === "X" ? "O" : "X";
    addToTimeTravel();
    steps.push(deepCopyGameStatus(gameStatus));
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
    var gameBoard = gameStatus.gameBoard;
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
    nextStatusText.innerText = "Next: " + (gameStatus.current === "X" ? "O" : "X");
    statusText === null || statusText === void 0 ? void 0 : statusText.appendChild(nextStatusText);
}
function updateStatus() {
    var current = gameStatus.current, gameOver = gameStatus.gameOver, winner = gameStatus.winner;
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
    statusText === null || statusText === void 0 ? void 0 : statusText.appendChild(button);
    button.addEventListener("click", function (event) {
        while (board === null || board === void 0 ? void 0 : board.firstChild) {
            board.removeChild(board.firstChild);
        }
        while (statusText === null || statusText === void 0 ? void 0 : statusText.firstChild) {
            statusText.removeChild(statusText.firstChild);
        }
        init();
    });
}
function createTimeTravel() {
    var lists = document.createElement("ul");
    lists.id = "timeTravel";
    var list = document.createElement("li");
    list.innerText = "Go to step 0";
    list.addEventListener("click", function (event) { return onStepClicked(event, 0); });
    lists.appendChild(list);
    statusText === null || statusText === void 0 ? void 0 : statusText.appendChild(lists);
}
function addToTimeTravel() {
    var lists = document.querySelector("#timeTravel");
    var childrenLen = lists.children.length || 0;
    var list = document.createElement("li");
    list.innerText = "Go to step " + childrenLen;
    list.addEventListener("click", function (event) { return onStepClicked(event, childrenLen); });
    lists.appendChild(list);
}
function onStepClicked(event, step) {
    console.log("step: " + step);
    var gameStatusToShow = deepCopyGameStatus(steps[step]);
    gameStatus = gameStatusToShow;
    updateStatus();
    updateBoard();
}
// update UI board based on gameStatus.board
function updateBoard() {
    var boardElement = document.querySelector(".board");
    var rowsElement = boardElement === null || boardElement === void 0 ? void 0 : boardElement.querySelectorAll(".row");
    for (var row = 0; row < ROW_COUNT; row++) {
        var rowElement = rowsElement[row];
        var buttonsElement = rowElement.querySelectorAll("button");
        for (var col = 0; col < COL_COUNT; col++) {
            var buttonElement = buttonsElement[col];
            buttonElement.innerText = gameStatus.gameBoard[row][col];
        }
    }
}
function deepCopyGameStatus(gameStatusToCopy) {
    var newGameStatus = {
        gameBoard: [["", "", ""],
            ["", "", ""],
            ["", "", ""]],
        current: gameStatusToCopy.current,
        gameOver: gameStatusToCopy.gameOver,
        winner: gameStatusToCopy.winner,
        currentStep: gameStatusToCopy.currentStep
    };
    for (var row = 0; row < ROW_COUNT; row++) {
        for (var col = 0; col < COL_COUNT; col++) {
            newGameStatus.gameBoard[row][col] = gameStatusToCopy.gameBoard[row][col];
        }
    }
    return newGameStatus;
}
function createGame() {
    createButtons();
    createStatus();
    createResetButton();
    createTimeTravel();
}
function init() {
    createGame();
    gameStatus = {
        gameBoard: [["", "", ""],
            ["", "", ""],
            ["", "", ""]],
        current: "X",
        gameOver: false,
        winner: "",
        currentStep: 0
    };
    movesMade = 0;
    steps = [];
    steps.push(deepCopyGameStatus(gameStatus));
}
init();
