import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
    display:'inline-block', 
  },
  textField: {
      width: 450
  }
});

function InputWithIcon(props) {
  const { classes } = props;

  return (
    <div>
      <div className={classes.margin} >
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <TextField onChange={props.onChange} id="input-with-icon-grid" label="Search" className={classes.textField}/>
          </Grid>
          <Grid item>
            <Search />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

InputWithIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputWithIcon);
