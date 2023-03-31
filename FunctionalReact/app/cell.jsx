import React from "react";

export function Cell({value, row, col, onClick, disabled}) {
    return <button data-row={row} data-col={col} onClick={onClick} disabled={disabled}>{value}</button>
}