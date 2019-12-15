import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';

function CommentItem(props) {
  return (
    <div className="media">

      <figure className="media-left">
        <p className="image is-64x64">
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
  return (
    <InfiniteScroll
      style={{
        paddingTop: '3rem'
      }}
      loadMore={props.loadMore}
      hasMore={props.hasMore}
      loader={<div className="has-text-centered" key={0}>Loading...</div>}
    >
      {
      props.data.map(comment => (
      
        <CommentItem 
          key={comment._id}
          accountId={comment.accountId._id}
          createdAt={comment.createdAt}
          username={comment.accountId.username}
          urlToAvatar={comment.accountId.urlToAvatar}
          text={comment.text}
          owner={comment.accountId._id == props.loggedId}
          onDelete={() => props.onDelete(comment._id)}
        />
      
      ))
      }
    </InfiniteScroll>
  );
}

export default CommentList;