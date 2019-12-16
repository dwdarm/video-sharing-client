import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import authStore from './store/auth.store';
import videoStore from './store/video.store';
import videoApi from './common/api/video';
import accountApi from './common/api/account';
import commentApi from './common/api/comment';
import VideoPlayer from './components/VideoPlayer';
import CommentList from './components/CommentList';

class VideoPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      likeLoading: false,
      subscribeLoading: false,
      postCommentLoading: false,
      commentsLoading: false,
      comment: ''
    }
    this.fetchVideo = this.fetchVideo.bind(this);
    this.onSubscribe = this.onSubscribe.bind(this);
    this.onUnsubscribe = this.onUnsubscribe.bind(this);
    this.onLikeVideo = this.onLikeVideo.bind(this);
    this.onUnlikeVideo = this.onUnlikeVideo.bind(this);
    this.onCommentsLoadMore = this.onCommentsLoadMore.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.onCommentDelete = this.onCommentDelete.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    const { video, match, dispatch } = this.props;
    if (video !== null) {
      if (video._id != match.params.id) {
        dispatch(videoStore.actions.clear());
      } else {
        return;
      }
    }

    this.fetchVideo();
  }

  componentDidUpdate() {
    const { video, match, dispatch } = this.props;
    if (video !== null) {
      if (video._id != match.params.id) {
        dispatch(videoStore.actions.clear());
      } else {
        return;
      }
    }

    this.fetchVideo();
  }

  handleError(err) {
    const { history, dispatch } = this.props;
    switch(err.message) {
      case '401':
        dispatch(authStore.actions.unauthenticate());
        return history.replace('/login');
      case '404':
        return history.replace('/404');
      default:
        return;
    }
  }

  async fetchVideo() {
    try {
      const { auth, dispatch, match } = this.props;
      const res = await videoApi.getOne(match.params.id, auth.token);
      if (res.status >= 400) throw new Error(res.status);
      const json = await res.json();
      dispatch(videoStore.actions.setVideo(json.data));
    } catch (err) {
      this.handleError(err);
    }
  }

  async onSubscribe() {
    try {
      this.setState({subscribeLoading:true});
      const { auth, dispatch, video } = this.props;
      const res = await accountApi.subscribe(video.accountId._id, auth.token);
      if (res.status >= 400) throw new Error(res.status);
      const account = Object.assign({}, video.accountId, {
        subscribersTotal: video.accountId.subscribersTotal + 1,
        isSubscribed: true 
      })
      dispatch(videoStore.actions.setVideo(
        Object.assign({}, video, { 
          accountId: account 
        })
      ));
      this.setState({subscribeLoading:false});
    } catch (err) {
      this.handleError(err);
    }
  }

  async onUnsubscribe() {
    try {
      this.setState({subscribeLoading:true});
      const { auth, dispatch, video } = this.props;
      const res = await accountApi.unsubscribe(video.accountId._id, auth.token);
      if (res.status >= 400) throw new Error(res.status);
      const account = Object.assign({}, video.accountId, {
        subscribersTotal: video.accountId.subscribersTotal - 1,
        isSubscribed: false
      })
      dispatch(videoStore.actions.setVideo(
        Object.assign({}, video, { 
          accountId: account 
        })
      ));
      this.setState({subscribeLoading:false});
    } catch (err) {
      this.handleError(err);
    }
  }

  async onLikeVideo() {
    try {
      this.setState({likeLoading:true});
      const { auth, dispatch, video, match } = this.props;
      const res = await videoApi.like(match.params.id, auth.token);
      if (res.status >= 400) throw new Error(res.status);
      dispatch(videoStore.actions.setVideo(
        Object.assign({}, video, { 
          likesTotal: video.likesTotal + 1, 
          isLiked: true 
        })
      ));
      this.setState({likeLoading:false});
    } catch (err) {
      this.handleError(err);
    }
  }

  async onUnlikeVideo() {
    try {
      this.setState({likeLoading:true});
      const { auth, dispatch, video, match } = this.props;
      const res = await videoApi.unlike(match.params.id, auth.token);
      if (res.status >= 400) throw new Error(res.status);
      dispatch(videoStore.actions.setVideo(
        Object.assign({}, video, { 
          likesTotal: video.likesTotal - 1, 
          isLiked: false 
        })
      ));
      this.setState({likeLoading:false});
    } catch (err) {
      this.handleError(err);
    }
  }

  async onCommentsLoadMore() {
    try {
      if (this.state.commentsLoading) return;
      this.setState({commentsLoading:true});
      const { comments, dispatch, match } = this.props;
      const res = await commentApi.get({
        videoid: match.params.id,
        root: true,
        page: comments.page
      });
      if (res.status >= 400) throw new Error(res.status);
      const json = await res.json();
      dispatch(videoStore.actions.appendComments(json.data));
      this.setState({commentsLoading:false});
    } catch (err) {
      this.handleError(err);
    }
  }

  async onCommentSubmit() {
    try {
      this.setState({postCommentLoading:true});
      const { dispatch, match, auth } = this.props;
      const res = await commentApi.post(match.params.id, {
        text: this.state.comment
      }, auth.token);
      if (res.status >= 400) throw new Error(res.status);
      dispatch(videoStore.actions.clearComments());
      this.setState({postCommentLoading:false});
    } catch (err) {
      this.setState({postCommentLoading:false});
      this.handleError(err);
    }
  }

  async onCommentDelete(id) {
    try {
      const { dispatch, auth } = this.props;
      const res = await commentApi.delete(id, auth.token);
      if (res.status >= 400) throw new Error(res.status);
      dispatch(videoStore.actions.clearComments());
    } catch (err) {
      this.handleError(err);
    }
  }

  render() {
    const { video, comments, auth } = this.props;
    const account = (video !== null) ? video.accountId : null;
    return (
      <div>
      <section className="section">
        <div className="container"> 
          {
            (video !== null) ? 

              <VideoPlayer 
                videoId={video._id}
                username={account.username}
                accountId={account._id}
                subscribers={account.subscribersTotal}
                owner={auth.accountId == account._id}
                isSubscribed={account.isSubscribed}
                title={video.title}
                caption={video.caption}
                urlToVideo={video.urlToVideo}
                urlToAvatar={account.urlToAvatar}
                likes={video.likesTotal}
                date={video.createdAt}
                subscribeLoading={this.state.subscribeLoading}
                onSubscribe={this.onSubscribe}
                onUnsubscribe={this.onUnsubscribe}
                isLiked={video.isLiked}
                likeLoading={this.state.likeLoading}
                onLike={this.onLikeVideo}
                onUnlike={this.onUnlikeVideo}
              /> :

              <p className="has-text-centered">Loading...</p>

          }
        </div>
      </section>

      <section className="section">
        <div className="container">
          {
          (video !== null) ? 

          <div>
            <p className="title is-5">Comments ({video.commentsTotal})</p> 

            {
            (auth.isAuthenticated) ?
            <CommentPost 
              urlToAvatar={account.urlToAvatar}
              onTextChange={(e) => this.setState({comment:e.target.value})}
              onSubmit={this.onCommentSubmit}
              loading={this.state.postCommentLoading}
            /> : null
            }

            <CommentList
              data={comments.items}
              loadMore={this.onCommentsLoadMore}
              hasMore={comments.hasMore}
              loggedId={auth.accountId}
              onDelete={this.onCommentDelete}
            />
    
          </div>

          : null
          }
        </div>
      </section>
      </div>
    )
  }

}

function CommentPost(props) {
  return (
    <div className="media">

      <div className="media-content">
        <div className="field">
          <div className="control">
            <textarea 
              className="textarea" 
              placeholder="Add a comment..." 
              onChange={props.onTextChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button 
              className={`button is-info ${props.loading ? 'is-loading' : null}`} 
              onClick={props.onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    video: state.video.video,
    comments: state.video.comments
  }
}

export default withRouter(connect(mapStateToProps)(VideoPage));
