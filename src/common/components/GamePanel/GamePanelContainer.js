import { connect } from 'react-redux';
import GamePanel from './GamePanel.jsx';
import {
    startNewGameAction,
    setDifficultyLevelAction,
    togglePlayModeAction,
} from '../../reducers/gameActions';


const mapStateToProps = (state, ownProps) => {
    return {
        singlePlayerMode: state.singlePlayerMode,
        timeElapsed: state.timeElapsed,
        bestScore: state.bestScore,
        currentScore: state.currentScore,
        currentPlayerIdx: state.currentPlayerIdx,
        playerScores: state.playerScores,
        difficultyLevel: state.difficultyLevel,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onRestartGame: () => dispatch(startNewGameAction()),
    onSetDifficultyLevel: d => dispatch(setDifficultyLevelAction(d)),
    onSetPlayMode: () => dispatch(togglePlayModeAction()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GamePanel);