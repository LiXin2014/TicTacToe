import React from "react";   // can't remove this line, why?
import ReactDom from "react-dom/client";
import { Board } from "./board";
import './index.css';
import { TimeTravel } from "./timeTravel";
import { GameBoard, WinCoordinates } from "./utils";

interface GameState {
    board: GameBoard;
    currentStep: number;
    history: GameBoard[];
}

const ROW_COUNT = 3;
const COL_COUNT = 3;

class App extends React.Component<{}, GameState> {
    xIsNext: boolean;
    winner: "X" | "O" | "Tie" | "";
    totalSteps: number;

    constructor(props: {}) {
        super(props);
        this.state = {
            board: [["", "", ""], ["", "", ""], ["", "", ""]],
            currentStep: 0,
            history: [[["", "", ""], ["", "", ""], ["", "", ""]]]
        }

        this.xIsNext = true;
        this.winner = "";
        this.totalSteps = 0;
        this.onCellClick = this.onCellClick.bind(this);
        this.onReset = this.onReset.bind(this);
        this.deepCloneBoard = this.deepCloneBoard.bind(this);
        this.onTimeTravel = this.onTimeTravel.bind(this);
    }

    render() {
        this.xIsNext = this.state.currentStep % 2 === 0 ? true : false;
        this.totalSteps = this.state.history.length;

        this.winner = this.checkWinner();
        
        let status;
        if(this.winner === "Tie") {
            status = "It is a Tie!";
        } else if(this.winner === "") {
            status = `Next: ${this.xIsNext ? "X" : "O"}`
        } else {
            status = `Winner: ${this.winner}`;
        }

        return (
            <>
                <Board onClick={this.onCellClick} board={this.state.board}/>
                <div className="status">
                    <div className="status-text">{status}</div>
                    <button className="reset" onClick={this.onReset}>Reset</button>
                    <TimeTravel totalSteps={this.totalSteps} onTimeTravelClick={this.onTimeTravel}/>
                </div>
            </>
        )
    }

    onCellClick(event: React.MouseEvent, row: number, col: number) {
        if(this.state.board[row][col] || this.winner) {
            return;
        }
        
        const button =  event.target as HTMLElement;
        const currentMove = this.xIsNext ? "X" : "O";
        button.innerText = currentMove;
        this.state.board[row][col] = currentMove;

        this.winner = this.checkWinner();
        if(this.winner) {
            this.setState((prevState) => ({
                currentStep: prevState.currentStep + 1,
                history: [...prevState.history.slice(), this.deepCloneBoard(prevState.board)]
            }));
            return;
        }

        
        this.setState((prevState) => {
            return {
                currentStep: prevState.currentStep + 1,
                history: [...prevState.history.slice(), this.deepCloneBoard(prevState.board)]
            }
        });  //https://medium.learnreact.com/setstate-takes-a-callback-1f71ad5d2296
    }
    
    checkWinner() {
        for(let coordinate of WinCoordinates) {
            if(this.state.board[coordinate[0][0]][coordinate[0][1]] !== "" 
                && this.state.board[coordinate[0][0]][coordinate[0][1]] === this.state.board[coordinate[1][0]][coordinate[1][1]] 
                && this.state.board[coordinate[0][0]][coordinate[0][1]] === this.state.board[coordinate[2][0]][coordinate[2][1]]) {
                    return this.state.board[coordinate[0][0]][coordinate[0][1]];
            }
        }

        if(this.totalSteps === 8) {
            return "Tie";
        }

        return ""
    }

    onReset() {
        this.xIsNext = true;
        this.winner = "";
        this.totalSteps = 0;
        this.setState({
            board: [["", "", ""], ["", "", ""], ["", "", ""]],
            currentStep: 0,
            history: [[["", "", ""], ["", "", ""], ["", "", ""]]]
        });
    }

    onTimeTravel(event: React.MouseEvent, step: number) {
        console.log(`time travel on step ${step}`);
        const gotoStep = this.state.history[step];
        this.setState(
            {
                currentStep: step,
                board: this.deepCloneBoard(gotoStep),
            }
        )
        this.winner = this.checkWinner();
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