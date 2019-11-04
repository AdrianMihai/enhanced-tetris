import React from 'react';

const EmptyGrid = (props) => {
    const gridDimension = props.noRows * props.noCols;
    const emptyCells = [];

    for (let i = 0; i < gridDimension; i++) {
        emptyCells.push(
            (
                <div
                    key={`empty-cell-${i}`}
                    className="empty-cell"
                    style={{
                        width: `${100 / props.noCols}%`,
                        height: `${100 / props.noRows}%`
                    }}
                >

                </div>
            )
        );
    }

    return <React.Fragment>{emptyCells}</React.Fragment>;
}

export default EmptyGrid;