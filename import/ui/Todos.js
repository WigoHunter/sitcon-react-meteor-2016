import React from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Todos } from '../api/todos.js';

export class TodoList extends React.Component {
  handleSubmit(event) {
    //prevent actual default submission
    event.preventDefault();

    //Find the input
    const text = ReactDOM.findDOMNode(this.refs.input).value;

    //Push to DB
    Todos.insert({
      text,
      createdAt: new Date(),
      done: false,
    });

    //Clear form
    ReactDOM.findDOMNode(this.refs.input).value = '';
  }

  handleDelete(id) {
    Todos.remove(id);
  }

  handleDone(id, status) {
    Todos.update(id, {
      $set: {done: !status}
    })
  }

  render() {
    return (
      <div className="list-container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h2>Todo List 2.0</h2>
          <input
            type="text"
            ref="input"
            id="input"
            placeholder="New todo?"
          />
        </form>
        <ul>
          {this.props.todos.map((todo) => (
            <Todo
              todo={todo}
              onClickDelete={this.handleDelete}
              onClickDone={this.handleDone}
            />
          ))}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
};

const Todo = ({ todo, onClickDelete, onClickDone }) => (
  <li className={todo.done ? "done" : ""}>
    <span onClick={() => onClickDelete(todo._id)}>
      ＋
    </span>
    <h3>{todo.text}</h3>
    <p>
      {todo.createdAt.getMonth() + 1} 月 {todo.createdAt.getDate()} 日
    </p>
    <div
      className="btn"
      onClick={() => onClickDone(todo._id, todo.done)}
    >
      done
    </div>
  </li>
);

const TodoListContainer = createContainer(() => {
  return {
    todos: Todos.find({}).fetch(),
  }
}, TodoList);

export default TodoListContainer;
