// assets/js/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    

    try {
      const response = await axios.post('/api/login', formData, config);

      if (response.status === 200) {
        // Successful login, you can redirect or perform other actions
        console.log('Login successful');
        window.location.href = '/';
      }

    } catch (error) {
      console.error('An error occurred', error);
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="error-message">{errorMessage}</div>
      <label htmlFor="username">Email:</label>
      <input
        type="text"
        id="username"
        name="_username"
        onChange={handleUsernameChange}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="_password"
        onChange={handlePasswordChange}
      />
      <button type="submit">Login</button>
      <a href="/register">Neturite paskyros?</a>
    </form>
  );
};


export default LoginForm;


