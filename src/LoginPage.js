import React from 'react';
import LoginForm from './components/LoginForm';

function LoginPage() {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="form-wrapper">
          <p className="title has-text-centered">Login</p>
          <LoginForm/>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
