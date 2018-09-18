import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    cardContainer: {
        width: 45,
        height: 60,
        perspective: 240,
        '&:hover': {
            marginTop: -2.5,
        }
    },
    card: {
        width: '100%',
        height: '100%',
        transition: 'transform 1s',
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        position: 'relative',
    },
    fliped: {
        transform: 'rotateY(180deg)',
    },
    face: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        fontSize: 10,
        backfaceVisibility: 'hidden',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
    },
    faceFront: {
        transform: 'rotateY(180deg)',
        color: 'white',
        fontSize: 30,
        backgroundColor: 'orange'
    },
    faceBack: {
        backgroundColor: '#3f51b5',
        fontWeight: 'bold',
        color: 'floralwhite',
    },
});

class Card extends React.Component {
    onFlip = () => {
        if (this.props.revealed) return;
        this.props.onRevealCard();
    }

    render() {
        const { classes, revealed, content } = this.props;

        return (
            <div className={classes.cardContainer} onClick={this.onFlip}>
                <div className={classnames(classes.card, {[classes.fliped]: revealed})}>
                    <div className={classnames(classes.face, classes.faceFront)}>
                        {content}
                    </div>
                    <div className={classnames(classes.face, classes.faceBack)}>[ ⇀ ‿ ↼ ]</div>
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    classes: PropTypes.object.isRequired,
    revealed: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    onRevealCard: PropTypes.func.isRequired,
};

export default withStyles(styles)(Card);