import React from 'react';
import LoginForm from './components/LoginForm';

function LoginPage() {
  return (
    <section className="section">
      <div className="container"> 
        <p className="title has-text-centered">Login</p>
        <LoginForm/>
      </div>
    </section>
  );
}

export default LoginPage;