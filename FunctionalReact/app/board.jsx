import React from "react";
import { Cell } from "./cell.jsx";

export function Board({array, handleClick}) {
    return (
        <div className="board">
            <div className="row">
                <Cell value={array[0]} row={0} col={0} onClick={(e) => handleClick(e, 0)}/>
                <Cell value={array[1]} row={0} col={1} onClick={(e) => handleClick(e, 1)}/>
                <Cell value={array[2]} row={0} col={2} onClick={(e) => handleClick(e, 2)}/>
            </div>
            <div className="row">
                <Cell value={array[3]} row={1} col={0} onClick={(e) => handleClick(e, 3)}/>
                <Cell value={array[4]} row={1} col={1} onClick={(e) => handleClick(e, 4)}/>
                <Cell value={array[5]} row={1} col={2} onClick={(e) => handleClick(e, 5)}/>
            </div>
            <div className="row">
                <Cell value={array[6]} row={2} col={0} onClick={(e) => handleClick(e, 6)}/>
                <Cell value={array[7]} row={2} col={1} onClick={(e) => handleClick(e, 7)}/>
                <Cell value={array[8]} row={2} col={2} onClick={(e) => handleClick(e, 8)}/>
            </div>
        </div>
    )
}
