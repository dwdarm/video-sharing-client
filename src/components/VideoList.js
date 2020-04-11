import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const defaultAvatarUrl = 'https://res.cloudinary.com/dayie1lcz/image/upload/v1578373630/profile-placeholder_zelklf.png';

function VideoItem(props) {
  return (
    <Link to={`/video/${props.id}`}>
      <div className="card is-shadowless">
        <div className="card-image">
          <figure className="image is-16by9 has-background-grey">
            <img
              className="has-ratio"
              style={{width:'100%', border: '0.1rem solid hsl(0, 0%, 86%)'}}
              src={props.urlToThumbnail}
              alt="thumbnail"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">

            <div className="media-left">
              <figure className="image is-32x32">
                <img
                  className="is-rounded"
                  src={props.urlToAvatar}/>
              </figure>
            </div>

            <div className="media-content is-clipped">
              <div className="content">
                <p>
                  <strong>{props.title}</strong><br/>
                  <small className="has-text-grey">{props.username} · {new TimeAgo('en-US').format(new Date(props.createdAt))}</small>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Link>
  );
}

function VideoList(props) {
  const { data, hasMore, loadMore } = props;
  return (
    <InfiniteScroll
      loadMore={loadMore}
      hasMore={hasMore}
      loader={
        <div className="has-text-centered" key={0}>
          <span className="icon">
            <FontAwesomeIcon icon={faSpinner} size="lg" pulse/>
          </span>
        </div>
      }>

      <div className="columns is-multiline is-variable is-0-mobile">
        {
          data.map(item => (
            (item) ?
            <div key={item.id} className="column is-one-third">
              <VideoItem
                id={item.id}
                urlToThumbnail={item.urlToThumbnail}
                title={item.title}
                username={item.account.username}
                urlToAvatar={item.account.urlToAvatar || defaultAvatarUrl}
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

export default VideoList;
