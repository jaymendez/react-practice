import React, { Component } from 'react'
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import SampleCard from "../materialize/exampleCard";

// import AddCard from "../materialize/addCard";
import AddCard from "../addCard";

import Paper from "../materialize/paper";
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddResponse from '../materialize/additionalResponseCard';
import Fuse from 'fuse.js';
import isEmpty from '../utils/is-empty';
import Card from '../testing/Card';

import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import update from 'immutability-helper'
import flow from 'lodash/flow';



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
    fab_save: {
        margin: theme.spacing.unit,
        position: 'fixed',
        right: 140,
        bottom: 20
    },
});

class createProject extends Component {
    constructor() {
        super();
        this.state = {
            attributes: [
                {
                    name: '',
                    ordinal: 0,
                    dataType: '',
                    type: '',
                    data_format: '',
                    dataTypePreview: '',
                    is_required: false,
                    is_editable: false,
                    min_char: '',
                    max_char: '',
                    placeholder: '',
                    parent_id: '',
                    options: [
                        {
                            choice: '',
                        },
                        {
                            choice: '',
                        }
                    ]
                },
                {
                    name: '',
                    ordinal: 0,
                    dataType: '',
                    type: '',    
                    data_format: '',
                    dataTypePreview: '',
                    is_required: false,
                    is_editable: false,
                    min_char: '',
                    max_char: '',
                    placeholder: '',
                    parent_id: '',
                    options: [
                        {
                            choice: '',
                        },
                        {
                            choice: '',
                        }
                    ]
                },
               
            ]
        }
    
        this.addFormHandler = this.addFormHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.addOptionsHandler = this.addOptionsHandler.bind(this);
        this.removeOptionsHandler = this.removeOptionsHandler.bind(this);
        this.fetchChildOptions = this.fetchChildOptions.bind(this);
    }
    
    // defaultAttribute = {
    //     // is_required: 0,
    //     // description: '',
    //     // info_separator: '',
    //     // max_char: '',
    //     // min_char: '',
    //     // name: '',
    //     // parent_id : [
    //     //     {
    //     //         id: '',
    //     //         keyword: '',
    //     //     }
    //     // ],
    //     // project_id: '',
    //     // type: '',
    //     // ordinal: 0,
    //     // dataType: '',
    //     // placeholder: '',
    //     ordinal: 0
    // }


    inc = 0;
    addFormHandler = () => {
        let defaultAttribute = {
            name: '',
            ordinal: 0,
            dataType: '',
            type: '',
            data_format: '',
            dataTypePreview: '',
            is_required: false,
            is_editable: false,
            min_char: '',
            max_char: '',
            placeholder: '',
            parent_id: '',
            options: [
                {
                    choice: '',
                },
                {
                    choice: '',
                }
            ]
        }
        let updatedAttributes;
        updatedAttributes = [...this.state.attributes];
        this.inc++;
        defaultAttribute.ordinal = this.inc; 
        updatedAttributes.push(defaultAttribute);
        this.setState({attributes: [...updatedAttributes]});
    }

    fetchChildOptions = (cardKey, options) => {
        if (options) {
            console.log(options)
            console.log(cardKey)
            let updateState = {...this.state}
            updateState.attributes[cardKey].options = options;        
            this.setState({attributes: [...updateState.attributes]});         
        }
    
    }

    addOptionsHandler = (key, event) => {
        let updateState = {...this.state}
        updateState.attributes[key].options.push({options : ''})
        this.setState({attributes: [...updateState.attributes]});        
    }

    removeOptionsHandler = (key, event) => {
        let updateState = {...this.state}
        updateState.attributes.options.splice(key,1);
        this.setState({attributes: [...updateState.attributes]});        
    }

    handleChange = (key,event) => {
        let updateState = {...this.state};
        let field = event.target.name;
        if (event.target.value === 'switch') {
            updateState.attributes[key][field] = event.target.checked;
        } else if (event.target.name === 'dataType') {
            let preview = '';
            switch (event.target.value) {
                case 'string':
                    preview = '0123456789... \nabcdefghjklmnopqrstuvwxyz \n!@#$%^&*()'
                    break;
                case 'letters':
                    preview = 'abcdefghjklmnopqrstuvwxyz'    
                    break;
                default:
            }
            updateState.attributes[key].dataTypePreview = preview;
            updateState.attributes[key][field] = event.target.value;
        } else if (event.target.name === 'choice') {
            console.log(event.target.getAttribute('key'));
            console.log(event.target.getAttribute('data-key'));
            console.log(event.target.attributes.getNamedItem('data-key').value);
            console.log(event.target.value);
        }
        else {
            updateState.attributes[key][field] = event.target.value;
        }
        this.setState({attributes: [...updateState.attributes]});
    };

    removeCard = (key, event) => {
        console.log(key);
        let updateState = {...this.state};
        updateState.attributes.splice(key,1);
        this.setState({attributes: [...updateState.attributes]});
    }

    addAdditionalResponse = (key, ordinal) => {
        var fuse = new Fuse(this.state.attributes, this.options);
        
        if (isEmpty(fuse.search(key.toString()))) {
            let defaultAttribute = {
                name: '',
                ordinal: 0,
                dataType: '',
                type: '',
                data_format: '',
                dataTypePreview: '',
                is_required: false,
                is_editable: false,
                min_char: '',
                max_char: '',
                placeholder: '',
                parent_id: '',
                options: [
                    {
                        choice: '',
                    },
                    {
                        choice: '',
                    }
                ]
            }
            let updateState = {...this.state};
            defaultAttribute.ordinal = ordinal;
            defaultAttribute.parent_id = key;
            updateState.attributes.splice(key+1, 0, defaultAttribute);
            this.setState({attributes: [...updateState.attributes]})
        }
    }

    options = {
        shouldSort: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "parent_id"
        ]
    };

    moveCard(dragIndex, hoverIndex) {
        console.log(dragIndex);
        console.log(hoverIndex);

        const attributes  = this.state.attributes;
        const dragCard = attributes[dragIndex];

        this.setState(
            update(this.state, {
                attributes: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
                }
            })
        )
    }
    
    render() {
        
        const { classes } = this.props;
        var fuse = new Fuse(this.state.attributes, this.options);
        const cardPanel = this.state.attributes.map((val, key) => {
            console.log(val);
            if (!isEmpty(fuse.search(key.toString()))) {
                return (
                    <React.Fragment>
                        {/* <Card 
                        key={key}
                        cardKey={key}
                        removeCardHandler={this.removeCard.bind(this, key)}
                        addOptionsHandler={this.addOptionsHandler.bind(this,key)}
                        handler={this.handleChange.bind(this, key)}
                        removeOptionsHandler={this.removeOptionsHandler.bind(this,key)}
                        attribute={val}
                        id={key}
                        fetchChildOptions={this.fetchChildOptions.bind(key)}
                        addAdditionalResponse={this.addAdditionalResponse}
                        moveCard={this.moveCard}
                        /> */}
                        <AddCard
                            key={key}
                            cardKey={key}
                            removeCardHandler={this.removeCard.bind(this, key)}
                            addOptionsHandler={this.addOptionsHandler.bind(this,key)}
                            handler={this.handleChange.bind(this, key)}
                            removeOptionsHandler={this.removeOptionsHandler.bind(this,key)}
                            attribute={val}
                            id={key}
                            fetchChildOptions={this.fetchChildOptions.bind(key)}
                            addAdditionalResponse={this.addAdditionalResponse}
                        />
                    </React.Fragment>
                );
            }
            if (val.parent_id === "") {
                return (
                    <React.Fragment>
                        {/* <Card 
                        key={key}
                        cardKey={key}
                        removeCardHandler={this.removeCard.bind(this, key)}
                        addOptionsHandler={this.addOptionsHandler.bind(this,key)}
                        handler={this.handleChange.bind(this, key)}
                        removeOptionsHandler={this.removeOptionsHandler.bind(this,key)}
                        attribute={val}
                        id={key}
                        fetchChildOptions={this.fetchChildOptions.bind(key)}
                        addAdditionalResponse={this.addAdditionalResponse}
                        moveCard={this.moveCard}
                        /> */}
                        <AddCard
                            key={key}
                            cardKey={key}
                            removeCardHandler={this.removeCard.bind(this, key)}
                            addOptionsHandler={this.addOptionsHandler.bind(this,key)}
                            handler={this.handleChange.bind(this, key)}
                            removeOptionsHandler={this.removeOptionsHandler.bind(this,key)}
                            attribute={val}
                            id={key}
                            fetchChildOptions={this.fetchChildOptions.bind(key)}
                            addAdditionalResponse={this.addAdditionalResponse}
                        />
                        <br/>
                    </React.Fragment>
                );
            } else if (typeof val.parent_id === 'number') {
                //Additional response
                return (
                    <React.Fragment>
                        <AddResponse 
                            key={key}
                            cardKey={key}
                            removeCardHandler={this.removeCard.bind(this, key)}
                            addOptionsHandler={this.addOptionsHandler.bind(this,key)}
                            handler={this.handleChange.bind(this, key)}
                            removeOptionsHandler={this.removeOptionsHandler.bind(this,key)}
                            attribute={val}
                            id={key}
                            fetchChildOptions={this.fetchChildOptions.bind(key)}
                        />
                        <br/>
                    </React.Fragment>
                );
            } else if (typeof val.parent_id === 'object') {
                //Merge
                return(
                    <React.Fragment>
                        <AddCard
                                key={key}
                                cardKey={key}
                                removeCardHandler={this.removeCard.bind(this, key)}
                                addOptionsHandler={this.addOptionsHandler.bind(this,key)}
                                handler={this.handleChange.bind(this, key)}
                                removeOptionsHandler={this.removeOptionsHandler.bind(this,key)}
                                attribute={val}
                                id={key}
                                fetchChildOptions={this.fetchChildOptions.bind(key)}
                                addAdditionalResponse={this.addAdditionalResponse}
                            />
                    </React.Fragment>
                )
            } else {
                return(
                    <React.Fragment>
                        <AddCard
                                key={key}
                                cardKey={key}
                                removeCardHandler={this.removeCard.bind(this, key)}
                                addOptionsHandler={this.addOptionsHandler.bind(this,key)}
                                handler={this.handleChange.bind(this, key)}
                                removeOptionsHandler={this.removeOptionsHandler.bind(this,key)}
                                attribute={val}
                                id={key}
                                fetchChildOptions={this.fetchChildOptions.bind(key)}
                                addAdditionalResponse={this.addAdditionalResponse}
                            />
                    </React.Fragment>
                )
            }
        });
        return (
        <div className="CreateProject" style={{}}>
            <br/>
            <Button style={{float:'left'}}
            >
                <Icon style={{marginRight:"5px"}}>arrow_back</Icon>Project 1.3
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
            <Fab color="primary" onClick={this.addFormHandler} aria-label="Add" className={classes.fab_save}>
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
// export default DragDropContext(HTML5Backend)(createProject)


/* export default flow(
    DragDropContext(HTML5Backend),
    withStyles(styles)
  )(Card); */