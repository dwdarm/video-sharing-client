import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { postVideo } from '../../store/actions/videos';
import VideoForm from '../../components/VideoForm';

function PostVideo(props) {
  const [ video, setVideo ] = useState(null);
  const [ thumb, setThumb ] = useState(null);
  const [ title, setTitle ] = useState('');
  const [ caption, setCaption ] = useState('');
  const [ progress, setProgress ] = useState(null);
  const { auth, history, videos, dispatch } = props;
  const { isUploading } = videos;

  useEffect(() => {
    if (!auth.isAuthenticated) {
      history.replace('/');
    }
  });

  function onUploadProgress(event) {
    setProgress((event.loaded/event.total)*100);
  }

  function onSubmit() {
    if (title.length > 0) {
      dispatch(postVideo(auth.token, { video, thumb, title, caption }, {
        onUploadProgress
      }))
      .then((video) => history.replace(`/video/${video.id}`));
    }
  }

  return(
    <div>
      <VideoForm
        loading={false}
        onVideoChange={file => setVideo(file)}
        onThumbChange={file => setThumb(file)}
        onTitleChange={e => setTitle(e.target.value)}
        onCaptionChange={e => setCaption(e.target.value)}
        onSubmit={onSubmit}
      />
      <ProgressModal isActive={isUploading} value={progress}/>
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

function mapStatesToProps(state) {
  return {
    auth: state.auth,
    videos: state.videos
  }
}

export default connect(mapStatesToProps)(PostVideo);
