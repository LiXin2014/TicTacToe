import React from "react";   // can't remove this line, why?
import ReactDom from "react-dom/client";
import { Board } from "./board";
import './index.css';
import { TimeTravel } from "./timeTravel";
import { GameBoard, WinCoordinates } from "./utils";

interface GameStep {
    next: "X" | "O";
    winner: "X" | "O" | "Tie" | "";
    board: GameBoard;
    status: string;
}

interface GameState extends GameStep {
    history: GameStep[];
    totalSteps: number;
}

const ROW_COUNT = 3;
const COL_COUNT = 3;

class App extends React.Component<{}, GameState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            next: "X",
            winner: "",
            board: [["", "", ""], ["", "", ""], ["", "", ""]],
            status: "Next: X",
            totalSteps: 0,
            history: []
        }
        this.addStateToHistory();
        this.onCellClick = this.onCellClick.bind(this);
        this.onReset = this.onReset.bind(this);
        this.deepCloneBoard = this.deepCloneBoard.bind(this);
        this.addStateToHistory = this.addStateToHistory.bind(this);
        this.onTimeTravel = this.onTimeTravel.bind(this);
    }

    render() {
        return (
            <>
                <Board onClick={this.onCellClick} board={this.state.board}/>
                <div className="status">
                    <div className="status-text">{this.state.status}</div>
                    <button className="reset" onClick={this.onReset}>Reset</button>
                    <TimeTravel totalSteps={this.state.totalSteps} onTimeTravelClick={this.onTimeTravel}/>
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
            this.setState((prevState) => ({
                status,
                winner,
                totalSteps: prevState.totalSteps + 1
            }), ()=>this.addStateToHistory());
            return;
        }

        
        this.setState((prevState) => {
            const next = this.state.next === "X" ? "O" : "X";

            return {
                next: next,
                status: `Next: ${next}`,
                totalSteps: prevState.totalSteps + 1
            }
        }, ()=>this.addStateToHistory());  //https://medium.learnreact.com/setstate-takes-a-callback-1f71ad5d2296
    }
    
    checkWinner() {
        for(let coordinate of WinCoordinates) {
            if(this.state.board[coordinate[0][0]][coordinate[0][1]] !== "" 
                && this.state.board[coordinate[0][0]][coordinate[0][1]] === this.state.board[coordinate[1][0]][coordinate[1][1]] 
                && this.state.board[coordinate[0][0]][coordinate[0][1]] === this.state.board[coordinate[2][0]][coordinate[2][1]]) {
                    return this.state.board[coordinate[0][0]][coordinate[0][1]];
            }
        }

        if(this.state.totalSteps === 8) {
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
            totalSteps: 0,
            history: []
        }, () => this.addStateToHistory());
    }

    onTimeTravel(event: React.MouseEvent, step: number) {
        console.log(`time travel on step ${step}`);
        const gotoStep = this.state.history[step];
        this.setState(
            {
                board: this.deepCloneBoard(gotoStep.board),
                next: gotoStep.next,
                winner: gotoStep.winner,
                status: gotoStep.status,
            }
        )
    }

    // NOTE: this method has to be in setState callback to guarantee it is called after state being set.
    addStateToHistory() {
        const gameStep: GameStep = {
            next: this.state.next,
            winner: this.state.winner,
            status: this.state.status,
            board: this.deepCloneBoard(this.state.board)
        }

        this.state.history.push(gameStep);
    }

    deepCloneBoard(board: GameBoard): GameBoard {
        const newBoard: GameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];

        for(let row=0; row<ROW_COUNT; row++) {
            for(let col=0; col<COL_COUNT; col++) {
                newBoard[row][col] = board[row][col];
            }
        }

        return newBoard;
    }
}

const rootElement = document.getElementById('app') as HTMLElement;
const root = ReactDom.createRoot(rootElement);
root.render(<App />);