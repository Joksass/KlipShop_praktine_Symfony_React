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
    <div class="container w-50 mt-3">
        <div class="card">
            <div class="card-body d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div class="row ">
                        <div class="col-12 h2 text-center">REGISTER</div>
                        <div class="col-12 text-center">{errorMessage}</div>
                        <div class="col-12">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="email" name="_email" placeholder="name@example.com" onChange={handleEmailChange} required/>
                                <label for="email">Email address</label>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="password" name="_password" placeholder="password" minlength="6" onChange={handlePlainPasswordChange} required/>
                                <label for="password">Password</label>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 d-flex justify-content-center">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="registration-form-agreeTerms" name="agreeTerms" required/>
                                <label class="form-check-label" for="registration-form-agreeTerms">Checked checkbox</label>
                            </div>
                        </div>
                        <div class="col-12 text-center">
                            <button type="submit" class="btn btn-dark">Register</button>
                        </div>
                        <div class="col-12 text-center">
                            <a href="/login">Login?</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};


export default RegisterForm;


