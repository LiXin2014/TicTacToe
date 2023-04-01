import React from "react";

export function Cell({value, row, col, onClick, disabled}: {value: string, row: number, col: number, onClick: ()=> void, disabled: boolean}) {
    return <button data-row={row} data-col={col} onClick={onClick} disabled={disabled}>{value}</button>
}