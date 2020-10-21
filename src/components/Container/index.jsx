import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Todo from '../Todo';

import './styles.css';

export default class Container extends Component {
    constructor(props) {
        super();
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        const { source, destination } = result;
        this.props.reorderTodo(source, destination);
    }
    
    render() {
        const { todos, toggleTodo, deleteTodo } = this.props;
        return (
            <div className="Container">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId={'1'}>
                        {provided=>(
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className='todoList'
                            >
                                {todos.map((todo, index) => (
                                    <Todo
                                        key={"todo-"+todo.id}
                                        index={index}
                                        id={todo.id}
                                        todo={todo.todo}
                                        checkState={todo.checkState}
                                        toggleTodo={toggleTodo}
                                        deleteTodo={deleteTodo}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                            
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}
