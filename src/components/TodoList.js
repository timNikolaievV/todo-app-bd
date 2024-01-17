import React from "react";

const TodoList = ({ todos, viewTodo, editTodo, deleteTodo }) => {
  return (
    <div class="center">
      <div className="todo-list" class="box">
        <h2>Todo List</h2>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span className="task">
               Task: {todo.title}
              
              </span>

              <button className="edit-button" onClick={() => editTodo(todo)}>
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
