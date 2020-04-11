import React from 'react';
import LoginForm from './LoginForm';
import Layout from '../../components/Layout';

function LoginPage() {
  return (
    <Layout>
      <div className="section">
        <div className="container">
          <div className="form-wrapper">
            <p className="title has-text-centered">Login</p>
            <LoginForm/>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
