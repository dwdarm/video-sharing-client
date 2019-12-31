import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { login } from '../store/actions/auth';

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

      {
        (error !== null) ?<div className="notification is-danger">{error}</div> : null
      }

      <div className="field">
        <div className="control has-icons-left">
          <input
            className="input is-medium"
            type="text"
            placeholder="Username"
            disabled={loading === true}
            onChange={e => setUsername(e.target.value)}
          />
          <span className="icon is-medium is-left">
            <FontAwesomeIcon icon={faUser} />
          </span>
        </div>
      </div>

      <div className="field">
        <div className="control has-icons-left">
          <input
            className="input is-medium"
            type="password"
            placeholder="Password"
            disabled={loading === true}
            onChange={e => setPassword(e.target.value)}
          />
          <span className="icon is-medium is-left">
            <FontAwesomeIcon icon={faLock} />
          </span>
        </div>
      </div>

      <div className="field">
        <div className="control">
            <button
              className={`button is-link is-medium is-fullwidth ${loading === true ? 'is-loading' : null}`}
              disabled={loading === true}
              onClick={onLogin}
            >
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
