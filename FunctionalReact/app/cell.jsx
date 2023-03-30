import React from "react";

export function Cell({value, row, col, onClick}) {
    return <button data-row={row} data-col={col} onClick={onClick}>{value}</button>
}