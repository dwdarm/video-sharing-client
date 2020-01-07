import React from 'react';
import RegisterForm from './components/RegisterForm';

function RegisterPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="form-wrapper">
          <p className="title has-text-centered">Register</p>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
