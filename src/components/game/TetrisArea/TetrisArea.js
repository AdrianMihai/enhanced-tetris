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

function TetrisArea(props) {
    const noRows = 20, noCols = 10;
    const [, setGameInterval] = useState(null);
    const [grid, setGrid] = useState(createEmptyGrid(noRows, noCols));

    const currentLine = useRef(0);

    useEffect(() => {
        setGameInterval((interval) => {
            clearInterval(interval);
            return setInterval(() => {

                setGrid((currentGrid) => {
                    currentLine.current += 1;
                    currentGrid[currentLine.current - 1][0] = 0;
                    currentGrid[currentLine.current][0] = 1;
                    console.log(currentGrid);
                    return currentGrid;
                });
                console.log(props.tickTime);
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