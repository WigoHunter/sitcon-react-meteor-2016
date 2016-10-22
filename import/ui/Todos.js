import React from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Todos } from '../api/todos.js';

class TodoList extends React.Component {
  constructor() {
    super();

    //delete todo from state
    this.state = {
       all: true,
       done: false,
       pending: false,
    }
  }

  addTodo(e) {
    e.preventDefault();

    const newTodo = {
      task: ReactDOM.findDOMNode(this.refs.task).value,
      done: false
    }

    Todos.insert(newTodo);

    ReactDOM.findDOMNode(this.refs.task).value = "";
  }

  toggleStatus(todo) {
    Todos.update(todo._id, {
      $set: {done: !todo.done}
    });
  }

  clickAll() {
    this.setState({
      all: true,
      done: false,
      pending: false,
    })
  }

  clickDone() {
    this.setState({
      all: false,
      done: true,
      pending: false,
    })
  }

  clickPending() {
    this.setState({
      all: false,
      done: false,
      pending: true,
    })
  }

  render() {
    return (
      <div className="list-wrap">
        <h1>Todo List</h1>

        <form className="form" onSubmit={this.addTodo.bind(this)}>
          <input type='text' ref="task" />
          <input type='submit' className="submit-btn" value="New Todo!" />
        </form>

        <div className="line"></div>

        <ul className="todos">
          {/* use props */}
          {this.props.todos.map((todo) => {
            if(this.state.all){
              return (
                <Todo todo={todo} onClick={this.toggleStatus} />
              );
            } else if(this.state.done && todo.done) {
              return (
                <Todo todo={todo} onClick={this.toggleStatus} />
              )
            } else if(this.state.pending && !todo.done) {
              return (
                <Todo todo={todo} onClick={this.toggleStatus} />
              )
            }

          })}
        </ul>

        <div className="filters">
          {/* Add onClick */}
          <FilterBtn status={this.state.all} text="All" onClick={this.clickAll.bind(this)} />
          <FilterBtn status={this.state.done} text="Done" onClick={this.clickDone.bind(this)} />
          <FilterBtn status={this.state.pending} text="Pending" onClick={this.clickPending.bind(this)} />
        </div>
      </div>
    );
  }
}

const TodoListContainer = createContainer(() => {
  return {
    todos: Todos.find().fetch(),
  }
}, TodoList);

export default TodoListContainer;

// Add toggleStatus
const Todo = ({ todo, onClick }) => (
  <li className={todo.done ? "todo-done" : "todo"}>
    <span className="status-btn" onClick={() => onClick(todo)}>＋</span>
    {todo.task}
  </li>
);

// Add onclick
const FilterBtn = ({ status, text, onClick }) => (
  <div className={status ? "filter-btn active" : "filter-btn"} onClick={onClick}>
    {text}
  </div>
);
