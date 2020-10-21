import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CheckBox from '../CheckBox';

import './styles.css';

export default class Todo extends Component {
    constructor(props) {
        super();
        const { id, todo, checkState } = props;
        this.state = {
            id,
            todo,
            checkState
        }
    }
    
    render() {
        const { id, todo, checkState } = this.state;
        const { index, deleteTodo, toggleTodo } = this.props;
        return (
            <Draggable draggableId={"todo-"+id} index={index}> 
            {(provided) => (
                <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="Todo"
                >
                    <CheckBox 
                        checkState={checkState} 
                        customClickEvent={() => toggleTodo(id)}
                    />
                    <div id='todo-text'>
                        <h1>{todo}</h1>
                    </div>
                    <button
                        id='delete-button'
                        onClick={() => deleteTodo(id)}
                    >
                        X
                    </button>
                </div>
            )}



            </Draggable>
        )
    }
}
