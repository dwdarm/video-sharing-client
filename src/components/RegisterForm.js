import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function LoginForm(props) {
  return (
    <div style={{maxWidth:'600px', margin: '0 auto'}}>

      {
        (props.showErrorNotification) ?
          <div className="notification is-danger">
            {props.ErrorNotificationText}
          </div> : null
      }

      <div className="field">
        <div className="control has-icons-left">
          <input 
            className="input is-medium" 
            type="text" 
            placeholder="Username"
            disabled={props.loading === true}
            onChange={props.onUsernameChange}
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
            onChange={props.onEmailChange}
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
            onChange={props.onPasswordChange}
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
              onClick={props.onSubmit}
            >
              Register
            </button>
        </div>
      </div>

    </div>
  );
}