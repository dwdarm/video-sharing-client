import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import PostVideoForm from './components/PostVideoForm'
import authStore from './store/auth.store';
import videoApi from './common/api/video';
import uploadApi from './common/api/upload';

class EditVideoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      progressModalText: '',
      showProgressModal: false,
      uploadProgress: null,
      videoOption: 'file',
      videoFile: null,
      videoUrl: '',
      thumbOption: 'file',
      thumbFile: null,
      thumbUrl: '',
      title: '',
      caption: '',
      showDeleteModal: false
    }
    this.handleError = this.handleError.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    const { auth, history, match } = this.props;
    if (!auth.isAuthenticated) {
      return history.replace('/login');
    }

    (async () => {
      try {
        this.setState({isLoading: true});
        const res = await videoApi.getOne(match.params.id);
        if (res.status >= 400) throw new Error(res.status);
        const json = await res.json();
        this.setState({
          videoUrl: json.data.urlToVideo,
          thumbUrl: json.data.urlToThumbnail,
          title: json.data.title,
          caption: json.data.caption,
          isLoading: false
        });
      } catch(err) {

      } 
    })();

  }

  handleError(err) {
    const { history, dispatch } = this.props;
    switch(err.message) {
      case '401':
        dispatch(authStore.actions.unauthenticate());
        return history.replace('/login');
      default:
        return this.setState({isLoading:false});
    }
  }

  async onSubmit() {
    const { auth, history, match, dispatch } = this.props;
    try {
      this.setState({isLoading:true});

      let urlToThumbnail = this.state.thumbUrl;
      if (this.state.thumbOption === 'file') {
        if (this.state.thumbFile !== null) {
          this.setState({
            progressModalText: 'Uploading Thumbnail...',
            showProgressModal: true
          });
          let res = await uploadApi.upload(
            this.state.thumbFile, 
            auth.token,
            e => this.setState({uploadProgress:(e.loaded/e.total)*100})
          );
          urlToThumbnail = res.url;
          this.setState({showProgressModal: false});
        }
      } 
      
      let urlToVideo = this.state.videoUrl;
      if (this.state.videoOption === 'file') {
        if (this.state.videoFile !== null) {
          this.setState({
            progressModalText: 'Uploading Video...',
            showProgressModal: true
          });
          let res = await uploadApi.upload(
            this.state.videoFile, 
            auth.token,
            e => this.setState({uploadProgress:(e.loaded/e.total)*100})
          );
          urlToVideo = res.url;
          this.setState({showProgressModal: false});
        }
      } else {
        if (urlToVideo.length === 0) throw new Error();
      }

      const res = await videoApi.update(match.params.id, {
        urlToVideo: urlToVideo,
        urlToThumbnail: urlToThumbnail,
        title: this.state.title,
        caption: this.state.caption
      }, auth.token);
      if (res.status >= 400) throw new Error(res.status);

      dispatch((() => ({type:'CLEAR'}))());
      history.replace(`/video/${match.params.id}`);

    } catch(err) {
      this.handleError(err);
    }
  }

  async onDelete() {
    const { auth, history, match } = this.props;
    try {
      this.setState({
        isLoading:true,
        showDeleteModal:false
      });
      const res = await videoApi.delete(match.params.id, auth.token);
      if (res.status >= 400) throw new Error(res.status);
      dispatch((() => ({type:'CLEAR'}))());
      history.replace('/');
    } catch(err) {
      this.handleError(err);
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <p className="title has-text-centered">Post a video</p>
          <PostVideoForm 
            loading={this.state.isLoading}
            initialVideoUrlValue={this.state.videoUrl}
            initialThumbUrlValue={this.state.thumbUrl}
            initialTitleValue={this.state.title}
            initialCaptionValue={this.state.caption}
            onVideoOptionChange={(e) => this.setState({videoOption:e.target.value})}
            onVideoFileChange={(file) => this.setState({videoFile:file})}
            onVideoUrlChange={(e) => this.setState({videoUrl:e.target.value})}
            onThumbOptionChange={(e) => this.setState({thumbOption:e.target.value})}
            onThumbFileChange={(file) => this.setState({thumbFile:file})}
            onThumbUrlChange={(e) => this.setState({thumbUrl:e.target.value})}
            onTitleChange={(e) => this.setState({title:e.target.value})}
            onCaptionChange={(e) => this.setState({caption:e.target.value})}
            onSubmit={this.onSubmit}
          />

          <div style={{maxWidth:'600px', margin: '1rem auto'}}>
            <div className="field is-grouped is-grouped-right">
              <div className="control">
                <button 
                  className="button is-danger is-medium" 
                  disabled={this.props.isLoading}
                  onClick={() => this.setState({showDeleteModal:true})}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

        </div>
        <DeleteWarning 
          isActive={this.state.showDeleteModal}
          onClose={() => this.setState({showDeleteModal:false})}
          onSubmit={this.onDelete}
        />
        <ProgressModal 
          isActive={this.state.showProgressModal}
          text={this.state.progressModalText}
          value={this.state.uploadProgress}
        />
      </section>
    );
  }
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

function ProgressModal(props) {
  return (
    <div className={`modal ${(props.isActive === true) ? 'is-active' : null}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <section className="section">
          <p className="title is-5 has-text-white has-text-centered">{props.text}</p>
          <progress className="progress is-primary" value={props.value} max="100"></progress>
        </section>
      </div>
    </div>
  )
}

function mapStatesToProps(state) {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(mapStatesToProps)(EditVideoPage));