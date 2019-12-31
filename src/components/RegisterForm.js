import React, { useState }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { register } from '../store/actions/auth';

export default function LoginForm(props) {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');

  function onRegister(event) {
    event.preventDefault();
    props.dispatch(register(username, email, password));
  }

  return (
    <div style={{maxWidth:'600px', margin: '0 auto'}}>

      {
        (props.error !== null) ?
          <div className="notification is-danger">
            {props.error}
          </div> : null
      }

      <div className="field">
        <div className="control has-icons-left">
          <input
            className="input is-medium"
            type="text"
            placeholder="Username"
            disabled={props.loading === true}
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
            type="email"
            placeholder="E-mail"
            disabled={props.loading === true}
            onChange={e => setEmail(e.target.value)}
          />
          <span className="icon is-medium is-left">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        </div>
      </div>

      <div className="field">
        <div className="control has-icons-left">
          <input
            className="input is-medium"
            type="password"
            placeholder="Password"
            disabled={props.loading === true}
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
              className={`button is-link is-medium is-fullwidth ${props.loading === true ? 'is-loading' : null}`}
              disabled={props.loading === true}
              onClick={onRegister}
            >
              Register
            </button>
        </div>
      </div>

    </div>
  );
}
