import React, { Component } from 'react'
import Items from './Items';
import Target from './Target';
import Card from './Card';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import './App.css';
import update from 'immutability-helper'

class DragAndDrop extends Component {
    constructor() {
        super();
        this.state = {
            items: [
                {
                    id: 1,
                    name: "Item1"
                },
                {
                    id: 2,
                    name: "Item2"
                },
                {
                    id: 3,
                    name: "Item3"
                },
                {
                    id: 4,
                    name: "Item4"
                },
            ],
            cards: [
                {
                  id: 1,
                  text: 'Write a cool JS library',
                },
                {
                  id: 2,
                  text: 'Make it generic enough',
                },
                {
                  id: 3,
                  text: 'Write README',
                },
                {
                  id: 4,
                  text: 'Create some examples',
                },
                {
                  id: 5,
                  text:
                    'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
                },
                {
                  id: 6,
                  text: '???',
                },
                {
                  id: 7,
                  text: 'PROFIT',
                },
            ],
        }
        this.moveCard = this.moveCard.bind(this);
         
    }

    deleteItem = (id) => {
        console.log(id);
        this.setState(prevState => {
            let items = prevState.items;
            const index = items.findIndex(item => item.id === id);
            items.splice(index, 1);
            return { items };
        })
    }

    moveCard(dragIndex, hoverIndex) {
        const  cards  = this.state.cards;
        const dragCard = cards[dragIndex];

        this.setState(
            update(this.state, {
                cards: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
                }
            })
        )
    }

    render() {
        return (
            <div className="App-intro">
                <div className="app-container">
                    <div className="item-container">
                        {/* { 
                            this.state.items.map(val => (
                                <Items 
                                    item={val}
                                    handleDrop={(id) => this.deleteItem(id)}
                                />
                                     
                            ))
                        } */}
                    </div>
                    {/* <Target/> */}
                    <div className="card-container">
                        {
                            this.state.cards.map( (card, key) => (
                                <Card
                                    key={card.id}
                                    index={key}
                                    id={card.id}
                                    text={card.text}
                                    moveCard={this.moveCard}
                                />
                            ))
                        }
                    </div>
                </div>
            </div> 
        )
    }
}

export default DragDropContext(HTML5Backend)(DragAndDrop)