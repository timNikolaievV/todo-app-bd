import React, { useState } from "react";
import moment from "moment";


const InputForm = ({ addTodo, updateTodo, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      ["completed"]: event.target.checked,
    }));
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.id === -1) {
      addTodo(formData);
    } else {
      updateTodo(formData);
    }
    setFormData({
      id: -1,
      title: "",
      description: "",
      deadline: moment().format("DD-MM-YYYY hh:mm:ss"),
      completed: false,
    });
  };

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

  return (
    <div class="center">
      <div className="todo-input-form" class="box">
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Deadline:
            <input
              type="text"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
            />
          </label>
          {formData.id !== -1 && (
            <label>
              Completed:
              <Checkbox
                value={formData.completed}
                onChange={handleCheckboxChange}
              />
            </label>
          )}
          <div>
            <button className="add-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
