import React, { useState } from "react";

const UserForm = ({ registerUser, loginUser, initialData }) => {
  const [formData, setFormData] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = (event) => {
    event.preventDefault();

    registerUser(formData);

    setFormData({ username: "", password: "" });
  };
  const handleLogin = (event) => {
    event.preventDefault();

    loginUser(formData);

    setFormData({ username: "", password: "" });
  };

  return (
    <div class = "center">
    <div className="user-form" class="box">
      <form>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
    </div>
  );
};

export default UserForm;
