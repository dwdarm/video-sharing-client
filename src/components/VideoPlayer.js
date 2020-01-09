import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Video from './Video';
import Loading from './Loading';
import Notification from './Notification';
import { connect } from 'react-redux';
import { fetchVideo, likeVideo, unlikeVideo } from '../store/actions/videos';
import { subscribeAccount, unsubscribeAccount } from '../store/actions/accounts';

const defaultAvatarUrl = 'https://res.cloudinary.com/dayie1lcz/image/upload/v1578373630/profile-placeholder_zelklf.png';

function VideoPlayer({
  auth, video, isLikeLoading, isSubLoading, dispatch, videoId, error }) {
  useEffect(() => {
    if (!video) {
      dispatch(fetchVideo(videoId, auth.token));
    }
  });

  if (error && !video) {
    return(
      <div className="wrapper">
        <div className="container">
          <Notification type="error" text={error}/>
        </div>
      </div>
    );
  }

  if (!video) {
    return(
      <div className="wrapper">
        <div className="container">
          <Loading/>
        </div>
      </div>
    );
  }

  const { account } = video;

  return(
    <div>

      { /* Video */ }
      <div className="has-background-black">
        <div className="container">
          <Video id="player" playsInline controls>
            <source src={video.urlToVideo}/>
            <source src={video.urlToVideo}/>
          </Video>
        </div>
      </div>

      <div className="video-wrapper">
        <div className="container">

          { /* Title */ }
          <h1 className="title">{video.title}</h1>

          { /* Control Button */ }
          <div className="field is-grouped">

            <div className="control">
              {(video.isLiked === true) ?
              <a
                className={`button ${isLikeLoading ? 'is-loading' : null}`}
                onClick={() => dispatch(unlikeVideo(videoId, auth.token))}>
                <span className="icon"><FontAwesomeIcon icon={faHeart} /></span>
                <small>{video.likesTotal}</small>
              </a>
              :
              <a
                className={`button is-success ${isLikeLoading ? 'is-loading' : null}`}
                onClick={() => dispatch(likeVideo(videoId, auth.token))}>
                <span className="icon"><FontAwesomeIcon icon={faHeart} /></span>
                <small>{video.likesTotal}</small>
              </a>}
            </div>

            <div className="control">
              {(account.id == auth.accountId) ?
              <Link
                className="button is-success"
                to={`/video/${videoId}/update`}>
                Edit
              </Link> : null}
            </div>

          </div>

          { /* Profile */ }
          <div style={{padding:'1.5rem 0'}} className="media">

            <div className="media-left">
              <figure className="image is-64x64">
                <img className="is-rounded" src={account.urlToAvatar || defaultAvatarUrl}/>
              </figure>
            </div>

            <div className="media-content">
              <div className="content">
                <p>
                  <Link to={`/profile/${account.id}`}><strong>{account.username}</strong><br/></Link>
                  <small>{account.subscribersTotal} subscribers</small>
                </p>
              </div>
            </div>

            <div className="media-right">
              {(account.id != auth.accountId) ?
              (account.isSubscribed) ?

              <a
                className={`button ${isSubLoading ? 'is-loading' : null}`}
                onClick={() => dispatch(unsubscribeAccount(account.id, auth.token))}>
                Unsubscribe
              </a>
              :
              <a
                className={`button is-success ${isSubLoading ? 'is-loading' : null}`}
                onClick={() => dispatch(subscribeAccount(account.id, auth.token))}>
                Subscribe
              </a>

              : null}
            </div>

          </div>

          <div className="content">
            <p>
              <small>Posted at {video.createdAt.split('T')[0]}</small><br/><br/>
              {video.caption}
            </p>
          </div>

        </div>
      </div>

    </div>
  );

}

function isPropsEqual(prevProps, nextProps) {
  if (prevProps.auth.isAuthenticated !== nextProps.auth.isAuthenticated) {
    return false;
  }

  if (prevProps.videoId !== nextProps.videoId) {
    return false;
  }

  if (prevProps.error !== nextProps.error) {
    return false;
  }

  if (prevProps.video === null && nextProps.video !== null) {
    return false;
  }

  if (prevProps.isLikeLoading !== nextProps.isLikeLoading) {
    return false;
  }

  if (prevProps.isSubLoading !== nextProps.isSubLoading) {
    return false;
  }

  return true;
}

const MemoizedVideoPlayer = React.memo(VideoPlayer, isPropsEqual);

function mapStateToProps(state, props) {
  const { auth, accounts, videos } = state;
  const video = videos[props.videoId];

  return {
    auth,
    video: video ? { ...video, account: accounts[video.account] } : null,
    isLikeLoading: videos.isLoading,
    isSubLoading: accounts.isLoading,
    error: videos.error
  }
}

export default connect(mapStateToProps)(MemoizedVideoPlayer);
