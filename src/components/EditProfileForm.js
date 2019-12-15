import React from 'react';

function onRadioChange(event, callback) {
  if (event.target.value === 'file') {
    document.getElementById('file-avatar').classList.remove('is-hidden');
    document.getElementById('url-avatar').classList.add('is-hidden');
  } else if (event.target.value === 'url') {
    document.getElementById('file-avatar').classList.add('is-hidden');
    document.getElementById('url-avatar').classList.remove('is-hidden');
  }

  if (callback) {
    callback(event);
  }
}

function onFileChange(event, callback) {
  const file = document.getElementById('file-input');
  if (file.files.length > 0) {
    const label = document.querySelector('.file-name')
    label.textContent = file.files[0].name;
    if (callback) {
      callback(file.files[0]);
    }
  }
}

export default function EditProfileForm(props) {

  return (
    <div style={{maxWidth:'600px', margin: '0 auto'}}>

      <div className="field">
        <label className="label">Set Avatar:</label>

        <div className="control">
          <label className="radio">
            <input 
              type="radio" 
              name="avatar"
              value="file" 
              defaultChecked
              disabled={props.loading === true}
              onChange={(e) => onRadioChange(e, props.onSetAvatarChange)}
            /> 
             File
          </label>
          <label className="radio">
            <input 
              type="radio"
              name="avatar"
              value="url" 
              disabled={props.loading === true}
              onChange={(e) => onRadioChange(e, props.onSetAvatarChange)}
            /> 
             URL
          </label>
        </div>

        <div id="file-avatar" className="control">
          <div className="file is-info has-name is-fullwidth">
            <label className="file-label">
              <input 
                id="file-input"
                className="file-input" 
                type="file" 
                disabled={props.loading === true}
                onChange={(e) => onFileChange(e, props.onFileAvatarChange)}
              />
              <span className="file-cta">
                <span className="file-label">Choose a file…</span>
              </span>
              <span className="file-name"></span>
            </label>
          </div>
        </div>

        <div id="url-avatar" className="is-hidden control">
          <input 
            className="input" 
            type="text" 
            placeholder="URL for avatar" 
            defaultValue={props.initialUrlToAvatarValue}
            disabled={props.loading === true}
            onChange={props.onUrlAvatarChange}
          />
        </div>

      </div>

      <div className="field">
        <div className="control">
          <textarea 
            className="textarea" 
            placeholder="About"
            row="10"
            defaultValue={props.initialAboutValue}
            disabled={props.loading === true}
            onChange={props.onAboutChange} 
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
            <button 
              className={`button is-link is-medium is-fullwidth ${props.loading === true ? 'is-loading' : null}`} 
              disabled={props.loading === true}
              onClick={props.onSubmit}
            >
              Submit
            </button>
        </div>
      </div>

    </div>
  );
}