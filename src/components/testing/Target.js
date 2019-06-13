import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'


let collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem(),
    }
}

class Target extends Component {
    render() {
        const { connectDropTarget, hovered, item } = this.props
        const backgroundColor = hovered ? 'lightgreen' : 'white';
        return connectDropTarget (
            <div className="target" style={{background: backgroundColor}}>
                Target
            </div> 
        )
        /* return ( 
            <div className="target">
                Target
            </div> 
        ) */
    }
} 

export default DropTarget('item', {}, collect)(Target)