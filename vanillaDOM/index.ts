const board = document.querySelector(".board");
const statusText = document.querySelector(".status");
const ROW_COUNT = 3;
const COL_COUNT = 3;

type CellContent = "X" | "O" | "";

type GameBoard = [[CellContent, CellContent, CellContent],
    [CellContent, CellContent, CellContent],
    [CellContent, CellContent, CellContent]]

type CurrentMove = "X" | "O";
type Winner = "X" | "O" | "Tie" | "";

type GameStatus = {
    gameBoard: GameBoard,
    current: CurrentMove,
    gameOver: boolean,
    winner: Winner,
    currentStep: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9   // in which step, to check if we are currently in time travel
}

let gameStatus: GameStatus = {
    gameBoard: [["", "", ""],
    ["", "", ""],
    ["", "", ""]],
    current: "X",
    gameOver: false,
    winner: "",
    currentStep: 0
}

let steps: GameStatus[] = [];
let movesMade: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 0;

/*let gameBoard: GameBoard = [["", "", ""],
                            ["", "", ""],
                            ["", "", ""]]

let current: CurrentMove;
let movesMade: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 0;
let gameOver = false;
let winner: Winner;*/


function onClick(event: MouseEvent, row: number, col: number) {
    let { gameBoard, current, gameOver, currentStep } = gameStatus;
    if (event.target) {
        const button = event.target as HTMLButtonElement;
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

type Coordinate = [number, number];
type Victory = [Coordinate, Coordinate, Coordinate];
const victories: Victory[] = [
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

function checkWinLose(): Winner {
    let { gameBoard } = gameStatus;
    if (movesMade === 9) {
        return "Tie";
    }

    for (let victory of victories) {
        const cell1 = gameBoard[victory[0][0]][victory[0][1]];
        const cell2 = gameBoard[victory[1][0]][victory[1][1]];
        const cell3 = gameBoard[victory[2][0]][victory[2][1]];
        if (cell1 !== "" && cell1 === cell2 && cell1 === cell3) {
            return cell1;
        }
    }

    return "";
}

function createButtons() {
    for (let row = 0; row < ROW_COUNT; row++) {
        const rows = document.createElement("div");
        rows.classList.add("row");

        for (let col = 0; col < COL_COUNT; col++) {
            const button = document.createElement("button");
            button.setAttribute("data-rows", row.toString());
            button.setAttribute("data-columns", col.toString());
            button.addEventListener("click", (event) => onClick(event, row, col));
            rows.appendChild(button);
        }

        board?.appendChild(rows);
    }
}

function createStatus() {
    const nextStatusText = document.createElement("p");
    nextStatusText.id = "next";
    nextStatusText.innerText = `Next: ${gameStatus.current === "X" ? "O" : "X"}`;
    statusText?.appendChild(nextStatusText);
}

function updateStatus() {
    let { current, gameOver, winner } = gameStatus;
    const nextStatusText = document.querySelector("#next") as HTMLParagraphElement;
    if (gameOver) {
        nextStatusText.innerText = `Winner: ${winner}`;
    } else {
        nextStatusText.innerText = `Next: ${current === "X" ? "O" : "X"}`;
    }
}

function createResetButton() {
    const button = document.createElement("button");
    button.id = "reset";
    button.innerText = "Reset";
    statusText?.appendChild(button);
    button.addEventListener("click", (event) => {
        while (board?.firstChild) {
            board.removeChild(board.firstChild);
        }
        while (statusText?.firstChild) {
            statusText.removeChild(statusText.firstChild);
        }
        init();
    })
}

function createTimeTravel() {
    const lists = document.createElement("ul");
    lists.id = "timeTravel";
    const list = document.createElement("li");
    list.innerText = `Go to step 0`;
    list.addEventListener("click", (event) => onStepClicked(event, 0));
    lists.appendChild(list);
    statusText?.appendChild(lists);
}

function addToTimeTravel() {
    let lists = document.querySelector("#timeTravel");
    const childrenLen = lists!.children.length || 0;
    const list = document.createElement("li");
    list.innerText = `Go to step ${childrenLen}`;
    list.addEventListener("click", (event) => onStepClicked(event, childrenLen));
    lists!.appendChild(list);
}

function onStepClicked(event: MouseEvent, step: number) {
    console.log(`step: ${step}`)
    const gameStatusToShow = deepCopyGameStatus(steps[step]);
    gameStatus = gameStatusToShow;

    updateStatus();
    updateBoard();
}

// update UI board based on gameStatus.board
function updateBoard() {
    const boardElement = document.querySelector(".board");
    const rowsElement = boardElement?.querySelectorAll(".row");
    for(let row=0; row<ROW_COUNT; row++) {
        const rowElement = rowsElement![row];
        const buttonsElement = rowElement.querySelectorAll("button");
        for(let col=0; col<COL_COUNT; col++) {
            const buttonElement = buttonsElement[col];
            buttonElement.innerText = gameStatus.gameBoard[row][col];
        }
    }
}

function deepCopyGameStatus(gameStatusToCopy: GameStatus) {
    let newGameStatus: GameStatus = {
        gameBoard: [["", "", ""],
        ["", "", ""],
        ["", "", ""]],
        current: gameStatusToCopy.current,
        gameOver: gameStatusToCopy.gameOver,
        winner: gameStatusToCopy.winner,
        currentStep: gameStatusToCopy.currentStep
    };
    
    for(let row=0; row<ROW_COUNT; row++) {
        for(let col=0; col<COL_COUNT; col++) {
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
    }
    movesMade = 0;
    steps = [];

    steps.push(deepCopyGameStatus(gameStatus));
}
init();