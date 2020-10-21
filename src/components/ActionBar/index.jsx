import React, { Component } from 'react';

import './styles.css';

export default class ActionBar extends Component {
    constructor(props) {
        super();
    }
    
    render() {
        const { addTodo } = this.props;
        return (
            <div className="ActionBarContainer">
                <div className="ActionBar">
                    <div id='blank-area'></div>
                    <textarea id='todo-input'>
                    </textarea>
                    <button 
                        onClick={()=> {
                            var todoInput = document.getElementById('todo-input');
                            var todo = todoInput.value;
                            todoInput.value = '';
                            addTodo(todo);
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
        )
    }
}
