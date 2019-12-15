import React from 'react';
import UploadOption from './UploadOption';

export default function PostVideoForm(props) {

  return (
    <div style={{maxWidth:'600px', margin: '0 auto'}}>

      <UploadOption 
        name="video"
        label="Video:"
        fileId="video-file"
        urlId="video-url"
        onOptionChange={props.onVideoOptionChange}
        onFileChange={props.onVideoFileChange}
        onUrlChange={props.onVideoUrlChange}
        initialUrlValue={props.initialVideoUrlValue}
      />

      <UploadOption 
        name="thumb"
        label="Thumbnail:"
        fileId="thumb-file"
        urlId="thumb-url"
        onOptionChange={props.onThumbOptionChange}
        onFileChange={props.onThumbFileChange}
        onUrlChange={props.onThumbUrlChange}
        initialUrlValue={props.initialThumbUrlValue}
      />

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
          {
            (props.loading) ?
            <button 
              className="button is-link is-medium is-fullwidth is-loading" 
              onClick={props.onSubmit}
            >
              Submit
            </button> 
            :
            <button 
              className="button is-link is-medium is-fullwidth" 
              onClick={props.onSubmit}
            >
              Submit
            </button>
          }
        </div>
      </div>

    </div>
  );
}