import React, { useState, useEffect } from 'react';
import TetrisArea from './TetrisArea/TetrisArea';
import * as style from './game.scss';

console.log(style);

function Game() {
    const [tickTime, setTickTime] = useState(1000);

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowDown') {
                setTickTime((tickTime) => {
                    const nextTickTime = tickTime - 100;

                    if (nextTickTime < 200) {
                        return 200;
                    }

                    return nextTickTime;
                });
            }
        });

        document.addEventListener('keyup', (event) => {
            if (event.code === 'ArrowDown') {
                setTickTime(1000);
            }
        });
    }, []);

    return (
        <div id="game-container">
            <h1>Ticktime: {tickTime}</h1>
            <TetrisArea tickTime={tickTime} />
        </div>
    )
}

export default Game;