var board = document.querySelector(".board");
var gameStatus = document.querySelector(".status");
var ROW_COUNT = 3;
var COL_COUNT = 3;
var gameBoard = [[undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]];
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15;
    //check rows
    if (((_a = gameBoard[0][0]) === null || _a === void 0 ? void 0 : _a.innerText) === ((_b = gameBoard[0][1]) === null || _b === void 0 ? void 0 : _b.innerText) && ((_c = gameBoard[0][0]) === null || _c === void 0 ? void 0 : _c.innerText) === ((_d = gameBoard[0][2]) === null || _d === void 0 ? void 0 : _d.innerText)) {
        return (_e = gameBoard[0][0]) === null || _e === void 0 ? void 0 : _e.innerText;
    }
    if (((_f = gameBoard[1][0]) === null || _f === void 0 ? void 0 : _f.innerText) === ((_g = gameBoard[1][1]) === null || _g === void 0 ? void 0 : _g.innerText) && ((_h = gameBoard[1][0]) === null || _h === void 0 ? void 0 : _h.innerText) === ((_j = gameBoard[1][2]) === null || _j === void 0 ? void 0 : _j.innerText)) {
        return (_k = gameBoard[1][0]) === null || _k === void 0 ? void 0 : _k.innerText;
    }
    if (((_l = gameBoard[2][0]) === null || _l === void 0 ? void 0 : _l.innerText) === ((_m = gameBoard[2][1]) === null || _m === void 0 ? void 0 : _m.innerText) && ((_o = gameBoard[2][0]) === null || _o === void 0 ? void 0 : _o.innerText) === ((_p = gameBoard[2][2]) === null || _p === void 0 ? void 0 : _p.innerText)) {
        return (_q = gameBoard[2][0]) === null || _q === void 0 ? void 0 : _q.innerText;
    }
    //check columns
    if (((_r = gameBoard[0][0]) === null || _r === void 0 ? void 0 : _r.innerText) === ((_s = gameBoard[1][0]) === null || _s === void 0 ? void 0 : _s.innerText) && ((_t = gameBoard[0][0]) === null || _t === void 0 ? void 0 : _t.innerText) === ((_u = gameBoard[2][0]) === null || _u === void 0 ? void 0 : _u.innerText)) {
        return (_v = gameBoard[0][0]) === null || _v === void 0 ? void 0 : _v.innerText;
    }
    if (((_w = gameBoard[0][1]) === null || _w === void 0 ? void 0 : _w.innerText) === ((_x = gameBoard[1][1]) === null || _x === void 0 ? void 0 : _x.innerText) && ((_y = gameBoard[0][1]) === null || _y === void 0 ? void 0 : _y.innerText) === ((_z = gameBoard[2][1]) === null || _z === void 0 ? void 0 : _z.innerText)) {
        return (_0 = gameBoard[0][1]) === null || _0 === void 0 ? void 0 : _0.innerText;
    }
    if (((_1 = gameBoard[0][2]) === null || _1 === void 0 ? void 0 : _1.innerText) === ((_2 = gameBoard[1][2]) === null || _2 === void 0 ? void 0 : _2.innerText) && ((_3 = gameBoard[0][2]) === null || _3 === void 0 ? void 0 : _3.innerText) === ((_4 = gameBoard[2][2]) === null || _4 === void 0 ? void 0 : _4.innerText)) {
        return (_5 = gameBoard[0][2]) === null || _5 === void 0 ? void 0 : _5.innerText;
    }
    //check diagnols
    if (((_6 = gameBoard[0][0]) === null || _6 === void 0 ? void 0 : _6.innerText) === ((_7 = gameBoard[1][1]) === null || _7 === void 0 ? void 0 : _7.innerText) && ((_8 = gameBoard[0][0]) === null || _8 === void 0 ? void 0 : _8.innerText) === ((_9 = gameBoard[2][2]) === null || _9 === void 0 ? void 0 : _9.innerText)) {
        return (_10 = gameBoard[0][0]) === null || _10 === void 0 ? void 0 : _10.innerText;
    }
    if (((_11 = gameBoard[0][2]) === null || _11 === void 0 ? void 0 : _11.innerText) === ((_12 = gameBoard[1][1]) === null || _12 === void 0 ? void 0 : _12.innerText) && ((_13 = gameBoard[0][2]) === null || _13 === void 0 ? void 0 : _13.innerText) === ((_14 = gameBoard[2][0]) === null || _14 === void 0 ? void 0 : _14.innerText)) {
        return (_15 = gameBoard[0][2]) === null || _15 === void 0 ? void 0 : _15.innerText;
    }
    if (movesMade === 9) {
        return "Tie";
    }
}
function createButtons() {
    for (var row = 0; row < ROW_COUNT; row++) {
        var rows = document.createElement("div");
        rows.classList.add("row");
        for (var col = 0; col < COL_COUNT; col++) {
            var button = document.createElement("button");
            button.setAttribute("data-rows", row.toString());
            button.setAttribute("data-columns", col.toString());
            button.addEventListener("click", onClick);
            gameBoard[row][col] = button;
            rows.appendChild(button);
        }
        board === null || board === void 0 ? void 0 : board.appendChild(rows);
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
    current = "X";
    movesMade = 0;
    gameOver = false;
}
init();
