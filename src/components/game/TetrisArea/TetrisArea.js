import React, { useState, useEffect, useRef } from 'react';
import './tetrisArea.scss';
import EmptyGrid from './EmptyGrid';
import CompletedGrid from './CompletedGrid';
import { pickRandomPiece, addAlternateFadeEffect, removeAlternateFadeEffect } from '../../../domain/tetrisPiecesCollection';

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
    return pickRandomPiece();
};

const getPiecePivotPosition = (piece) => {
    let maxRowIndex = -1;
    let minRowIndex = 20;
    let maxColIndex = -1;
    let minColIndex = 10;

    for (let idx in piece.indexes) {
        const currentBrick = piece.indexes[idx];

        if (currentBrick[0] > maxRowIndex)
            maxRowIndex = currentBrick[0];

        if (currentBrick[0] < minRowIndex) {
            minRowIndex = currentBrick[0];
        }

        if (currentBrick[1] < minColIndex) {
            minColIndex = currentBrick[1];
        }

        if (currentBrick[1] > maxColIndex) {
            maxColIndex = currentBrick[1];
        }
    }

    return [
        minRowIndex + Math.round((maxRowIndex - minRowIndex) / 2),
        minColIndex + Math.round((maxColIndex - minColIndex) / 2)
    ];
}

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
        const rowIndex = currentPiece.indexes[idx][0];

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
        removeAlternateFadeEffect(currentPiece);
        placePieceInGrid(grid, currentPiece);
        return null;
    }

    currentPiece.indexes.forEach((idx) => idx[0] += 1);

    if (hasCurrentMovingPieceReachedBottom(grid, currentPiece)) {
        addAlternateFadeEffect(currentPiece);
    }

    placePieceInGrid(grid, currentPiece);

    return currentPiece;
}

const canCurrentPieceMoveToLeft = (grid, currentPiece) => {

    for (let idx in currentPiece.indexes) {
        const rowIndex = currentPiece.indexes[idx][0];
        const colIndex = currentPiece.indexes[idx][1];

        if (grid[rowIndex][colIndex - 1] > 0 || colIndex === 0) {
            return false;
        }
    }

    return true;
}

const moveCurrentMovingPiecetoLeft = (grid, piece) => {
    const currentPiece = piece.current;

    if (currentPiece) {
        removeCurrentMovingPieceFromGrid(grid, currentPiece);
        const newGrid = grid.slice(0, grid.length);

        if (canCurrentPieceMoveToLeft(grid, currentPiece)) {

            for (let idx in currentPiece.indexes) {
                currentPiece.indexes[idx][1] -= 1;
            }
        }
        piece.current = currentPiece;
        placePieceInGrid(newGrid, currentPiece);
        return newGrid;

    }

    return grid;
}

const canCurrentPieceMoveToRight = (grid, currentPiece) => {

    for (let idx in currentPiece.indexes) {
        const rowIndex = currentPiece.indexes[idx][0];
        const colIndex = currentPiece.indexes[idx][1];

        if (grid[rowIndex][colIndex + 1] > 0 || colIndex === (grid[0].length - 1)) {
            return false;
        }
    }

    return true;
}

const moveCurrentMovingPiecetoRight = (grid, piece) => {
    const currentPiece = piece.current;

    if (currentPiece) {
        removeCurrentMovingPieceFromGrid(grid, currentPiece);
        const newGrid = grid.slice(0, grid.length);

        if (canCurrentPieceMoveToRight(grid, currentPiece)) {

            for (let idx in currentPiece.indexes) {
                currentPiece.indexes[idx][1] += 1;
            }
        }
        piece.current = currentPiece;
        placePieceInGrid(newGrid, currentPiece);
        return newGrid;

    }

    return grid;
}
const isIndexOutOfGrid = (grid, rowIndex, colIndex) => {

    return rowIndex < 0 || rowIndex >= grid.length || colIndex < 0 || colIndex >= grid[0].length;
}

const canPieceRotate = (grid, rotatedPieceIndices) => {
    for (let idx in rotatedPieceIndices) {
        const rowIndex = rotatedPieceIndices[idx][0];
        const colIndex = rotatedPieceIndices[idx][1];

        if (isIndexOutOfGrid(grid, rowIndex, colIndex)) {
            return false;
        }

        if (grid[rowIndex][colIndex] > 0) {
            return false;
        }
    }

    return true;
}

const rotatePiece = (grid, piece) => {
    const currentPiece = piece.current;

    if (currentPiece) {
        const pivotPoint = getPiecePivotPosition(currentPiece);

        const newGrid = grid.slice(0, grid.length);
        removeCurrentMovingPieceFromGrid(newGrid, currentPiece);

        const rotatedPiece = [];

        for (let idx in currentPiece.indexes) {
            rotatedPiece.push([]);
            rotatedPiece[rotatedPiece.length - 1][0] = pivotPoint[0] + pivotPoint[1] - currentPiece.indexes[idx][1];
            rotatedPiece[rotatedPiece.length - 1][1] = pivotPoint[1] - pivotPoint[0] + currentPiece.indexes[idx][0];
        }

        if (canPieceRotate(newGrid, rotatedPiece) === true) {
            currentPiece.indexes = rotatedPiece;

            if (hasCurrentMovingPieceReachedBottom(grid, currentPiece)) {
                addAlternateFadeEffect(currentPiece);
            }
            else {
                removeAlternateFadeEffect(currentPiece);
            }

            piece.current = currentPiece;
            placePieceInGrid(newGrid, currentPiece);
            return newGrid;
        }

    }

    return grid;
};

const clearCompletedLines = (grid) => {
    let noClearedLines = 0;

    for (let i = 0; i < grid.length; i++) {
        if (grid[i].indexOf(0) === -1) {
            grid[i] = grid[i].map(() => 0);
            noClearedLines += 1;
        }
    }

    return noClearedLines;
}

const transposeGridDown = (grid, movingPiece) => {
    const newGrid = grid.slice(0, grid.length);

    if (!movingPiece.current) {
        if (clearCompletedLines(newGrid) > 0) {
            return transposeGridDown(newGrid, movingPiece);
        }
        movingPiece.current = generateRandomPiece();
        placePieceInGrid(newGrid, movingPiece.current);

    }
    else {
        movingPiece.current = transposeCurrentPiece(newGrid, movingPiece.current);

        if (!movingPiece.current) {
            return transposeGridDown(newGrid, movingPiece);
        }
    }

    return newGrid;
};

function TetrisArea(props) {
    const noRows = 20, noCols = 10;
    const [, setGameInterval] = useState(null);
    const [grid, setGrid] = useState(createEmptyGrid(noRows, noCols));

    const currentMovingPiece = useRef(null);

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            setGrid((currentGrid) => {
                let nextGrid = currentGrid;
                if (event.key === 'ArrowLeft') {
                    nextGrid = moveCurrentMovingPiecetoLeft(currentGrid, currentMovingPiece);
                }
                else if (event.key === 'ArrowRight') {
                    nextGrid = moveCurrentMovingPiecetoRight(currentGrid, currentMovingPiece);
                }

                return nextGrid;
            })
        });

        document.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowUp') {
                setGrid((currentGrid) => rotatePiece(currentGrid, currentMovingPiece));
            }
        })
    }, []);

    useEffect(() => {
        setGrid((currentGrid) => {
            return transposeGridDown(currentGrid, currentMovingPiece);
        });

        setGameInterval((interval) => {
            clearInterval(interval);

            return setInterval(() => {
                setGrid((currentGrid) => {
                    return transposeGridDown(currentGrid, currentMovingPiece);
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