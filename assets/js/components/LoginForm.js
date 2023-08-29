// assets/js/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const formData = new FormData();
  //   formData.append('_username', username);
  //   formData.append('_password', password);

  //   try {
  //     const response = await axios.post('/login', formData);

  //     if (response.status === 200) {
  //       // Successful login, you can redirect or perform other actions
  //       console.log('Login successful');
  //     } else {
  //       // Handle login error
  //       console.error('Login failed');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred', error);
  //   }
  // };

  return (
    <div>
        <label htmlFor="username">Email:</label>
        <input type="text" id="username" name="_username"></input>

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="_password"></input>
    </div>
  );
};


export default LoginForm;


