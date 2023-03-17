import React from "react";   // can't remove this line, why?
import ReactDom from "react-dom/client";
import { Board } from "./board";
import './index.css';
import { GameBoard, WinCoordinates } from "./utils";

interface GameState {
    next: "X" | "O";
    winner: "X" | "O" | "Tie" | "";
    board: GameBoard;
    status: string;
    steps: number;
}

class App extends React.Component<{}, GameState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            next: "X",
            winner: "",
            board: [["", "", ""], ["", "", ""], ["", "", ""]],
            status: "Next: X",
            steps: 0
        }
        this.onCellClick = this.onCellClick.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    render() {
        return (
            <>
                <Board onClick={this.onCellClick} board={this.state.board}/>
                <div className="status">
                    <div className="status-text">{this.state.status}</div>
                    <button className="reset" onClick={this.onReset}>Reset</button>
                </div>
            </>
        )
    }

    onCellClick(event: React.MouseEvent, row: number, col: number) {
        if(this.state.board[row][col] || this.state.winner) {
            return;
        }
        const button =  event.target as HTMLElement
        button.innerText = this.state.next;
        this.state.board[row][col] = this.state.next;

        const winner = this.checkWinner();
        if(winner) {
            const status = winner !== "Tie" ? `Winner: ${winner}` : "It is a Tie!";
            this.setState({
                status,
                winner
            });
            return;
        }

        const next = this.state.next === "X" ? "O" : "X";
       
        this.setState((prevState) => (
            {
                next: next,
                status: `Next: ${next}`,
                steps: prevState.steps + 1
            }
        ))
    }
    
    checkWinner() {
        for(let coordinate of WinCoordinates) {
            if(this.state.board[coordinate[0][0]][coordinate[0][1]] !== "" 
                && this.state.board[coordinate[0][0]][coordinate[0][1]] === this.state.board[coordinate[1][0]][coordinate[1][1]] 
                && this.state.board[coordinate[0][0]][coordinate[0][1]] === this.state.board[coordinate[2][0]][coordinate[2][1]]) {
                    return this.state.board[coordinate[0][0]][coordinate[0][1]];
            }
        }

        if(this.state.steps === 8) {
            return "Tie";
        }

        return ""
    }

    onReset() {
        this.setState({
            next: "X",
            winner: "",
            board: [["", "", ""], ["", "", ""], ["", "", ""]],
            status: "Next: X",
            steps: 0
        })
    }
}

const rootElement = document.getElementById('app') as HTMLElement;
const root = ReactDom.createRoot(rootElement);
root.render(<App />);