import React from 'react';

export default function UploadOption(props) {

  function onRadioChange(event, props, callback) {
    if (event.target.value === 'file') {
      document.getElementById(props.fileId).classList.remove('is-hidden');
      document.getElementById(props.urlId).classList.add('is-hidden');
    } else if (event.target.value === 'url') {
      document.getElementById(props.fileId).classList.add('is-hidden');
      document.getElementById(props.urlId).classList.remove('is-hidden');
    }
  
    if (callback) {
      callback(event);
    }
  }

  function onFileChange(event, props ,callback) {
    const file = document.getElementById(`${props.fileId}-input`);
    if (file.files.length > 0) {
      const label = document.getElementById(`${props.fileId}-name`)
      label.textContent = file.files[0].name;
      if (callback) {
        callback(file.files[0]);
      }
    }
  }

  return (
    <div className="field">

      <label className="label">{props.label}</label>

      <div style={{paddingBottom:'1rem'}} className="control">
        <label className="radio">
          <input 
            type="radio" 
            name={props.name}
            value="file" 
            defaultChecked
            onChange={e => onRadioChange(e, props, props.onOptionChange)}
          /> 
            File
        </label>
        <label className="radio">
          <input 
            type="radio"
            name={props.name}
            value="url" 
            onChange={e => onRadioChange(e, props, props.onOptionChange)}
          /> 
            URL
        </label>
      </div>

      <div id={props.fileId} className="control">
        <div className="file is-info has-name is-fullwidth">
          <label className="file-label">
            <input 
              id={`${props.fileId}-input`}
              className="file-input" 
              type="file" 
              onChange={e => onFileChange(e, props, props.onFileChange)}
            />
            <span className="file-cta">
              <span className="file-label">Choose a file…</span>
            </span>
            <span id={`${props.fileId}-name`} className="file-name"></span>
          </label>
        </div>
      </div>

      <div id={props.urlId} className="is-hidden control">
        <input 
          className="input" 
          type="text" 
          placeholder="URL"
          defaultValue={props.initialUrlValue} 
          onChange={props.onUrlChange}
        />
      </div>

    </div>
  );
}