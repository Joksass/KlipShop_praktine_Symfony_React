/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginForm from './js/components/LoginForm.js';
import RegisterForm from './js/components/RegisterForm.js';

// const helloContainer = document.getElementById('hello-form');
// const root = createRoot(helloContainer);
// root.render(<HelloReact tab="home" />)

const loginContainer = document.getElementById('login-form');
if(loginContainer){
    const loginRoot = createRoot(loginContainer);
    loginRoot.render(<LoginForm />)
}

const registerContainer = document.getElementById('register-form');
if(registerContainer){
    const registerRoot = createRoot(registerContainer);
    registerRoot.render(<RegisterForm />)
}
