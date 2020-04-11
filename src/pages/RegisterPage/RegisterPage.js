import React from 'react';
import RegisterForm from './RegisterForm';
import Layout from '../../components/Layout';

function RegisterPage() {
  return (
    <Layout>
      <div className="wrapper">
        <div className="container">
          <div className="form-wrapper">
            <p className="title has-text-centered">Register</p>
            <RegisterForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RegisterPage;
