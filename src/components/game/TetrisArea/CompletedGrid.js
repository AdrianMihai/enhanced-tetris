import React from 'react';

const CompletedGrid = (props) => {
    const grid = props.grid;
    const tetrisComponents = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] > 0) {
                tetrisComponents.push((
                    <div
                        key={`tetris-piece-${i}`}
                        className="tetris-piece"
                        style={{
                            left: `${j * (100 / grid[i].length)}%`,
                            top: `${i * (100 / grid.length)}%)`
                        }}
                    >

                    </div>
                ));
            }
        }
    }

    return <React.Fragment>{tetrisComponents}</React.Fragment>
};

export default CompletedGrid;
