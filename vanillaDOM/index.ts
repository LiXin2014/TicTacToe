const board = document.querySelector(".board");
const gameStatus = document.querySelector(".status");
const ROW_COUNT = 3;
const COL_COUNT = 3;

type CellContent = "X" | "O" | "";

type GameBoard = [[CellContent, CellContent, CellContent],
    [CellContent, CellContent, CellContent],
    [CellContent, CellContent, CellContent]]

type CurrentMove = "X" | "O";
type Winner = "X" | "O" | "Tie" | "";

let gameBoard: GameBoard = [["", "", ""],
                            ["", "", ""],
                            ["", "", ""]]

let current: CurrentMove;
let movesMade: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 0;
let gameOver = false;
let winner: Winner;

function onClick(event: MouseEvent, row: number, col: number) {
    if (event.target) {
        const button = event.target as HTMLButtonElement;
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
    if (movesMade === 9) {
        return "Tie";
    }

    for(let victory of victories) {
        const cell1 = gameBoard[victory[0][0]][victory[0][1]];
        const cell2 = gameBoard[victory[1][0]][victory[1][1]];
        const cell3 = gameBoard[victory[2][0]][victory[2][1]];
        if(cell1 !== "" && cell1 === cell2 && cell1 === cell3) {
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
    nextStatusText.innerText = `Next: ${current === "X" ? "O" : "X"}`;
    gameStatus?.appendChild(nextStatusText);
}

function updateStatus() {
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
    gameStatus?.appendChild(button);
    button.addEventListener("click", (event) => {
        while (board?.firstChild) {
            board.removeChild(board.firstChild);
        }
        while (gameStatus?.firstChild) {
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
    gameBoard = [["", "", ""],
                 ["", "", ""],
                 ["", "", ""]]
    current = "X";
    movesMade = 0;
    gameOver = false;
}
init();