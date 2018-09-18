import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';

import {
    DIFFICULTY_LEVEL,
    EASY_LEVEL,
    MEDIUM_LEVEL,
    HARD_LEVEL,
    SUPER_EASY_LEVEL,
} from '../../constants/gameConstants';

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
    playerPanel: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '50%',  
    },
    playerLabel: {
        color: '#BDBDBD',
        fontSize: 18,
        padding: 8,
    },
    playerScoreText: {
        color: '#ffc107'
    },
    playerInCharge: {
        color: '#00B0FF',
        fontWeight: 'bold',
        border: '1px solid #80D8FF',
        borderRadius: 25,
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
    configBody: {
        width: 400,
        height: 200,
    },
    selectContainer: {
        width: 300,
        paddingBottom: 20,
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

    handleDiffcultChange = event => {
        this.setState({
            difficultyLevel: event.target.value,
        });
    }

    handleModeChange = event => {
        this.setState({
            singlePlayerMode: event.target.value,
        });
    }

    onApplyConfigs = () => {
        const { singlePlayerMode, difficultyLevel } = this.state;
        this.props.onApplyConfigs({
            singlePlayerMode,
            difficultyLevel,
        });
        this.handleSettingDialogClose();
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
                    <span className={classes.playerScoreText}>
                        { `Score: ${playerScores[0]}` }
                    </span>
                </div>
                <div className={classes.playerPanel}>
                    <div className={classnames(classes.playerLabel, {[classes.playerInCharge]: currentPlayerIdx === 1})}>
                        Player 2
                    </div>
                    <span className={classes.playerScoreText}>
                        { `Score: ${playerScores[1]}` }
                    </span>
                </div>
            </div>
        )
    }

    renderConfigDialog = () => {
        const { classes } = this.props;
        const { difficultyLevel, singlePlayerMode, settingDialogOpen } = this.state;
        const anyCongfigChange = difficultyLevel === this.props.difficultyLevel &&
                                singlePlayerMode === this.props.singlePlayerMode;

        return (
            <Dialog
              open={settingDialogOpen}
            >
              <DialogTitle >{"Configurations"}</DialogTitle>
              <DialogContent className={classes.configBody}>
                <FormControl className={classes.selectContainer}>
                  <InputLabel htmlFor="difficultyLevel-auto-width">Difficulty Level</InputLabel>
                  <Select
                    value={difficultyLevel}
                    onChange={this.handleDiffcultChange}
                    input={<Input name="difficultyLevel" id="difficultyLevel-auto-width" />}
                    autoWidth
                  >
                    <MenuItem value={DIFFICULTY_LEVEL.SuperEasy}>Super Easy</MenuItem>
                    <MenuItem value={DIFFICULTY_LEVEL.Easy}>Easy</MenuItem>
                    <MenuItem value={DIFFICULTY_LEVEL.Medium}>Medium</MenuItem>
                    <MenuItem value={DIFFICULTY_LEVEL.Hard}>Hard</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.selectContainer}>
                  <InputLabel htmlFor="mode-auto-width">Play Mode</InputLabel>
                  <Select
                    value={singlePlayerMode}
                    onChange={this.handleModeChange}
                    input={<Input name="mode" id="mode-auto-width" />}
                    autoWidth
                  >
                    <MenuItem value={true}>Single Player</MenuItem>
                    <MenuItem value={false}>Multiple Player</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleSettingDialogClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={this.onApplyConfigs} color="primary" disabled={anyCongfigChange}>
                  Apply and Play !
                </Button>
              </DialogActions>
            </Dialog>
        );
    }

    renderSummaryDialog = () => {
        const {
            classes,
            singlePlayerMode,
            timeElapsed,
            currentScore,
            playerScores,
            bestScore,
            gameOver,
            onRestartGame,
        } = this.props;

        return (
            <Dialog
              open={gameOver}
            >
              <DialogTitle >{"Summary"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {
                    singlePlayerMode ?
                    `Congratulations!
                    You used ${parseInt(timeElapsed/60)} minutes and ${timeElapsed%60} seconds to complete the game.\n
                    Your score is ${currentScore}.\n
                    The best score is ${bestScore}.
                    ` :
                    `The competition used ${parseInt(timeElapsed/60)} minutes and ${timeElapsed%60} seconds.\n\n
                    ${playerScores[0] === playerScores[1] ? 
                        'It is a tie~' :
                        (
                            playerScores[0] > playerScores[1] ?
                            'Winner is Player 1.' :
                            'Winner is Player 2.'
                        )
                    }`
                  }
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={onRestartGame} color="primary">
                  Start a New Game !
                </Button>
              </DialogActions>
            </Dialog>
        );
    }

    render() {
        const {
            classes,
            singlePlayerMode,
            timeElapsed,
            gameLock,
            onRestartGame,
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
                        <IconButton color="secondary" onClick={onRestartGame} disabled={gameLock}>
                            <ResetIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Configurations">
                        <IconButton onClick={this.handleSettingDialogOpen} disabled={gameLock}>
                            <SettingIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                {this.renderSummaryDialog()}
                {this.renderConfigDialog()}
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
    gameOver: PropTypes.bool.isRequired,
    gameLock: PropTypes.bool.isRequired,
    onRestartGame: PropTypes.func.isRequired,
    onApplyConfigs: PropTypes.func.isRequired,
};

export default withStyles(styles)(GamePanel);