import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelper';

//Style your components yo
import { StyleTetrisWrapper, StyleTetris } from './css/StyleTetris';

//Custom hooks
//hooks are functions that let you "hook into" a react state; 
//They typically use the "use" functions
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useStatus } from '../hooks/useStatus';

//These are the component imports
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRow, level, setLevel] = useStatus(rowsCleared);
    

    const movePlayerLR = dir => {
        
        if(!checkCollision(player, stage, {x: dir, y:0 })) {
            updatePlayerPos({ x: dir, y: 0});
        }
    }

    const startGame = () => {
        console.log("start")
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setScore(0);
        setLevel(0);
        setRow(0);
        setGameOver(false);
    }

    const drop = () => {

        if(rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 200);
        }

        if(!checkCollision(player, stage, { x:0, y: 1})) {
            updatePlayerPos({ x: 0, y: 1, collided: false});
        }
        else {
            if(player.pos.y < 1) {
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({x:0, y:0, collided:true});
        }
        
    };

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    };

    const keyUp = ({ keyCode }) => {
        if(!gameOver) {
            if(keyCode === 40) {
                setDropTime(1000 / (level + 1));
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime);

    const move = ({ keyCode }) => {
        if(!gameOver) {
            if(keyCode === 37 ) {
                movePlayerLR(-1);
            } else if (keyCode === 39){
                movePlayerLR(1);
            } else if(keyCode === 40 ) {
                dropPlayer();
            } else if (keyCode === 38) {
                playerRotate(stage, 1);
            }
        }
    }

    return (
        <StyleTetrisWrapper role = "button" tabIndex = "0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <StyleTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over" />
                    ) : (
                        <div>
                            <Display text={`Score: ${score}`} />
                            <Display text={`Cleard: ${rows}`} />
                            <Display text={`Level: ${level}`} />
                        </div>
                    )}
                    <StartButton callback = {startGame}/>
                </aside>
            </StyleTetris>
        </StyleTetrisWrapper>
    );

};

export default Tetris;
