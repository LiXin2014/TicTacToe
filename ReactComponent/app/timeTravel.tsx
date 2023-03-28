import React from "react";
import { OnTimeTravelClick } from "./utils";

export function TimeTravel({totalSteps, onTimeTravelClick}: {totalSteps: number, onTimeTravelClick: OnTimeTravelClick}) {
    return (
        <ul>
            {Array(totalSteps).fill(undefined).map((element, index) => (
                <li onClick={(e) => onTimeTravelClick(e, index)} key={index}>{`Go to step ${index}`}</li>
            ))}
        </ul>
    )
}