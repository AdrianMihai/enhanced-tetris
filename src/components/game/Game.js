import React, { useState, useEffect } from 'react';
import TetrisArea from './TetrisArea/TetrisArea';
import * as style from './game.scss';

function Game() {
    const [tickTime, setTickTime] = useState(1000);
    const minTickTime = 100;

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowDown') {
                setTickTime((tickTime) => {
                    const nextTickTime = tickTime - 100;

                    if (nextTickTime < minTickTime) {
                        return minTickTime;
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
    );
}

export default Game;