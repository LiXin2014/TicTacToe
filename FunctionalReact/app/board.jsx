import React from "react";
import { Cell } from "./cell.jsx";

export function Board({array, handleClick, gameOver}) {
    return (
        <div className="board">
            <div className="row">
                <Cell value={array[0]} row={0} col={0} onClick={(e) => handleClick(e, 0)} disabled={gameOver}/>
                <Cell value={array[1]} row={0} col={1} onClick={(e) => handleClick(e, 1)} disabled={gameOver}/>
                <Cell value={array[2]} row={0} col={2} onClick={(e) => handleClick(e, 2)} disabled={gameOver}/>
            </div>
            <div className="row">
                <Cell value={array[3]} row={1} col={0} onClick={(e) => handleClick(e, 3)} disabled={gameOver}/>
                <Cell value={array[4]} row={1} col={1} onClick={(e) => handleClick(e, 4)} disabled={gameOver}/>
                <Cell value={array[5]} row={1} col={2} onClick={(e) => handleClick(e, 5)} disabled={gameOver}/>
            </div>
            <div className="row">
                <Cell value={array[6]} row={2} col={0} onClick={(e) => handleClick(e, 6)} disabled={gameOver}/>
                <Cell value={array[7]} row={2} col={1} onClick={(e) => handleClick(e, 7)} disabled={gameOver}/>
                <Cell value={array[8]} row={2} col={2} onClick={(e) => handleClick(e, 8)} disabled={gameOver}/>
            </div>
        </div>
    )
}
