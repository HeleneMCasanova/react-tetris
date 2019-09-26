import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelper';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const rotate = (board, dir) => {
        const rotatedPiece = board.map((_, index) =>
            board.map(col => col[index]),
        );

        if(dir > 0) {
            return rotatedPiece.map(row => row.reverse());
        }

        return rotatedPiece.reverse();
    };

    const playerRotate = (stage, dir) => {
        const cloned = JSON.parse(JSON.stringify(player));
        cloned.tetromino = rotate(cloned.tetromino, dir);

        const pos = cloned.pos.x;
        let offset = 1;

        while(checkCollision(cloned, stage, { x:0, y: 0 })) {
            cloned.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1)); 

            if(offset > cloned.tetromino[0].length) {
                rotate(cloned.tetromino, -dir);
                cloned.pos.x = pos;
                return;
            }
        }
        
        setPlayer(cloned);
    }

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            //using prev to get the players previous state
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
            collided,
        }));
    };

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0},
            tetromino: randomTetromino().shape,
            collided: false,
        })
    }, []);

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}