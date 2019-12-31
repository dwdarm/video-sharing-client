import React from 'react';

function onVideoChange(event, callback) {
  const file = document.getElementById('file-input-video');
  if (file.files.length > 0) {
    if (/video\/*/.test(file.files[0].type)) {
      const label = document.getElementById('file-name-video')
      label.textContent = file.files[0].name;
      if (callback) {
        callback(file.files[0]);
      }
    }
  }
}

function onThumbChange(event, callback) {
  const file = document.getElementById('file-input-thumb');
  if (file.files.length > 0) {
    if (/image\/*/.test(file.files[0].type)) {
      const label = document.getElementById('file-name-thumb')
      label.textContent = file.files[0].name;
      if (callback) {
        callback(file.files[0]);
      }
    }
  }
}

export default function VideoForm(props) {

  return (
    <div style={{maxWidth:'600px', margin: '0 auto'}}>

      <div className="field">
        <label className="label">Video:</label>
        <div className="control">
          <div className="file has-name is-fullwidth is-primary">
            <label className="file-label">
              <input
                id="file-input-video"
                className="file-input"
                type="file"
                onChange={(e) => onVideoChange(e, props.onVideoChange)}
              />
              <span className="file-cta">
                <span className="file-label">Choose a file…</span>
              </span>
              <span id="file-name-video" className="file-name"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Thumbnail (Optional):</label>
        <div className="control">
          <div className="file has-name is-fullwidth is-primary">
            <label className="file-label">
              <input
                id="file-input-thumb"
                className="file-input"
                type="file"
                onChange={(e) => onThumbChange(e, props.onThumbChange)}
              />
              <span className="file-cta">
                <span className="file-label">Choose a file…</span>
              </span>
              <span id="file-name-thumb" className="file-name"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Title:</label>
        <div className="control">
          <input
            type="input"
            className="input"
            placeholder="Title"
            onChange={props.onTitleChange}
            defaultValue={props.initialTitleValue}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Caption:</label>
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Caption"
            row="10"
            onChange={props.onCaptionChange}
            defaultValue={props.initialCaptionValue}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button
            className={`
              button is-link is-medium is-fullwidth
              ${props.loading ? 'is-loading' : null}
            `}
            onClick={props.onSubmit}
          >
            Submit
          </button>
        </div>
      </div>

    </div>
  );
}
