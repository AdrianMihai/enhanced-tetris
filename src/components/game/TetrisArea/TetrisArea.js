import React, { useState, useEffect, useRef } from 'react';
import './tetrisArea.scss';
import EmptyGrid from './EmptyGrid';
import CompletedGrid from './CompletedGrid';

const createEmptyGrid = (noRows, noCols) => {
    const grid = [];

    for (let i = 0; i < noRows; i++) {
        grid.push([]);
        for (let j = 0; j < noCols; j++) {
            grid[i].push(0);
        }
    }

    return grid;
};

const generateRandomPiece = () => {
    return {
        code: 1,
        indexes: [
            [0, 6],
            [1, 3],
            [1, 4],
            [1, 5],
            [1, 6]
        ]
    };
};

const placePieceInGrid = (grid, piece) => {
    for (let idx in piece.indexes) {
        const rowIndex = piece.indexes[idx][0];
        const colIndex = piece.indexes[idx][1];
        grid[rowIndex][colIndex] = piece.code;
    }
}

const removeCurrentMovingPieceFromGrid = (grid, currentPiece) => {
    for (let idx in currentPiece.indexes) {
        let rowIndex = currentPiece.indexes[idx][0];
        let colIndex = currentPiece.indexes[idx][1];

        grid[rowIndex][colIndex] = 0;
    }
}

const hasCurrentMovingPieceReachedBottom = (grid, currentPiece) => {
    for (let idx in currentPiece.indexes) {
        const rowIndex = currentPiece.indexes[idx][0]

        if (rowIndex === (grid.length - 1)) {
            return true;
        }

        const colIndex = currentPiece.indexes[idx][1];

        if (grid[rowIndex + 1][colIndex] > 0) {
            return true;
        }
    }

    return false;
}

const transposeCurrentPiece = (grid, currentPiece) => {
    removeCurrentMovingPieceFromGrid(grid, currentPiece);

    if (hasCurrentMovingPieceReachedBottom(grid, currentPiece)) {
        placePieceInGrid(grid, currentPiece);
        return null;
    }

    for (let idx in currentPiece.indexes) {
        currentPiece.indexes[idx][0] += 1;

        let rowIndex = currentPiece.indexes[idx][0];
        let colIndex = currentPiece.indexes[idx][1];

        grid[rowIndex][colIndex] = currentPiece.code;
    }

    return currentPiece;
}

// const moveCurrentMovingPiecetoLeft = (grid, currentPiece) => {

//     removeCurrentMovingPieceFromGrid(grid, currentPiece);

//     for (let idx in currentPiece.indexes) {
//         currentPiece.indexes[idx][1] -= 1; 
//     }
//     placePieceInGrid(grid, curren)

// }

const updateGrid = (grid, movingPiece) => {
    const newGrid = grid.slice(0, grid.length);

    console.log(movingPiece);

    if (!movingPiece.current) {
        movingPiece.current = generateRandomPiece();
        placePieceInGrid(grid, movingPiece.current);
    }
    else {
        movingPiece.current = transposeCurrentPiece(grid, movingPiece.current);
    }

    return newGrid;
};

function TetrisArea(props) {
    const noRows = 20, noCols = 10;
    const [, setGameInterval] = useState(null);
    const [grid, setGrid] = useState(createEmptyGrid(noRows, noCols));

    const currentMovingPiece = useRef(null);

    useEffect(() => {
        setGameInterval((interval) => {
            clearInterval(interval);

            return setInterval(() => {
                setGrid((currentGrid) => {
                    return updateGrid(currentGrid, currentMovingPiece);
                });
            }, props.tickTime);
        });
    }, [props, props.tickTime]);

    return (
        <div id="tetris-area">
            <EmptyGrid noRows={noRows} noCols={noCols} />
            <CompletedGrid grid={grid} />
        </div>
    );
}

export default TetrisArea;