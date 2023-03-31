import React, { useState } from "react";
import ReactDom from "react-dom/client";
import './index.css';
import { Board } from "./board.jsx";
import { TimeTravel } from "./timeTravel.jsx";

function Game() {
    const [currentMove, setCurrentMove] = useState(0);
    const [history, setHistory] = useState([new Array(9).fill("")]);
    let array = history[currentMove];
    let gameOver = false;
    let isXNext = currentMove % 2 === 0;
    const winCoordinates = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    const handleClick = (e, index) => {
        if(array[index] || checkWinner() !== "") {
            return;
        }

        const arrayCopy = array.slice();
        if(isXNext) {
            arrayCopy[index] = "X";
        } else {
            arrayCopy[index] = "O";
        }
        setHistory([...history.slice(0, currentMove+1), arrayCopy]);
        setCurrentMove((prevMove) => prevMove+1);
    }

    const checkWinner = () => {
        for (const indexes of winCoordinates) {
            if(array[indexes[0]] && array[indexes[0]] === array[indexes[1]] && array[indexes[1]] === array[indexes[2]]) {
                return array[indexes[0]];
            }
        }

        const nonEmptyItemIndex = array.findIndex(value => value === "");
        if(nonEmptyItemIndex === -1) {
            return "Tie";
        }

        return "";
    }

    const winner = checkWinner();
    let status = ""

    if(winner === "") {
        status = `Next: ${isXNext ? "X" : "O"}`;
    } else if(winner === "Tie") {
        gameOver = true;
        status = "It is a Tie!";
    } else {
        gameOver = true;
        status = `Winner: ${winner}`;
    }

    const handleReset = () => {
        setCurrentMove(0);
        setHistory([new Array(9).fill("")]);
        gameOver = false;
    }

    const handleChooseStep = (index) => {
        setCurrentMove(index);
    }

    return (
        <>
            <Board array={array} handleClick={handleClick} gameOver={gameOver}/>
            <div className="status">{status}</div>
            <button className="resetButton" onClick={handleReset}>Reset</button>
            <TimeTravel history={history} handleChooseStep={handleChooseStep}/>
        </>
    )
}

function App() {
    return <Game />
}

const rootElement = document.getElementById('app');
const root = ReactDom.createRoot(rootElement);
root.render(<App />);