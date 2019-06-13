import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent'; 
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';

 
const styles = theme => ({
    card: {
        minWidth: 275, 
        // display: "inline-block",
        // justifyContent: "flex-end"
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit, 
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300

      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2,
      },
      button: {
        margin: theme.spacing.unit,
      },
  });

class TextFields extends React.Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
        labelWidth: 0,
    };

    handleChange = name => event => {
        this.setState({ name: event.target.value });
    };

    componentDidMount() {
        this.setState({
          labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
      }
    
    handleChangeSelect = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>

                <Grid container spacing={0} alignItems="center" justify="center">
                    <Grid item xs={10}>
                        <Card className={classes.card} justify="center">
                            <CardContent>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <Grid container spacing={8}>
                                        <Grid item  xs={9}>
                                            <br/>
                                            <TextField
                                                id="question"
                                                label="Question"
                                                className={classes.textField}
                                                value={this.state.name}
                                                placeholder="Name"
                                                onChange={this.handleChange('name')}
                                                margin="normal"
                                                fullWidth
                                                variant="outlined"
                                            />

                                            <TextField
                                                id="preview"
                                                label="Preview"
                                                className={classes.textField}
                                                // value={this.state.name}
                                                placeholder="Sample Short Answer Field."
                                                onChange={this.handleChange('name')}
                                                margin="normal"
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item  xs>
                                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                                <InputLabel
                                                    ref={ref => {
                                                        this.InputLabelRef = ref;
                                                    }}
                                                    htmlFor="outlined-age-simple"
                                                >
                                                    Select Response Type
                                                </InputLabel>
                                                <Select
                                                    value={this.state.age}
                                                    onChange={this.handleChangeSelect}
                                                    input={
                                                        <OutlinedInput
                                                            labelWidth={this.state.labelWidth}
                                                            name="age"
                                                            id="outlined-age-simple"
                                                        />
                                                    }
                                                >
                                                    <MenuItem value="">
                                                    <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl>
                                            
                                        </Grid>
                                    </Grid>
                                </form>

                            </CardContent>
                            <CardActions>

                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                <br/>
            </React.Fragment>
        )
    }

    
}
 
TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

  
export default withStyles(styles)(TextFields);
