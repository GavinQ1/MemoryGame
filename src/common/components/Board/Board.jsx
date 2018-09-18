import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Card from './Card';

import {
    DIFFICULTY_LEVEL,
    EASY_LEVEL,
    MEDIUM_LEVEL,
    HARD_LEVEL,
} from '../../constants/gameConstants';

const styles = theme => ({
    boardContainer: {
        display: 'grid',
        gridGap: '10px 10px',
        width: 600,
        height: 500,
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
});

const generateGridLayout = difficultyLevel => {
    let width = 0;
    switch(difficultyLevel) {
        case DIFFICULTY_LEVEL.Easy:
            width = EASY_LEVEL.width;
            break;
        case DIFFICULTY_LEVEL.Medium:
            width = MEDIUM_LEVEL.width;
            break;
        case DIFFICULTY_LEVEL.Hard:
        default:
            width = HARD_LEVEL.width;
            break;
    }
    const template = [];
    for (let i = 0; i < width; i++) template.push('auto');
    return template.join(' ');
}

class Board extends React.Component {
    render() {
        const { classes, board, revealed, onRevealCard, difficultyLevel } = this.props;
        const gridTemplateColumns = generateGridLayout(difficultyLevel);

        return (
            <div className={classes.boardContainer} style={{ gridTemplateColumns }}>
                {board.map((c, i) => {
                    return (
                        <Card
                            key={`card-${i}`}
                            content={board[i]}
                            revealed={revealed[i]}
                            onRevealCard={() => {
                                onRevealCard(i);
                            }}
                        />
                    );
                })}
            </div>
        );
    }
}

Board.propTypes = {
    classes: PropTypes.object.isRequired,
    revealed: PropTypes.array.isRequired,
    board: PropTypes.array.isRequired,
    onRevealCard: PropTypes.func.isRequired,
    difficultyLevel: PropTypes.string.isRequired,
};

export default withStyles(styles)(Board);