import { connect } from 'react-redux';
import Board from './Board.jsx';
import { revealCardAction } from '../../reducers/gameActions';

const mapStateToProps = (state, ownProps) => {
    return {
        board: state.board,
        revealed: state.revealed,
        difficultyLevel: state.difficultyLevel,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onRevealCard: idx => revealCardAction(dispatch)(idx),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Board);