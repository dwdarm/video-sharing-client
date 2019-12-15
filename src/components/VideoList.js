import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';

function VideoItem(props) {
  return (
    <Link to={`/video/${props.id}`}>
      <div className="card">
        <div className="card-image">
          <figure className="image is-16by9 has-background-grey">
            <img 
              className="has-ratio"
              style={{width:'100%'}} 
              src={props.urlToThumbnail} 
              alt="thumbnail"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <p>
              <strong>{props.title}</strong><br/>
              <small className="has-text-grey">{props.username} · {new TimeAgo('en-US').format(new Date(props.createdAt))}</small>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function VideoList(props) {
  return (
    <InfiniteScroll
      loadMore={props.loadMore}
      hasMore={props.hasMore}
      loader={<div className="has-text-centered" key={0}>Loading...</div>}
    >
      <div className="columns is-multiline">
        {
          props.data.map(item => (
            (item) ? 
            <div key={item._id} className="column is-one-third">
              <VideoItem 
                id={item._id}
                urlToThumbnail={item.urlToThumbnail}
                title={item.title}
                username={item.accountId.username}
                views={item.viewsTotal}
                createdAt={item.createdAt}
              />
            </div> : null
          ))
        }
      </div>
    </InfiniteScroll>
  );
}