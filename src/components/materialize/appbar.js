import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Icon from "@material-ui/core/Icon";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function ButtonAppBar(props) {
  const { classes, text} = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            >
            <MenuIcon />
            <Icon>add_circle</Icon>
            </IconButton>  
            <Typography align="right" color="inherit" className={classes.grow} style={{margin: 5}}>
                <p>{text} </p>
            </Typography>
            <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            >
            <Icon>exit_to_app</Icon>
            </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
