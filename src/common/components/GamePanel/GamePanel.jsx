import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

import SettingIcon from '@material-ui/icons/Settings';
import ResetIcon from '@material-ui/icons/Replay';
import classnames from 'classnames';

const styles = theme => ({
    panelContainer: {
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
        display: 'flex',
        flexDirection: 'column',
        width: 500,
        height: 400,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    singlePlayerPanelContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '80%',
        height: '100%'
    },
    scorePanel: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '50%'
    },
    scoreLabel: {
        fontWeight: 600,
        fontSize: 18,
    },
    scoreText: {
        paddingLeft: 16,
        color: '#ffc107'
    },
    multiPlayerPanelContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
        height: '100%'
    },
    playerLabel: {

    },
    playerInCharge: {

    },
    timeLabel: {
        fontSize: 24,
        width: '80%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    toolbarContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
        height: '100%',

    },
    divider: {
        width: '90%',
    },
});

const generateTimeLabel = t => {
    const min = parseInt(t / 60);
    const sec = t % 60;
    return `${min} : ${("0" + sec).slice (-2)}`;
}

class GamePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settingDialogOpen: false,
        };
    }

    handleSettingDialogOpen = () => {
        const { singlePlayerMode, difficultyLevel } = this.props;
        this.setState({
            settingDialogOpen: true,
            singlePlayerMode,
            difficultyLevel,
        });
    }

    handleSettingDialogClose = () => {
        this.setState({
            settingDialogOpen: false,
        });
    }

    renderSinglePlayerPanel = () => {
        const { bestScore, currentScore, classes } = this.props;
        return (
            <div className={classes.singlePlayerPanelContainer}>
                <div className={classes.scorePanel}>
                    <div className={classes.scoreLabel} style={{color: '#4caf50'}}>
                        Best Score:
                    </div>
                    <span className={classes.scoreText}>  
                        { isNaN(bestScore) ? 'N/A' : bestScore }
                    </span>
                </div>
                <div className={classes.scorePanel}> 
                    <div className={classes.scoreLabel} style={{color: '#35baf6'}}>
                        Score:
                    </div>
                    <span className={classes.scoreText}>  
                        { currentScore }
                    </span>
                </div>
            </div>
        );
    }


    renderMutiPlayerPanel = () => {
        const { currentPlayerIdx, playerScores, classes } = this.props;
        return (
            <div className={classes.multiPlayerPanelContainer}>
                <div className={classes.playerPanel}>
                    <div className={classnames(classes.playerLabel, {[classes.playerInCharge]: currentPlayerIdx === 0})}>
                        Player 1
                    </div>
                    <span className={classes.scoreText}>
                        { playerScores[0] }
                    </span>
                </div>
                <div className={classes.playerPanel}>
                    <div className={classnames(classes.playerLabel, {[classes.playerInCharge]: currentPlayerIdx === 1})}>
                        Player 2
                    </div>
                    <span className={classes.scoreText}>
                        { playerScores[1] }
                    </span>
                </div>
            </div>
        )
    }

    render() {
        const {
            classes,
            singlePlayerMode,
            timeElapsed,
            onRestartGame,
            onSetDifficultyLevel,
            onSetPlayMode,
        } = this.props;

        return (
            <div className={classes.panelContainer}>
                <span className={classes.timeLabel}>
                    { generateTimeLabel(timeElapsed) }
                </span>
                <Divider className={classes.divider}/>
                {singlePlayerMode ?
                    this.renderSinglePlayerPanel() :
                    this.renderMutiPlayerPanel()
                }
                <Divider className={classes.divider}/>
                <div className={classes.toolbarContainer}>
                    <Tooltip title="Start a New Game!">
                        <IconButton color="secondary" onClick={onRestartGame}>
                            <ResetIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Configurations">
                        <IconButton>
                            <SettingIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        );
    }
}

GamePanel.propTypes = {
    classes: PropTypes.object.isRequired,
    singlePlayerMode: PropTypes.bool.isRequired,
    timeElapsed: PropTypes.number.isRequired,
    bestScore: PropTypes.number.isRequired,
    currentScore: PropTypes.number.isRequired,
    currentPlayerIdx: PropTypes.number.isRequired,
    playerScores: PropTypes.array.isRequired,
    difficultyLevel: PropTypes.string.isRequired,
    onRestartGame: PropTypes.func.isRequired,
    onSetDifficultyLevel: PropTypes.func.isRequired,
    onSetPlayMode: PropTypes.func.isRequired,
};

export default withStyles(styles)(GamePanel);