import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchComments, postComment, deleteComment } from '../../store/actions/videos';
import CommentList from '../../components/CommentList';

function VideoComments(props) {
  const [comment, setComment] = useState('');
  const { dispatch, accounts, videos, comments, auth, videoId } = props;
  const video = videos[videoId];

  if (!video) {
    return (null);
  }

  const { ids, hasMore, isLoading } = video.comments;
  const data = ids.map(id => ({
      ...comments[id],
      account: accounts[comments[id].account]
  }));

  function onLoadMore() {
    if (!isLoading) {
      dispatch(fetchComments(videoId, auth.token));
    }
  }

  function onSubmit() {
    if (comment.length > 0) {
      dispatch(postComment(videoId, auth.token, comment));
    }
  }

  function onDelete(commentId) {
    dispatch(deleteComment(videoId, commentId, auth.token));
  }

  return (
    <>
      <p className="title is-5">Comments</p>

      {(auth.isAuthenticated) ?
        <CommentPost
          onTextChange={e => setComment(e.target.value)}
          onSubmit={onSubmit}
          loading={comments.isLoading}
        /> : null
      }

      <CommentList
        data={data}
        loadMore={onLoadMore}
        hasMore={hasMore}
        loggedId={auth.accountId}
        onDelete={onDelete}
      />
    </>
  );

}

function propsIsEqual(prevProps, nextProps) {
  if (prevProps.auth.isAuthenticated !== nextProps.auth.isAuthenticated) {
    return false;
  }

  if (prevProps.videoId !== nextProps.videoId) {
    return false;
  }

  if (prevProps.comments.isLoading !== nextProps.comments.isLoading) {
    return false;
  }

  if (prevProps.videos[prevProps.videoId] === undefined
    && nextProps.videos[nextProps.videoId] !== undefined) {
    return false;
  }

  if (prevProps.videos[prevProps.videoId]) {
    if (prevProps.videos[prevProps.videoId].comments.hasMore !==
      nextProps.videos[nextProps.videoId].comments.hasMore) {
      return false;
    }

    if (prevProps.videos[prevProps.videoId].comments.ids.length !==
      nextProps.videos[nextProps.videoId].comments.ids.length) {
      return false;
    }
  }

  return true;
}

const MemoizedVideoComments = React.memo(VideoComments, propsIsEqual);

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
  const { accounts, videos, comments, auth } = state;
  return {
    auth,
    accounts,
    videos,
    comments
  }
}

export default connect(mapStateToProps)(MemoizedVideoComments);
