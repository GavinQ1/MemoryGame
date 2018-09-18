import { createBoard } from './utils';
import {
    DIFFICULTY_LEVEL,
    EASY_LEVEL,
    MEDIUM_LEVEL,
    HARD_LEVEL,
    SCORE_MULTIPLIER,
} from '../constants/gameConstants';
import ActionTypes from '../constants/actionTypes';

const initBoard = createBoard(EASY_LEVEL);
const initState = {
    // configs
    singlePlayerMode: true,
    difficultyLevel: DIFFICULTY_LEVEL.Easy,
    gameLock: false,

    // tracking info (single mode)
    bestScore: null,
    currentScore: 0,

    // player info  (two players mode)
    currentPlayerIdx: 0,
    playerScores: [0, 0],

    // game info
    selectedCardIdx: -1,
    board: initBoard,
    revealed: initBoard.map(f => false),
};

function startNewGame(state, action) {
    const { difficultyLevel } = state;
    // init all player info
    const newState = Object.assign({}, state, {
        currentScore: 0,
        currentPlayerIdx: 0,
        playerScores: [0, 0],
        selectedCardIdx: -1,
    });

    // create board
    switch (difficultyLevel) {
        case DIFFICULTY_LEVEL.Easy:
            newState.board = createBoard(EASY_LEVEL);
            break;
        case DIFFICULTY_LEVEL.Medium:
            newState.board = createBoard(MEDIUM_LEVEL);
            break;
        case DIFFICULTY_LEVEL.Hard:
        default:
            newState.board = createBoard(HARD_LEVEL);
            break;
    }
    newState.revealed = board.map(a => false);

    return newState;
}

function flipCard(state, action) {
    const { cardIdx } = action;
    const { revealed, selectedCardIdx, gameLock } = state;
    if (gameLock) return state;
    const newState = Object.assign({}, state, {
        revealed: revealed.slice(),
    });

    // if this is the first card selected, remember it
    if (selectedCardIdx === -1) {
        newState.selectedCardIdx = cardIdx;
    } else {
        // wait for settle
        newState.gameLock = true; 
    }
    newState.revealed[cardIdx] = true;

    return newState;
}

function settle(state, action) {
    const { cardIdx } = action;
    const {
        selectedCardIdx,
        board,
        revealed,
        singlePlayerMode,
        currentPlayerIdx,
    } = state;
    const newState = Object.assign({}, state, {
        revealed: revealed.slice(),
        selectedCardIdx: -1,
        gameLock: false,
    });

    // if match
    if (board[selectedCardIdx] === board[cardIdx]) {
        const reward = 1 * SCORE_MULTIPLIER;
        if (singlePlayerMode) {
            newState.currentScore += reward;
        } else {
            newState.playerScores[currentPlayerIdx] += reward;
        }
    // if not
    } else {
        const penalty = 1;
        if (singlePlayerMode) {
            newState.currentScore -= penalty;
        } else {
            newState.playerScores[currentPlayerIdx] -= penalty;
            // change player
            newState.currentPlayerIdx = (currentPlayerIdx + 1) % 2;
        }
        newState.revealed[cardIdx] = false;
        newState.revealed[selectedCardIdx] = false;
    }

    return newState;
}

function setDifficultyLevel(state, action) {
    // will also start new game
    return startNewGame(Object.assign({}, state, {
        difficultyLevel: action.difficultyLevel,
    }));
}

function togglePlayMode(state, action) {
    return startNewGame(Object.assign({}, state, {
        singlePlayerMode: !state.singlePlayerMode,
    }));
}

export default function(state = initState, action) {
    switch (action.type) {
        case ActionTypes.Start_New_Game:
            return startNewGame(state, action);
        case ActionTypes.Flip_Card:
            return flipCard(state, action);
        case ActionTypes.Settle:
            return settle(state, action);
        case ActionTypes.Set_Difficulty_Level:
            return setDifficultyLevel(state, action);
        case ActionTypes.Toggle_Play_Mode:
            return togglePlayMode(state, action);
        default:
            return state;
    }
}
