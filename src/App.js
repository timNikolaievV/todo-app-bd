import React, { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import TodoList from "./components/TodoList";
import moment from "moment";
import TodoEdit from "./components/TodoEdit";
import UserForm from "./components/UserForm";

function App() {
  const [token, setToken] = useState(null);
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const clockShift = 1704067200000;
  // Fetch todos on component mount
  useEffect(() => {
    if (token) {
      fetchTodos();
    }
  }, [token]);

  const handleLogout = (event) => {
    setToken(null);
  };

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:8008/todos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const data2 = [];
      data.forEach((element) => {
        element.deadline = moment(new Date(element.deadline + clockShift)).format("DD-MM-YYYY hh:mm:ss");
        data2.push(element);
      });
      console.log(data2);
      setTodos(data2);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Create a new todo
  const addTodo = async (todoData) => {
    try {
      const dt = moment(todoData.deadline, "DD-MM-YYYY hh:mm:ss").toDate();
      todoData.deadline = dt.getTime() - clockShift;
      const response = await fetch("http://localhost:8008/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(todoData),
      });

      const data = await response.json();
      data.deadline = moment(new Date(data.deadline + clockShift)).format("DD-MM-YYYY hh:mm:ss");
      setTodos([...todos, data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Update an existing todo
  const updateTodo = async (todoData) => {
    try {
      const dt = moment(todoData.deadline, "DD-MM-YYYY hh:mm:ss").toDate();
      todoData.deadline = dt.getTime() - clockShift;
      const response = await fetch(
        `http://localhost:8008/todos/${todoData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(todoData),
        }
      );
      const updatedTodo = await response.json();
      updatedTodo.deadline = moment(new Date(updatedTodo.deadline + clockShift)).format("DD-MM-YYYY hh:mm:ss");
      const updatedTodos = todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
      setSelectedTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete a todo
  const deleteTodo = async (todoId) => {
    try {
      await fetch(`http://localhost:8008/todos/${todoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await fetch("http://localhost:8008/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.status === 200) {
        alert("User registered");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const loginUser = async (userData) => {
    try {
      const response = await fetch("http://localhost:8008/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      setToken(data.access_token);
    } catch (error) {
      console.error("Error login in user:", error);
    }
  };

  return (
    <div className="todo-list-app">
      <h1>TODO Application</h1>

      {token !== null ? (
        <>
          <button className="logout-button" onClick={handleLogout}>
            {" "}
            LogOut{" "}
          </button>
          <InputForm
            addTodo={addTodo}
            updateTodo={updateTodo}
            initialData={{
              id: -1,
              title: "",
              description: "",
              deadline: moment().format("DD-MM-YYYY hh:mm:ss"),
              completed: false,
            }}
          />
          <TodoList
            todos={todos}
            editTodo={setSelectedTodo}
            deleteTodo={deleteTodo}
          />
          {selectedTodo ? (
            <div>
              <TodoEdit todo={selectedTodo} updateTodo={updateTodo} />
            </div>
          ) : null}
        </>
      ) : (
        <UserForm
          registerUser={registerUser}
          loginUser={loginUser}
          initialData={{ username: "", password: "" }}
        />
      )}
    </div>
  );
}

export default App;
