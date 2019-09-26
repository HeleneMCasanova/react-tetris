import React from 'react';

import { StyleDisplay } from './css/StyleDisplay';

const Display = ({ gameOver, text }) => (
    <StyleDisplay gameOver = {gameOver}>{text}</StyleDisplay>
)

export default Display;
