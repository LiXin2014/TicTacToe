import React, { useState } from "react";
import ReactDom from "react-dom/client";
import './index.css';
import { Board } from "./board.jsx";

function Game() {
    const [isXNext, setIsXNext] = useState(true);
    const [array, setArray] = useState(new Array(9).fill(""));
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
        setIsXNext(!isXNext);
        setArray(arrayCopy);
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
        status = "It is a Tie!";
    } else {
        status = `Winner: ${winner}`;
    }

    const handleReset = () => {
        setIsXNext(true);
        setArray(new Array(9).fill(""));
    }

    return (
        <>
            <Board array={array} handleClick={handleClick}/>
            <div className="status">{status}</div>
            <button className="resetButton" onClick={handleReset}>Reset</button>
        </>
    )
}

function App() {
    return <Game />
}

const rootElement = document.getElementById('app');
const root = ReactDom.createRoot(rootElement);
root.render(<App />);