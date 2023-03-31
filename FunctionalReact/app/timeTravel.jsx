import React from "react"

export function TimeTravel({history, handleChooseStep}) {
    return (
        <ul>
            {history.map((step, index)=> (
                <li key={index} onClick={() => handleChooseStep(index)}>{`Go to step ${index}`}</li>
            ))}
        </ul>
    )
}