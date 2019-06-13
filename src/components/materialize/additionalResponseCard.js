import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import {MenuItem, Icon, Button, TextField, Grid, FormControl, InputLabel, Select, OutlinedInput, Card, CardContent} from '@material-ui/core'; 

// import Attribute from '../createProject/Attribute';
import Attribute from '../Attribute2';


const styles = theme => ({
    card: {
        minWidth: 275,
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
        // width: 250,
        maxWidth: 300

    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
        width: 300
    },
    dottedCard: {
        backgroundImage: "linear-gradient(to right, #333 10%, rgba(255, 255, 255, 0) 0%)",
        backgroundPosition: "top",
        backgroundSize: "10px 1px",
        backgroundRepeat: "repeat-x",
    }
  });

  

class additionalResponseCard extends Component {
    constructor(props) {
        super();
        this.state = {
            attribute : '',
            age: '',
            multiline: 'Controlled',
            currency: 'EUR',
            labelWidth: 0,
            id: 'TRIAL',
        };
        this.attributeHandler = this.attributeHandler.bind(this);
    }
    componentDidMount() {
        this.setState({
          labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
      }
    
    attributeHandler() {
        this.props.printVal(this.props.id);
    }

    handleChange = (event) => {
        this.props.handler(event);
    };

    render() {
        const { classes } = this.props;
        const element = (
            <Attribute
              key={this.props.key}
              order={this.props.cardKey}
              type={this.props.attribute}
              addOptionsHandler={this.props.addOptionsHandler}
              removeOptionsHandler={this.props.removeOptionsHandler}
              removeCardHandler={this.props.removeCardHandler}
              handler={this.handleChange}
              fetchChildOptions={this.props.fetchChildOptions}
            />
        );
        return (
            <div>
                <Grid container spacing={0} alignItems="center" justify="center">
                    <Grid item xs={10}>
                        <Card className={classNames(classes.card, classes.dottedCard)}>
                            <CardContent>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <Grid container spacing={8}>
                                        <Grid item  xs={9}>
                                            <TextField
                                                id="question"
                                                label="Question" 
                                                className={classes.textField}
                                                value={this.props.attribute.name}
                                                placeholder="Type your question here"
                                                onChange={this.props.handler}
                                                margin="normal"
                                                name="name"
                                                fullWidth
                                            />

                                            {element}
                                        </Grid>
                                        <Grid item  xs>
                                            <br/>
                                            <br/>
                                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                                <InputLabel
                                                    ref={ref => {
                                                        this.InputLabelRef = ref;
                                                    }}
                                                    htmlFor="outlined-age-simple"
                                                    shrink
                                                >
                                                    Select Response Type
                                                </InputLabel>
                                                <Select
                                                    name="type"
                                                    value={this.props.attribute.type}
                                                    onChange={this.handleChange}
                                                    id={this.props.attribute.key}
                                                    input={
                                                        <OutlinedInput
                                                            labelWidth={this.state.labelWidth}
                                                            name="name"
                                                            id="outlined-age-simple"
                                                        />
                                                    }
                                                >
                                                    <MenuItem value="">
                                                    <em>None</em>
                                                    </MenuItem>
                                                        <MenuItem value={'text'}><Icon style={{marginRight:"5px"}}>short_text</Icon>Short Answer</MenuItem>
                                                        <MenuItem value={'paragraph'}><Icon style={{marginRight:"5px"}}>note</Icon>Paragraph</MenuItem>
                                                        <MenuItem value={'number'}><Icon style={{marginRight:"5px"}}>dialpad</Icon>Number</MenuItem>
                                                        <MenuItem value={'checkbox'}><Icon style={{marginRight:"5px"}}>check_box</Icon>Check box</MenuItem>
                                                        <MenuItem value={'multiple_choice'}><Icon style={{marginRight:"5px"}}>radio_button_checked</Icon>Multiple Choice</MenuItem>
                                                        <MenuItem value={'date'}><Icon style={{marginRight:"5px"}}>date_range</Icon>Date</MenuItem>
                                                        <MenuItem value={'time'}><Icon style={{marginRight:"5px"}}>access_time</Icon>Time</MenuItem>
                                                        <MenuItem value={'dropdown'}><Icon style={{marginRight:"5px"}}>arrow_drop_down_circle</Icon>Drop-down</MenuItem>
                                                </Select>
                                            </FormControl>
                                            {/* <Button variant="contained" className={classes.button}>
                                                Add Additional Response
                                            </Button> */}
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

additionalResponseCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(additionalResponseCard);