import React, { Component } from 'react';
import ActionBar from '../ActionBar';
import Container from '../Container';


import './styles.css';

export default class Main extends Component {
    constructor(props) {
        super();
        this.state = {
            todos: [
                // { id: 1, todo: "Lavar louça", checkState: "unchecked"},
                // { id: 2, todo: "Secar louça", checkState: "unchecked"}
            ]
        };
        this.MAX_TODOS_LENGHT = 10;
        this.addTodo = this.addTodo.bind(this);
        this.getAvailableId = this.getAvailableId.bind(this);
        this.hasTodoId = this.hasTodoId.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.toggleTodo = this.toggleTodo.bind(this);
        this.getTodo = this.getTodo.bind(this);
        this.getTodoIndex = this.getTodoIndex.bind(this);
        this.reorderTodo = this.reorderTodo.bind(this);
        this.loadTodos = this.loadTodos.bind(this);
        this.saveTodos = this.saveTodos.bind(this);
    }

    componentDidMount() {
        this.loadTodos();
    }

    hasTodoId(id) {
        const { todos } = this.state;
        for (var i=0; i<todos.length; i++) {
            var todo = todos[i];
            if (todo.id===id) {
                return true;
            }
        }
        return false;
    }

    getAvailableId() {
        var id;
        for (id=0; id<this.MAX_TODOS_LENGHT; id++) {
            if (!this.hasTodoId(id)) {
                break;
            } else if (id===this.MAX_TODOS_LENGHT-1) {
                return null;
            }
        }
        return id;
    }

    addTodo(todo) {
        const { todos } = this.state;
        var id = this.getAvailableId();
        if (id===null) {
            alert('Maximum todos number achieved');
            return;
        }
        var todoObj = {
            id,
            todo,
            checkState: "unchecked"
        }
        todos.push(todoObj);
        this.saveTodos(todos);
        this.setState({ todos });
    }

    deleteTodo(id) {
        const { todos } = this.state;
        var todoIndex = this.getTodoIndex(id);
        todos.splice(todoIndex, 1);
        this.saveTodos(todos);
        this.setState({ todos });
    }

    toggleTodo(id) {
        const { todos } = this.state;
        const todo = this.getTodo(id);
        const todoIndex = this.getTodoIndex(id);
        if (todo.checkState==="checked") {
            todo.checkState = "unchecked";
        } else {
            todo.checkState = "checked";
        }
        todos[todoIndex] = todo;
        this.saveTodos(todos);
        this.setState({ todos });
    }

    getTodo(id) {
        const { todos } = this.state;
        var todo = todos.find(todo => todo.id===id);
        return todo
    }

    getTodoIndex(id) {
        const { todos } = this.state;
        var todoIndex = todos.findIndex(todo => todo.id===id);
        return todoIndex;
    }

    reorderTodo(source, destination) {
        const { todos } = this.state;
        const todo = todos[source.index]

        todos.splice(source.index, 1) // removing todo in old position
        todos.splice(destination.index, 0, todo); // pushing todo in new index
        this.saveTodos(todos);
        this.setState({ todos });
    }

    loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos'));
        this.setState({ todos });
    }

    saveTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    render() {
        return (
            <div className="Main">
                <Container 
                    id='todos-container'
                    todos={this.state.todos}
                    toggleTodo={this.toggleTodo}
                    deleteTodo={this.deleteTodo}
                    reorderTodo={this.reorderTodo}
                />
                <ActionBar 
                    id='todos-action-bar'
                    addTodo={this.addTodo}
                />
            </div>
        );
    }

}