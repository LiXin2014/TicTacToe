import React from 'react';
import { ReactElement } from 'react';
import './index.css';
import type { GameBoard, OnCellClick } from './utils';

export function Board({onClick, board}: {onClick: OnCellClick, board: GameBoard}): ReactElement {
    return (
        <div className="board">
            <div className="row">
                <button data-column="0" data-row="0" onClick={(e) => onClick(e, 0, 0)}>{board[0][0]}</button>
                <button data-column="1" data-row="0" onClick={(e) => onClick(e, 0, 1)}>{board[0][1]}</button>
                <button data-column="2" data-row="0" onClick={(e) => onClick(e, 0, 2)}>{board[0][2]}</button>
            </div>
            <div className="row">
                <button data-column="0" data-row="1" onClick={(e) => onClick(e, 1, 0)}>{board[1][0]}</button>
                <button data-column="1" data-row="1" onClick={(e) => onClick(e, 1, 1)}>{board[1][1]}</button>
                <button data-column="2" data-row="1" onClick={(e) => onClick(e, 1, 2)}>{board[1][2]}</button>
            </div>
            <div className="row">
                <button data-column="0" data-row="2" onClick={(e) => onClick(e, 2, 0)}>{board[2][0]}</button>
                <button data-column="1" data-row="2" onClick={(e) => onClick(e, 2, 1)}>{board[2][1]}</button>
                <button data-column="2" data-row="2" onClick={(e) => onClick(e, 2, 2)}>{board[2][2]}</button>
            </div>
        </div>
    )
}