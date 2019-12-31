import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateVideo, deleteVideo } from '../store/actions/videos';
import VideoForm from './VideoForm';

function EditVideo({ auth, history, videoId, item, isUploading, isLoading, dispatch }) {
  const [ video, setVideo ] = useState(null);
  const [ thumb, setThumb ] = useState(null);
  const [ title, setTitle ] = useState('');
  const [ caption, setCaption ] = useState('');
  const [ progress, setProgress ] = useState(null);
  const [ showDeleteWarning, setShowDeleteWarning ] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated || (!item)) {
      return history.replace('/');
    }

    setTitle(item.title);
    setCaption(item.caption);
  }, [item]);

  if (!item) {
    return null;
  }

  const onUploadProgress = event => setProgress((event.loaded/event.total)*100);

  const onSubmit = () => {
    if (title.length > 0) {
      dispatch(updateVideo(videoId, auth.token, { video, thumb, title, caption }, {
        onUploadProgress
      }))
      .then(() => history.replace(`/video/${videoId}`));
    }
  }

  return(
    <div>

      <VideoForm
        loading={isLoading}
        initialTitleValue={item.title}
        initialCaptionValue={item.caption}
        onVideoChange={file => setVideo(file)}
        onThumbChange={file => setThumb(file)}
        onTitleChange={e => setTitle(e.target.value)}
        onCaptionChange={e => setCaption(e.target.value)}
        onSubmit={onSubmit}
      />

      <div style={{maxWidth:'600px', margin: '1rem auto'}}>
        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <button
              className="button is-danger is-medium"
              onClick={() => setShowDeleteWarning(true)}>
              Delete
            </button>
          </div>
        </div>
      </div>

      <ProgressModal isActive={isUploading} value={progress}/>
      <DeleteWarning
        isActive={showDeleteWarning}
        onSubmit={() => dispatch(deleteVideo(videoId, auth.token))}
        onClose={() => setShowDeleteWarning(false)}
      />

    </div>
  );
}

function ProgressModal(props) {
  return (
    <div className={`modal ${(props.isActive === true) ? 'is-active' : null}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <section className="section">
          <p className="title is-5 has-text-white has-text-centered">Uploading...</p>
          <progress className="progress is-primary" value={props.value} max="100"></progress>
        </section>
      </div>
    </div>
  )
}

function DeleteWarning(props) {
  return (
    <div className={`modal ${(props.isActive === true) ? 'is-active' : null}`}>
      <div className="modal-background" onClick={props.onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Warning</p>
          <button className="delete" aria-label="close" onClick={props.onClose}></button>
        </header>
        <section className="modal-card-body">
          <p>Are you Sure?</p>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={props.onSubmit}>Delete</button>
          <button className="button" onClick={props.onClose}>Cancel</button>
        </footer>
      </div>
    </div>
  );
}

function mapStatesToProps(state, props) {
  return {
    auth: state.auth,
    item: state.videos[props.videoId],
    isUploading: state.videos.isUploading,
    isLoading: state.videos.isLoading
  }
}

export default connect(mapStatesToProps)(EditVideo);
