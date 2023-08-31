// assets/js/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', email);
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
    <div class="container w-50 mt-3">
        <div class="card">
            <div class="card-body d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div class="row ">
                        <div class="col-12 h2 text-center">LOGIN</div>
                        <div class="col-12 text-center">{errorMessage}</div>
                        <div class="col-12">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="email" name="_email" placeholder="name@example.com" onChange={handleEmailChange}/>
                                <label for="email">Email address</label>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="password" name="_password" placeholder="password" onChange={handlePasswordChange}/>
                                <label for="password">Password</label>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 text-center">
                            <button type="submit" class="btn btn-dark">Login</button>
                        </div>
                        <div class="col-12 text-center">
                            <a href="/register">Register?</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};


export default LoginForm;


