import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { register } from '../store/actions/auth';

function RegisterForm(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const history = useHistory();
  const { isAuthenticated, error, loading } = props;

  useEffect(() => {
    if (isAuthenticated) { history.replace('/') }
   });

  function onRegister(event) {
    event.preventDefault();
    props.dispatch(register(username, email, password));
  }

  return (
    <div style={{maxWidth:'600px', margin: '0 auto'}}>

      {(props.error !== null) ?
        <div className="notification is-danger">{props.error}</div> : null}

      <div className="field">
        <label className="label">Username<span className="has-text-danger">*</span></label>
        <div className="control">
          <input
            className="input"
            type="text"
            disabled={props.loading === true}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Email address<span className="has-text-danger">*</span></label>
        <div className="control">
          <input
            className="input"
            type="email"
            disabled={props.loading === true}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Password<span className="has-text-danger">*</span></label>
        <div className="control">
          <input
            className="input"
            type="password"
            disabled={props.loading === true}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
            <button
              className={`button is-link is-fullwidth ${props.loading === true ? 'is-loading' : null}`}
              disabled={props.loading === true}
              onClick={onRegister}>
              Register
            </button>
        </div>
      </div>

    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    loading: state.auth.isLoading
  }
}

export default connect(mapStateToProps)(RegisterForm);
