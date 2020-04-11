import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/actions/auth';

function LoginForm(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const history = useHistory();
  const { isAuthenticated, error, loading } = props;

  useEffect(() => {
    if (isAuthenticated) { history.replace('/') }
   });

  function onLogin() {
    props.dispatch(login(username, password));
  }

  return (
    <div style={{maxWidth:'600px', margin: '0 auto'}}>

      {(error !== null) ? <div className="notification is-danger">{error}</div> : null}

      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            className="input"
            type="text"
            disabled={loading === true}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            disabled={loading === true}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button
            className={`button is-link is-fullwidth ${loading === true ? 'is-loading' : null}`}
            disabled={loading === true}
            onClick={onLogin}>
            Login
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

export default connect(mapStateToProps)(LoginForm);
