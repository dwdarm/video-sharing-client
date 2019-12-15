import React from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function VideoPlayer(props) {
  const urlToAvatar = (props.urlToAvatar) ? props.urlToAvatar : 'https://randomuser.me/api/portraits/lego/5.jpg';
  return (
    <div onLoad={() => { new Plyr('#player')}}>
      
      <video
        id="player" 
        playsInline 
        controls
      >
        <source src={props.urlToVideo} />
      </video> 

      <h1 style={{paddingTop:'1.5rem'}} className="title">{props.title}</h1>

      <div className="columns is-mobile">
        <div className="column is-narrow">
          {
            (props.isLiked === true) ? 
            <a className="button" onClick={props.onUnlike}><span className="icon"><FontAwesomeIcon icon={faHeart} /></span><small>{props.likes}</small></a> :
            <a className="button is-success" onClick={props.onLike}><span className="icon"><FontAwesomeIcon icon={faHeart} /></span><small>{props.likes}</small></a>
          }
        </div>

        <div className="column is-narrow">
          {
            (props.owner === true) ?
            <Link className="button is-success" to={`/video-edit/${props.videoId}`}>Edit</Link> : null
          }
        </div>
      </div>

      <div style={{padding:'1.5rem 0'}} className="media">

        <div className="media-left">
          <figure className="image is-64x64">
            <img className="is-rounded" src={urlToAvatar}/>
          </figure>
        </div>

        <div className="media-content">
          <div className="content">
            <p>
              <Link to={`/profile/${props.accountId}`}><strong>{props.username}</strong><br/></Link>
              <small>{props.subscribers} subscribers</small>
            </p>
          </div>
        </div>

        <div className="media-right">
          {
            (!props.owner) ? 
              (props.isSubscribed) ? 
                <a className="button" onClick={props.onUnsubscribe}>Unsubscribe</a> :
                <a className="button is-success" onClick={props.onSubscribe}>Subscribe</a> : 
              null
          }
        </div>

      </div>

      <div className="content">
        <p>
          <small>Posted at {props.date.split('T')[0]}</small><br/><br/>
          {props.caption}
        </p>
      </div>

    </div>
  );
}