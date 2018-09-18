import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';
import { connect } from 'react-redux';

import Board from './Board';
import GamePanel from './GamePanel';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#EFEFEF',
  },
  gameBody: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 1,
  },
  appbarIcon: {
    color: 'white'
  },
});

class App extends React.Component {
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
              <IconButton disabled disableRipple aria-label="Menu">
                <MenuIcon className={classes.appbarIcon} />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.grow}>
                Memory Game
              </Typography>
            </Toolbar>
        </AppBar>
        <div className={classes.gameBody}>
          <Board />
          <GamePanel />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect()(withRoot(withStyles(styles)(App)));