import React, { Component } from 'react'
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import SampleCard from "../materialize/exampleCard";
import AddCard from "../materialize/addCard";
import Paper from "../materialize/paper";
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit, 
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    button: {
        justifyContent: 'left'
    },
    fab_add: {
        margin: theme.spacing.unit,
        position: 'fixed',
        right: 80,
        bottom: 20
    },
    fab_proceed: {
        margin: theme.spacing.unit,
        position: 'fixed',
        right: 20,
        bottom: 20
    }, 
});

class createProject extends Component {

    constructor() {
        super();
        this.state = {
            attributes: [
                {
                    is_required: 0,
                    description: '',
                    info_separator: '',
                    max_char: '',
                    min_char: '',
                    name: '',
                    parent_id : [
                        {
                            id: '',
                            keyword: '',
                        }
                    ],
                    project_id: '',
                    type: '',
                    ordinal: 0,
                }
            ]
        } 
    }

    handleClick(e) {
        e.preventDefault();
        alert('asd');
    }
    defaultAttribute = {
        is_required: 0,
        description: '',
        info_separator: '',
        max_char: '',
        min_char: '',
        name: '',
        parent_id : [
            {
                id: '',
                keyword: '',
            }
        ],
        project_id: '',
        type: '',
        ordinal: 0,
    }

    addFormHandler = () => {
        const updatedAttributes = [
            ...this.state.attributes
        ];
        if (updatedAttributes.length > 0) {
            this.defaultAttribute.ordinal = updatedAttributes[updatedAttributes.length - 1].ordinal + 1;
        }
        updatedAttributes.push(this.defaultAttribute);
        console.log(updatedAttributes);
        this.setState({attributes: [...updatedAttributes]});
    }

    render() {
        
        const { classes } = this.props;

        const cardPanel = this.state.attributes.map((key,index) => {
            console.log(index);
            return <AddCard />
        });
        return (
        <div className="CreateProject" style={{}}>
            <br/>
            <Button style={{float:'left'}}
            >
                <Icon style={{marginRight:"5px"}}>arrow_back</Icon>  Project 1.3
            </Button>
            <br/>
            <br/>  
            {/* <Paper/> */}
            <SampleCard/>
            {/* <AddCard/> */}
            {cardPanel}
            <Fab color="primary" onClick={this.addFormHandler} aria-label="Add" className={classes.fab_add}>
                <AddIcon />
            </Fab>
            <Fab color="primary" aria-label="Add" className={classes.fab_proceed}>
                <NavigateNextIcon />
            </Fab>
        </div>
        )
  }
}

export default withStyles(styles)(createProject);
