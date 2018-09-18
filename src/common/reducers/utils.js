const CARD_CONTENT = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const SHUFFLE_TIMES = 10;

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    return arr;
}

function createBoard({ width, height }) {
    const total = width * height;
    const cardTotal = total / 2;
    if (cardTotal > CARD_CONTENT.length) throw new Error('Too many cards.');
    const alphabet = shuffle(CARD_CONTENT.slice()).slice(0, cardTotal);
    const board = [...alphabet, ...alphabet];
    for (let i = 0; i < SHUFFLE_TIMES; i++) {
        shuffle(board);
    }
    return board;
}


export { createBoard };
