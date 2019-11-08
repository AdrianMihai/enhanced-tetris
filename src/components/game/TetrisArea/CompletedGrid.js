import React from 'react';
import { getClassNamesForCode } from '../../../domain/tetrisPiecesCollection';

const createTetrisComponentsFromGrid = (grid) => {
    const tetrisComponents = [];

    let uniqueKey = 0;
    let brickColorClass = "";

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            uniqueKey += 1;

            if (grid[i][j] > 0) {
                brickColorClass = getClassNamesForCode(grid[i][j]);

                tetrisComponents.push((
                    <div
                        key={`tetris-piece-${uniqueKey}`}
                        className={`tetris-piece ${brickColorClass}`}
                        style={{
                            top: `calc(${i * (100 / grid.length)}% + 2px)`,
                            left: `calc(${j * (100 / grid[i].length)}% + 2px)`
                        }}
                    >

                    </div>
                ));
            }
        }
    }
    return tetrisComponents;
};

const CompletedGrid = (props) => {

    return <React.Fragment>{createTetrisComponentsFromGrid(props.grid)}</React.Fragment>
};

export default CompletedGrid;
