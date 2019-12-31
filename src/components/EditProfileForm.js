import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateAccount } from '../store/actions/accounts';

function onFileChange(callback) {
  const file = document.getElementById('file-avatar');
  const label = document.querySelector('.file-name');
  label.classList.add('is-hidden');
  if (file.files.length > 0) {
    if (/image\/*/.test(file.files[0].type)) {
      label.textContent = file.files[0].name;
      label.classList.remove('is-hidden');
      if (callback) {
        callback(file.files[0]);
      }
    }
  }
}

function EditProfileForm({ accountId, history, auth, account, dispatch, isLoading }) {
  const [ avatar, setAvatar ] = useState(null);
  const [ about, setAbout ] = useState('');

  useEffect(() => {
    if (!auth.isAuthenticated || !account) {
      return history.replace('/');
    }

    setAbout(account.about);
  }, [account]);

  if (!account) {
    return null;
  }

  const onSubmit = () => {
    dispatch(updateAccount(accountId, auth.token, { avatar, about }))
      .then(() => history.replace(`/profile/${accountId}/about`));
  }

  return (
    <div style={{maxWidth:'600px', margin: '0 auto'}}>

      <div className="field">
        <div className="file is-boxed is-centered has-name">
          <label className="file-label">
            <input
              id="file-avatar"
              className="file-input"
              type="file"
              disabled={isLoading === true}
              onChange={() => onFileChange(setAvatar)}
            />
            <span className="file-cta">
              <figure className="image is-128x128">
                <img src={account ? account.urlToAvatar : null} />
              </figure>
              <span className="file-label">
                <strong>Set avatar</strong>
              </span>
              <span className="file-name is-hidden"></span>
            </span>
          </label>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="label">About:</label>
          <textarea
            className="textarea"
            placeholder="About"
            row="10"
            defaultValue={account ? account.about : ''}
            disabled={isLoading === true}
            onChange={e => setAbout(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
            <button
              className={`button is-link is-medium is-fullwidth ${isLoading === true ? 'is-loading' : null}`}
              disabled={isLoading === true}
              onClick={onSubmit}
            >
              Submit
            </button>
        </div>
      </div>

    </div>
  );
}

function mapStateToProps(state, props) {
  const { auth, accounts } = state;
  const { isLoading } = accounts;
  const account = accounts[props.accountId];

  return { auth, account, isLoading }
}

export default connect(mapStateToProps)(EditProfileForm);
