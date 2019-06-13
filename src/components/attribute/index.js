import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from "@material-ui/core/Icon";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ReactDOM from 'react-dom';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteIcon from "@material-ui/icons/Delete";
import FormLabel from '@material-ui/core/FormLabel';
import Button from "@material-ui/core/Button";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginLeft: 10,
        marginRight: 10,
        width: '60%',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        // width: 250,
        maxWidth: 300,
        marginLeft: 10,
        marginRight: 10,
    },
    switchRequired: {
        position: 'inherit',
    },
    switchEditable: {
        float: 'right',
        position: 'inherit',        
    },
    deleteButton: {
        float:'left',
        marginLeft: 30
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    radioButton: {
        float:'left',
        marginLeft: 100
    },
    largeIcon: {
        float: 'left',
        marginLeft: 30
    }
})
class Attribute extends Component {

    constructor(props) {
        super();
        this.state = {
            attribute : '',
            options: [
                {
                    choice: ''
                },
                {
                    choice: ''
                }
            ]
        }; 
    }

    componentDidMount() {
        
    }

    removeOptionsHandlerLocal = (key, cardKey, event) => {
        let updateState = {...this.state}
        updateState.options.splice(key,1);
        this.setState({options: [...updateState.options]});
        this.fetchChildOptions(cardKey, [...updateState.options]);
    }

    optionsHandlerLocal = (key, cardKey, event) => {
        let updateState = {...this.state};
        console.log(key);
        console.log(event.target.value);
        console.log(cardKey);
        updateState.options[key].choice = event.target.value;
        this.setState({options: [...updateState.options]});
        this.fetchChildOptions(cardKey, [...updateState.options]);
    }

    fetchChildOptions = (cardKey, options) => {
        this.props.fetchChildOptions(cardKey, options);
    }

    handleChange = (event) => {
        this.props.handler(event);
    };

    
    removeCardHandler = (event) => {
        this.props.removeCardHandler(event);
    };

    removeHandler = (event) => {
        this.props.removeHandler(event);
    };

    addOptionsHandler = (event) => {
        this.props.addOptionsHandler(event);
        let updateState = {...this.state}
        updateState.options.push({choice : ''})
        this.setState({options: [...updateState.options]});      
    };

    generateOptions = (props, attribute) => {
        let icon, label;
        switch (attribute) {
            case 'checkbox': 
                icon = (
                    <Grid item>
                        <Icon className={props.classes.dense}>check_box_outline_blank</Icon>
                    </Grid>
                );
                label = 'Enter Checkbox Value';
                break;
            case 'multiple_choice': 
                icon = (
                    <Grid item>
                        <Icon className={props.classes.dense}>check_box_outline_blank</Icon>
                    </Grid>
                );
                label = 'Enter Multiple Choice Value';
                break;
            case 'dropdown':
                label = 'Enter Dropdown Value'; 
                break;
            default:
                
        }
        return this.props.type.options.map((val, key) => {
            return (
                <Fragment>
                    <br/>
                    <Grid container spacing={0} alignItems="flex-end">
                         {icon }
                        <Grid item xs={10}>
                        <FormControl className={props.classes.container}  >
                                <TextField
                                    id="input-with-icon-grid"
                                    label={label}
                                    onChange={this.optionsHandlerLocal.bind(this, key, props.order)}
                                    fullWidth
                                    name='choice'
                                    key={key}
                                    // InputLabelProps={{
                                    //     shrink: true,
                                    // }}
                                />
                            
                        </FormControl>
                        </Grid>
                        <Grid item>
                            <Button
                                // onClick={this.removeOptionsHandler.bind(this, key)}
                                onClick={this.removeOptionsHandlerLocal.bind(this, key, props.order)}
                                key={key}
                            >
                                <Icon>
                                    close
                                </Icon>
                            </Button>
                        </Grid>
                    </Grid>
                </Fragment>
            );
        })
    };
    

  render() { 
    const { classes, type } = this.props;
    let val = type.type;
    let attribute;
    console.log(type); 
    switch (val) {
        case 'text':
            attribute =  (
                <Grid container spacing={40} >
                    <Grid item xs={7}>
                        <TextField
                            id="data-type-sample"
                            name="dataType"
                            label="Data Type" 
                            className={classes.textField}
                            // value={this.state.name}
                            placeholder="Type your question here"
                            // onChange={this.handleChange('name')}
                            value={this.props.type.dataTypePreview}
                            onChange={this.props.handler}
                            margin="normal"
                            fullWidth
                            multiline
                            rows="3"
                            defaultValue=""
                            variant="filled"
                            disabled                            
                        />
                        <br/><br/><br/><br/>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.deleteButton}
                            onClick={this.removeCardHandler}
                        >
                            <Icon>delete</Icon>
                        </Button>
                        <FormControl component="fieldset" className={classes.switchRequired} >
                            <FormGroup aria-label="position" name="position" row>
                            
                            <FormControlLabel
                                value='switch'
                                control={<Switch color="primary" />}
                                label="Required"
                                labelPlacement="start"
                                name="is_required"
                                onChange={this.handleChange}
                                checked={this.props.type.is_required}
                            />
                            
                            </FormGroup>
                        </FormControl> 
                        <FormControl component="fieldset" className={classes.switchEditable} >
                            <FormGroup aria-label="position" name="position" row>
                            
                            <FormControlLabel
                                value="switch"
                                control={<Switch color="primary" />}
                                label="Editable"
                                labelPlacement="start"
                                name="is_editable"
                                onChange={this.handleChange}
                                checked={this.props.type.is_editable}
                            />
                            
                            </FormGroup>
                        </FormControl> 
                    </Grid>
                    <Grid item xs={5}>
                        <Grid
                            container
                            direction="column"
                            spacing={8}
                            justify="space-evenly"
                        >
                            <Grid item xs>
                                <TextField
                                    id="question"
                                    label="Response Character Limit" 
                                    className={classNames(classes.textField, classes.dense)}
                                    // value={this.state.name}
                                    placeholder="< 50 Characters only"
                                    // onChange={this.handleChange('name')}
                                    name="min_char"
                                    value={this.props.type.min_char}
                                    onChange={this.handleChange}
                                    margin="dense"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs>

                                <TextField
                                    id="question"
                                    label="Placeholder Texts" 
                                    className={classNames(classes.textField, classes.dense)}
                                    // value={this.state.name}
                                    placeholder="Input Placeholder Text"
                                    // onChange={this.handleChange('name')}
                                    onChange={this.handleChange}
                                    name="placeholder"
                                    value={this.props.type.placeholder}
                                    margin="dense"
                                    variant="outlined"
                                />
                                    
                            </Grid>
                            <Grid item xs>
                                <FormControl variant="outlined" className={classNames(classes.formControl, classes.dense)} fullWidth>
                                    <InputLabel
                                        ref={ref => {
                                            this.InputLabelRef = ref;
                                        }}
                                        htmlFor="select-dataType"
                                        Shrink
                                    >
                                        Select Data Type
                                    </InputLabel>
                                    <Select
                                        onChange={this.handleChange}
                                        value={this.props.type.dataType}
                                        input={
                                            <OutlinedInput
                                                labelWidth={this.state.labelWidth}
                                                name="dataType"
                                                id="select-dataType"
                                            />
                                        }
                                        name="dataType"
                                    >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                            <MenuItem
                                                value={'string'}
                                            >
                                                String (All Characters)
                                            </MenuItem>
                                            <MenuItem 
                                                value={'letters'}
                                            >
                                                    Letters Only
                                            </MenuItem>
                                            {/* <MenuItem value={'number'}><Icon style={{marginRight:"5px"}}>dialpad</Icon>Number</MenuItem> */}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
            break;
        case 'paragraph':
            attribute =  (
                <Grid container spacing={40} >
                    <Grid item xs={7}>
                        <TextField
                            id="data-type-sample"
                            name="dataType"
                            label="Data Type" 
                            className={classes.textField}
                            // value={this.state.name}
                            placeholder="Type your question here"
                            // onChange={this.handleChange('name')}
                            value={this.props.type.dataTypePreview}
                            onChange={this.props.handler}
                            margin="normal"
                            fullWidth
                            multiline
                            rows="3"
                            defaultValue=""
                            variant="filled"
                            disabled
                        />
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.deleteButton}
                            onClick={this.removeCardHandler}
                        >
                            <Icon>delete</Icon>
                        </Button>
                        <FormControl component="fieldset" className={classes.switchRequired} >
                            <FormGroup aria-label="position" name="position" row>
                            <FormControlLabel
                                value='switch'
                                control={<Switch color="primary" />}
                                label="Required"
                                labelPlacement="start"
                                name="is_required"
                                onChange={this.handleChange}
                                checked={this.props.type.is_required}
                            />
                            
                            </FormGroup>
                        </FormControl> 
                        <FormControl component="fieldset" className={classes.switchEditable} >
                            <FormGroup aria-label="position" name="position" row>
                            
                            <FormControlLabel
                                value="switch"
                                control={<Switch color="primary" />}
                                label="Editable"
                                labelPlacement="start"
                                name="is_editable"
                                onChange={this.handleChange}
                                checked={this.props.type.is_editable}
                            />
                            
                            </FormGroup>
                        </FormControl> 
                    </Grid>
                    <Grid item xs={5}>
                        <Grid
                            container
                            direction="column"
                            spacing={8}
                            justify="space-evenly"
                        >
                            <Grid item xs>
                                <TextField
                                    id="question"
                                    label="Response Character Limit" 
                                    className={classNames(classes.textField, classes.dense)}
                                    placeholder="< 50 Characters only"
                                    name="min_char"
                                    value={this.props.type.min_char}
                                    onChange={this.handleChange}
                                    margin="dense"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs>

                                <TextField
                                    id="question"
                                    label="Placeholder Texts" 
                                    className={classNames(classes.textField, classes.dense)}
                                    // value={this.state.name}
                                    placeholder="Input Placeholder Text"
                                    // onChange={this.handleChange('name')}
                                    name="placeholder"
                                    value={this.props.type.placeholder}
                                    onChange={this.handleChange}
                                    margin="dense"
                                    variant="outlined"
                                />
                                    
                            </Grid>
                            <Grid item xs>
                                <FormControl variant="outlined" className={classNames(classes.formControl, classes.dense)} fullWidth>
                                    <InputLabel
                                        ref={ref => {
                                            // this.InputLabelRef = ref;
                                        }}
                                        htmlFor="select-dataType"
                                    >
                                        Select Data Type
                                    </InputLabel>
                                    <Select
                                        onChange={this.handleChange}
                                        value={this.props.type.dataType}
                                        input={
                                            <OutlinedInput
                                                labelWidth={this.state.labelWidth}
                                                name="dataType"
                                                id="select-dataType"
                                            />
                                        }
                                        name="dataType"
                                    >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                            <MenuItem
                                                value={'string'}
                                            >
                                                String (All Characters)
                                            </MenuItem>
                                            <MenuItem 
                                                value={'letters'}
                                            >
                                                    Letters Only
                                            </MenuItem>
                                            {/* <MenuItem value={'number'}><Icon style={{marginRight:"5px"}}>dialpad</Icon>Number</MenuItem> */}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
            break;
        case 'number':
            attribute =  (
                <Grid container spacing={40} >
                    <Grid item xs={7}>
                        <TextField
                            id="data-type-sample"
                            name="dataType"
                            label="Data Type" 
                            className={classes.textField}
                            // value={this.state.name}
                            placeholder="Type your question here"
                            // onChange={this.handleChange('name')}
                            value={this.props.type.dataTypePreview}
                            onChange={this.props.handler}
                            margin="normal"
                            fullWidth
                            multiline
                            rows="3"
                            defaultValue=""
                            variant="filled"
                            disabled
                        />
                        <br/><br/><br/><br/>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.deleteButton}
                            onClick={this.removeCardHandler}
                        >
                            <Icon>delete</Icon>
                        </Button>
                        <FormControl component="fieldset" className={classes.switchRequired} >
                            <FormGroup aria-label="position" name="position" row>
                            <FormControlLabel
                                value='switch'
                                control={<Switch color="primary" />}
                                label="Required"
                                labelPlacement="start"
                                name="is_required"
                                onChange={this.handleChange}
                                checked={this.props.type.is_required}
                            />
                            
                            </FormGroup>
                        </FormControl> 
                        <FormControl component="fieldset" className={classes.switchEditable} >
                            <FormGroup aria-label="position" name="position" row>
                            
                            <FormControlLabel
                                value="switch"
                                control={<Switch color="primary" />}
                                label="Editable"
                                labelPlacement="start"
                                name="is_editable"
                                onChange={this.handleChange}
                                checked={this.props.type.is_editable}
                            />
                            
                            </FormGroup>
                        </FormControl> 
                    </Grid>
                    <Grid item xs={5}>
                        <Grid
                            container
                            direction="column"
                            spacing={8}
                            justify="space-evenly"
                        >
                            <Grid item xs>
                                <FormControl variant="outlined" className={classNames(classes.formControl, classes.dense)} fullWidth>
                                    <InputLabel
                                        ref={ref => {
                                            // this.InputLabelRef = ref;
                                        }}
                                        htmlFor="select-dataType"
                                    >
                                        Select Data Type
                                    </InputLabel>
                                    <Select
                                        onChange={this.handleChange}
                                        value={this.props.type.dataType}
                                        input={
                                            <OutlinedInput
                                                labelWidth={this.state.labelWidth}
                                                name="dataType"
                                                id="select-dataType"
                                            />
                                        }
                                        name="dataType"
                                    >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                            <MenuItem
                                                value={'string'}
                                            >
                                                String (All Characters)
                                            </MenuItem>
                                            <MenuItem 
                                                value={'letters'}
                                            >
                                                    Letters Only
                                            </MenuItem>
                                            {/* <MenuItem value={'number'}><Icon style={{marginRight:"5px"}}>dialpad</Icon>Number</MenuItem> */}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
            break;
        case 'checkbox':
            attribute = (
                <Grid container spacing={8} style={{marginTop:20}}>
                    <Grid item xs={7}>
                        {
                           this.generateOptions(this.props, val)
                        }
                        <br/><br/><br/><br/>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.deleteButton}
                            onClick={this.removeCardHandler}
                        >
                            <Icon>delete</Icon>
                        </Button>
                        <FormControl component="fieldset" className={classes.switchRequired} >
                            <FormGroup aria-label="position" name="position" row>
                            
                            <FormControlLabel
                                value='switch'
                                control={<Switch color="primary" />}
                                label="Required"
                                labelPlacement="start"
                                name="is_required"
                                onChange={this.handleChange}
                                checked={this.props.type.is_required}
                            />
                            
                            </FormGroup>
                        </FormControl> 
                        <FormControl component="fieldset" className={classes.switchEditable} >
                            <FormGroup aria-label="position" name="position" row>
                            
                            <FormControlLabel
                                value="switch"
                                control={<Switch color="primary" />}
                                label="Editable"
                                labelPlacement="start"
                                name="is_editable"
                                onChange={this.handleChange}
                                checked={this.props.type.is_editable}
                            />
                            
                            </FormGroup>
                        </FormControl> 
                    </Grid>
                    <Grid item xs>
                        <Button
                            variant="contained"
                            size="medium"
                            color="primary"
                            // onClick={this.addOptionsHandlerLocal}
                            onClick={this.addOptionsHandler}
                        >
                            Add more options
                        </Button>
                    </Grid>
                </Grid>
            )
            break;
        case 'multiple_choice':
            attribute = (
                <Grid container spacing={8} style={{marginTop:20}}>
                    <Grid item xs={7}>
                        {
                            this.generateOptions(this.props, val)
                        }
                        <br/><br/><br/><br/>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.deleteButton}
                            onClick={this.removeCardHandler}
                        >
                            <Icon>delete</Icon>
                        </Button>
                        <FormControl component="fieldset" className={classes.switchRequired} >
                            <FormGroup aria-label="position" name="position" row>
                            
                            <FormControlLabel
                                value='switch'
                                control={<Switch color="primary" />}
                                label="Required"
                                labelPlacement="start"
                                name="is_required"
                                onChange={this.handleChange}
                                checked={this.props.type.is_required}
                            />
                            
                            </FormGroup>
                        </FormControl> 
                        <FormControl component="fieldset" className={classes.switchEditable} >
                            <FormGroup aria-label="position" name="position" row>
                            
                            <FormControlLabel
                                value="switch"
                                control={<Switch color="primary" />}
                                label="Editable"
                                labelPlacement="start"
                                name="is_editable"
                                onChange={this.handleChange}
                                checked={this.props.type.is_editable}
                            />
                            
                            </FormGroup>
                        </FormControl> 
                    </Grid>
                    <Grid item xs>
                        <Button
                            variant="contained"
                            size="medium"
                            color="primary"
                            // onClick={this.addOptionsHandlerLocal}
                            onClick={this.addOptionsHandler}
                        >
                            Add more options
                        </Button>
                    </Grid>
                </Grid>
            )
            break;
        case 'date':
            attribute = (
                <Grid container direction="column"  spacing={8} style={{marginTop:20}}>
                    <Grid item xs>
                        <Icon fontSize="large" className={classes.largeIcon}>date_range</Icon>
                        <FormControl component="fieldset" className={classes.radioButton}>
                            <FormLabel component="legend">Select Date Format</FormLabel>
                            <RadioGroup
                                aria-label="Date Format"
                                name="data_format"
                                className={classes.group}
                                onChange={this.handleChange}
                                value={this.props.type.data_format}
                            >
                                <FormControlLabel value="MM/DD/YYYY" control={<Radio />} label="MM/DD/YYYY" />
                                <FormControlLabel value="MM/DD/YY" control={<Radio />} label="MM/DD/YY" />
                                <FormControlLabel value="DD/MM/YYYY" control={<Radio />} label="DD/MM/YYYY" />
                                <FormControlLabel value="DD/MM/YY" control={<Radio />} label="DD/MM/YY" />
                                <FormControlLabel value="YYYY/MM/DD" control={<Radio />} label="YYYY/MM/DD" />
                                <FormControlLabel value="YY/MM/DD" control={<Radio />} label="YY/MM/DD" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={7}>
                    
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.deleteButton}
                            onClick={this.removeCardHandler}
                        >
                            <Icon>delete</Icon>
                        </Button>
                        <FormControl component="fieldset" className={classes.switchRequired} >
                            <FormGroup aria-label="position" name="position" row>
                            
                            <FormControlLabel
                                value='switch'
                                control={<Switch color="primary" />}
                                label="Required"
                                labelPlacement="start"
                                name="is_required"
                                onChange={this.handleChange}
                                checked={this.props.type.is_required}
                            />
                            
                            </FormGroup>
                        </FormControl> 
                        <FormControl component="fieldset" className={classes.switchEditable} >
                            <FormGroup aria-label="position" name="position" row>
                            <FormControlLabel
                                value="switch"
                                control={<Switch color="primary" />}
                                label="Editable"
                                labelPlacement="start"
                                name="is_editable"
                                onChange={this.handleChange}
                                checked={this.props.type.is_editable}
                            />
                            </FormGroup>
                        </FormControl> 
                    </Grid>
                </Grid>
            )
            break;
        case 'time':
            attribute = (
                <Grid container direction="column"  spacing={8} style={{marginTop:20}}>
                    <Grid item xs>
                        <Icon fontSize="large" className={classes.largeIcon}>access_time</Icon>
                        <FormControl component="fieldset" className={classes.radioButton}>
                            <FormLabel component="legend">Select Time Format</FormLabel>
                            <RadioGroup
                                aria-label="Time Format"
                                name="data_format"
                                className={classes.group}
                                onChange={this.handleChange}
                                value={this.props.type.data_format}
                            >
                                <FormControlLabel value="HH:MM:SS" control={<Radio />} label="HH:MM:SS" />
                                <FormControlLabel value="HH:MM" control={<Radio />} label="HH:MM" />
                                <FormControlLabel value="24HH" control={<Radio />} label="24 HH" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={7}>
                    
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.deleteButton}
                            onClick={this.removeCardHandler}
                        >
                            <Icon>delete</Icon>
                        </Button>
                        <FormControl component="fieldset" className={classes.switchRequired} >
                            <FormGroup aria-label="position" name="position" row>
                            
                            <FormControlLabel
                                value='switch'
                                control={<Switch color="primary" />}
                                label="Required"
                                labelPlacement="start"
                                name="is_required"
                                onChange={this.handleChange}
                                checked={this.props.type.is_required}
                            />
                            
                            </FormGroup>
                        </FormControl> 
                        <FormControl component="fieldset" className={classes.switchEditable} >
                            <FormGroup aria-label="position" name="position" row>
                            <FormControlLabel
                                value="switch"
                                control={<Switch color="primary" />}
                                label="Editable"
                                labelPlacement="start"
                                name="is_editable"
                                onChange={this.handleChange}
                                checked={this.props.type.is_editable}
                            />
                            </FormGroup>
                        </FormControl> 
                    </Grid>
                </Grid>
            )
            break;
        case 'dropdown':
            attribute = (
                <Grid container spacing={8} style={{marginTop:20}}>
                    <Grid item xs={7}>
                        {
                            this.generateOptions(this.props, val)
                        }
                        <br/><br/><br/><br/>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.deleteButton}
                            onClick={this.removeCardHandler}
                        >
                            <Icon>delete</Icon>
                        </Button>
                        <FormControl component="fieldset" className={classes.switchRequired} >
                            <FormGroup aria-label="position" name="position" row>
                            
                            <FormControlLabel
                                value='switch'
                                control={<Switch color="primary" />}
                                label="Required"
                                labelPlacement="start"
                                name="is_required"
                                onChange={this.handleChange}
                                checked={this.props.type.is_required}
                            />
                            
                            </FormGroup>
                        </FormControl> 
                        <FormControl component="fieldset" className={classes.switchEditable} >
                            <FormGroup aria-label="position" name="position" row>
                            
                            <FormControlLabel
                                value="switch"
                                control={<Switch color="primary" />}
                                label="Editable"
                                labelPlacement="start"
                                name="is_editable"
                                onChange={this.handleChange}
                                checked={this.props.type.is_editable}
                            />
                            
                            </FormGroup>
                        </FormControl> 
                    </Grid>
                    <Grid item xs>
                        <Button
                            variant="contained"
                            size="medium"
                            color="primary"
                            // onClick={this.addOptionsHandlerLocal}
                            onClick={this.addOptionsHandler}
                        >
                            Add more options
                        </Button>
                    </Grid>
                </Grid>
            )
            break;
        default:
            break;
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