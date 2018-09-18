import { connect } from 'react-redux';
import GamePanel from './GamePanel.jsx';
import {
    startNewGameAction,
    setConfigsAction,
} from '../../reducers/gameActions';


const mapStateToProps = (state, ownProps) => {
    const gameOver = state.cardLeft === 0;
    return {
        singlePlayerMode: state.singlePlayerMode,
        timeElapsed: state.timeElapsed,
        bestScore: state.bestScore,
        currentScore: state.currentScore,
        currentPlayerIdx: state.currentPlayerIdx,
        playerScores: state.playerScores,
        difficultyLevel: state.difficultyLevel,
        gameLock: state.gameLock,
        gameOver,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onRestartGame: () => dispatch(startNewGameAction()),
    onApplyConfigs: ({...args}) => dispatch(setConfigsAction({...args})),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GamePanel);