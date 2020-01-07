import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const defaultAvatarUrl = 'https://res.cloudinary.com/dayie1lcz/image/upload/v1578373630/profile-placeholder_zelklf.png';

function CommentItem(props) {
  return (
    <div className="media">
      <figure className="media-left">
        <p className="image is-48x48">
          <img className="is-rounded" src={props.urlToAvatar} />
        </p>
      </figure>

      <div className="media-content">
        <div className="content">
          <p>
            <Link to={`/profile/${props.accountId}`}>
              <strong>{props.username}</strong>
            </Link>
            {' · '}
            <small>{new TimeAgo('en-US').format(new Date(props.createdAt))}</small><br/>
            {props.text}
          </p>
        </div>
      </div>

      {
      (props.owner === true) ?
      <div className="media-right">
        <button className="delete" onClick={props.onDelete}></button>
      </div> : null
      }

    </div>
  );
}

function CommentList(props) {
  if (props.data.length === 0 && props.hasMore === false) {
    return (
      <div style={{ marginTop: '2rem' }}>
        <p className="has-text-centered">No comment yet!</p>
      </div>
    )
  }

  return (
    <InfiniteScroll
      style={{
        marginTop: '2rem'
      }}
      loadMore={props.loadMore}
      hasMore={props.hasMore}
      loader={
        <div className="has-text-centered" style={{paddingTop:'1rem'}} key={0}>
          <span className="icon">
            <FontAwesomeIcon icon={faSpinner} size="lg" pulse/>
          </span>
        </div>
      }>

      {props.data.map(comment => (

        <CommentItem
          key={comment.id}
          accountId={comment.account.id}
          createdAt={comment.createdAt}
          username={comment.account.username}
          urlToAvatar={comment.account.urlToAvatar || defaultAvatarUrl}
          text={comment.text}
          owner={comment.account.id == props.loggedId}
          onDelete={() => props.onDelete(comment.id)}
        />

      ))}
    </InfiniteScroll>
  );
}

export default CommentList;
