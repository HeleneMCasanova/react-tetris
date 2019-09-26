export const TETROMINOS = {
    0: {
        shape: [[0]],
        color: '0, 0 , 0'
    },

    I: {
        shape:[
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0]
        ],
        color: '0, 228, 255'
    },

    O: {
        shape:[
            ['O', 'O'],
            ['O', 'O']
        ],
        color: '250, 255, 0'
    },

    S: {
        shape:[
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0]
        ],
        color: '0, 228, 255'
    },

    Z: {
        shape:[
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0]

        ],
        color: '105, 182, 37'
    },

    L: {
        shape:[
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 'L']
        ],
        color: '255, 141, 0'
    },

    J: {
        shape:[
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0]
        ],
        color: '255, 81, 188'
    },

    T: {
        shape:[
            [0, 0, 0],
            ['T', 'T', 'T'],
            [0, 'T', 0]
        ],
        color: '159, 0, 150'
    },

};

export const randomTetromino = () => {
    const tetrominos = 'IOSZLJT';
    const getRanTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
    console.log(TETROMINOS[getRanTetromino]);
    return TETROMINOS[getRanTetromino];
};