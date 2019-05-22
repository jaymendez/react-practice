import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 25,
    }
})
class Attribute extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() { 
    const { classes, type } = this.props;
    let attribute;
    console.log(type)
    // if (type === 'text') {
    //     attribute =  (<TextField
    //         id="question"
    //         label="Question" 
    //         className={classes.textField}
    //         // value={this.state.name}
    //         placeholder="Type your question here"
    //         // onChange={this.handleChange('name')}
    //         margin="normal"
    //         fullWidth
    //     />);
    // }
    switch (type) {
        case 'text':
            attribute =  (<TextField
                id="question"
                label="Question" 
                className={classes.textField}
                // value={this.state.name}
                placeholder="Type your question here"
                // onChange={this.handleChange('name')}
                margin="normal"
                fullWidth
            />);
            break;
        case 'paragraph':
            break;
        case 'number':
            break;
        case 'checkbox':
            break;
        case 'multiple_choice':
            break;
        case 'date':
            break;
        case 'time':
            break;
        case 'dropdown':
            break;
        default:
            attribute =  (
                <Grid container spacing={8} >
                    <Grid item xs={5}>
                        <TextField
                            id="question"
                            label="Question" 
                            className={classes.textField}
                            // value={this.state.name}
                            placeholder="Type your question here"
                            // onChange={this.handleChange('name')}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={5}>
                    <TextField
                        id="question"
                        label="Question" 
                        className={classes.textField}
                        // value={this.state.name}
                        placeholder="Type your question here"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        id="question"
                        label="Question" 
                        className={classes.textField}
                        // value={this.state.name}
                        placeholder="Type your question here"
                        // onChange={this.handleChange('name')}
                        margin="dense"
                        fullWidth
                        variant="outlined"
                    />
                    </Grid>
                </Grid>
            );
    }
    return (
      <div>
         {attribute} 
      </div>
    )
  }
}
Attribute.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Attribute); 