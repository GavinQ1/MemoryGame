import ActionTypes from '../constants/actionTypes';
import { DELAY_TIME_BEFORE_FLIP } from '../constants/gameConstants';

const flipCardAction = cardIdx => ({
    type: ActionTypes.Flip_Card,
    cardIdx,
});

const settleAction = cardIdx => ({
    type: ActionTypes.Settle,
    cardIdx,
});

const tickAction = () => ({
    type: ActionTypes.Tick,
});

const setTimerAction = timer => ({
    type: ActionTypes.Set_Timer,
    timer,
})

const revealCardAction = dispatch => cardIdx => {
    return dispatch((dispatch, getState) => {
        const state = getState();
        const { selectedCardIdx, gameLock, board, timer } = state;
        if (gameLock) return;

        // first time flipping a card, start timing
        if (timer == null) {
            dispatch(setTimerAction(setInterval(() => {
                dispatch(tickAction());
            }, 1000)));
        }

        // if second card, delay some time and settle
        if (selectedCardIdx !== -1) {
            dispatch(flipCardAction(cardIdx));
            // if match, dispatch settle action immediately
            if (board[selectedCardIdx] === board[cardIdx]) {
                dispatch(settleAction(cardIdx));
            } else {
            // if not match, wait for some time and then settle
                setTimeout(() => {
                    dispatch(settleAction(cardIdx));
                }, DELAY_TIME_BEFORE_FLIP);
            }
        } else {
            dispatch(flipCardAction(cardIdx));
        }
    });
};

const startNewGameAction = () => ({
    type: ActionTypes.Start_New_Game,
});

const setConfigsAction = ({difficultyLevel, singlePlayerMode}) => ({
    type: ActionTypes.Set_Configs,
    difficultyLevel,
    singlePlayerMode,
});

export {
    revealCardAction,
    startNewGameAction,
    setConfigsAction,
};
