// assets/js/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [plainPassword, setPlainPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePlainPasswordChange = (event) => {
    setPlainPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('plainPassword', plainPassword);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try{
        const response = await axios.post('/api/register', formData, config);
        if (response.status === 200) {
            // Successful login, you can redirect or perform other actions
            console.log('Register Successfull');
            setErrorMessage('Registered Successfully, you will be redirected to login page now!');
            await new Promise(resolve => setTimeout(resolve, 3000));
            window.location.href = '/login';
          }
    }catch (error) {
        console.error('An error occurred', error);
        setErrorMessage('Probably there is another user created with this email!');
    }
    

    
      
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="error-message">{errorMessage}</div>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="_email"
        onChange={handleEmailChange}
        required
      />

      <label htmlFor="plainPassword">Password:</label>
      <input
        type="password"
        id="plainPassword"
        name="_plainPassword"
        minlength="6"
        onChange={handlePlainPasswordChange}
        required
      />

      <label htmlFor="registration-form-agreeTerms" class="required">Agree Terms</label>
      <input type='checkbox' id='registration-form-agreeTerms' name="agreeTerms" required/>
      
      <button type="submit">Register</button>
      <a href="/login">Jau turite paskyrą?</a>
    </form>
  );
};


export default RegisterForm;


