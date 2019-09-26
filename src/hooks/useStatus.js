import { useState, useEffect, useCallback } from 'react';


export const useStatus = rowsCleared => {
    const [score, setScore] = useState(0);
    const [rows, setRow] = useState(0);
    const [level, setLevel] = useState(0);

    const linePoints = [40, 100, 300, 1200];
    const calcScore = useCallback(() => {
        if (rowsCleared > 0) {
            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
            setRow(prev => prev + rowsCleared);
        }
    }, [level, linePoints, rowsCleared]);
    
    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score]);

    return [score, setScore, rows, setRow, level, setLevel];
};