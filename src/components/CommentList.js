import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';

function CommentItem(props) {
  return (
    <div className="media">
      { console.log('CommentList Render') }
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
          key={comment.id}
          accountId={comment.account.id}
          createdAt={comment.createdAt}
          username={comment.account.username}
          urlToAvatar={comment.account.urlToAvatar}
          text={comment.text}
          owner={comment.account.id == props.loggedId}
          onDelete={() => props.onDelete(comment.id)}
        />
      
      ))
      }
    </InfiniteScroll>
  );
}

export default CommentList;