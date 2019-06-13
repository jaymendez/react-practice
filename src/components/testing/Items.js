import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { connect } from 'tls';

const itemSource = {
    beginDrag(props) {
        console.log('drag')
        return props.item;
    },
    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }
        return props.handleDrop(props.item.id);
    }
}

let collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}

class Items extends Component {
    render() {
        const { isDragging, connectDragSource, item, classes } = this.props
        const opacity = isDragging ? 0 : 1;
        return connectDragSource(
            <div className="item" style={{ opacity }}>
                <span>
                    {item.name}
                </span>
            </div>
        )
       /*  return (
            <div className="item">
                {this.props.item.name}
            </div>
        ) */
    }
}
 
 
export default DragSource('item', itemSource, collect)(Items)