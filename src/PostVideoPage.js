import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import PostVideoForm from './components/PostVideoForm'
import authStore from './store/auth.store';
import accountApi from './common/api/account';
import videoApi from './common/api/video';
import uploadApi from './common/api/upload';

class PostVideoPage extends React.Component {
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
      caption: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    const { auth, history } = this.props;
    if (!auth.isAuthenticated) {
      return history.replace('/login');
    }
  }

  handleError(err) {
    const { history, dispatch } = this.props;
    switch(err.message) {
      case '401':
        dispatch((() => ({type:'CLEAR'}))());
        dispatch(authStore.actions.unauthenticate());
        return history.replace('/login');
      default:
        return this.setState({
          isLoading: false,
          showProgressModal: false,
        });
    }
  }

  async onSubmit() {
    const { auth, history, dispatch } = this.props;
    try {
      this.setState({isLoading: true});

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

      const res = await videoApi.post({
        urlToVideo: urlToVideo,
        urlToThumbnail: urlToThumbnail,
        title: this.state.title,
        caption: this.state.caption
      }, auth.token);
      if (res.status >= 400) throw new Error(res.status);
      const json = await res.json();

      dispatch((() => ({type:'CLEAR'}))());
      history.replace(`/video/${json.data._id}`);

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
        </div>
        <ProgressModal 
          isActive={this.state.showProgressModal}
          text={this.state.progressModalText}
          value={this.state.uploadProgress}
        />
      </section>
    );
  }
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

export default withRouter(connect(mapStatesToProps)(PostVideoPage));