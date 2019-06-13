import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceConnector,
  DragSourceMonitor,
} from 'react-dnd';
import { XYCoord } from 'dnd-core';
import flow from 'lodash/flow';
import AddCard from '../materialize/addCard';

const style = {
  border: '1px solid gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
//   cursor: 'move',
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    }
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = (findDOMNode(
      component,
    )).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = (clientOffset).y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
}

class Card extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired,
  }

  
  removeCard(event) {
    this.props.handler(event);
  }
  attributeHandler() {
    this.props.printVal(this.props.id);
}

handleChange = (event) => {
    this.props.handler(event);
};

addAdditionalResponse = (key, ordinal) => {
    this.props.addAdditionalResponse(key, ordinal);
} 

removeOptionsHandler = (e) => {
    this.props.removeOptionsHandler(e);
}

addOptionsHandler = (e) => {
    this.props.addOptionsHandler(e);
}
fetchChildOptions = (key) => {
    this.props.fetchChildOptions(key);
}



  render() {
    const {
      text,
      isDragging,
      connectDragSource,
      connectDropTarget,
      key,
      attribute
    } = this.props;
    console.log(this.props.attribute);
    const opacity = isDragging ? 0 : 1;

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
            <div> 
                <AddCard 
                key={key}
                cardKey={key}
                removeCardHandler={this.removeCard.bind(this,key)}
                addOptionsHandler={this.addOptionsHandler.bind(this,key)}
                handler={this.handleChange.bind(this,key)}
                removeOptionsHandler={this.removeOptionsHandler.bind(this,key)}
                attribute={this.props.attribute}
                id={this.props.key}
                fetchChildOptions={this.fetchChildOptions.bind(key)}
                addAdditionalResponse={this.props.addAdditionalResponse}
                />
            </div>
        ),
      )
    );
  }
}

export default flow(
  DragSource(
    'card',
    cardSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  ),
  DropTarget('card', cardTarget, (connect) => ({
    connectDropTarget: connect.dropTarget(),
  }))
)(Card);