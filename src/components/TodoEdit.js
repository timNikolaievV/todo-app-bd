import React from 'react';
import InputForm from './InputForm';

const TodoEdit = ({ todo, updateTodo }) => {
  console.log(todo)
  return (
    <div>
      <h2>Edit TODO</h2>
      <InputForm initialData={todo} updateTodo={updateTodo} />
    </div>
  );
};

export default TodoEdit;