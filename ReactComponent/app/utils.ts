export const WinCoordinates = [
    // rows
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // columns
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // diagnol
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
];

export type CellContent = "X" | "O" | "";

export type GameBoard = [[CellContent, CellContent, CellContent], 
                        [CellContent, CellContent, CellContent], 
                        [CellContent, CellContent, CellContent]];

export type OnCellClick<T = Element> = (event: React.MouseEvent<T, MouseEvent>, row: number, col: number) => void;
export type OnTimeTravelClick<T = Element> = (event: React.MouseEvent<T, MouseEvent>, step: number) => void;