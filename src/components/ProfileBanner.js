import React from 'react';
import { Link } from 'react-router-dom';

const defaultAvatarUrl = 'https://randomuser.me/api/portraits/lego/5.jpg';

function Button(props) {
  if (props.owner === true) {
    return (
      <Link 
        to={`/profile-edit/${props.account._id}`} 
        className="button is-small is-success"
      >
        Update
      </Link> 
    );
  }

  if (props.account.isSubscribed === true) {
    return (
      <button 
        className="button is-small is-success" 
        onClick={props.onUnsubscribe}
      >
        Unsubscribe
      </button>
    );
  }

  return (
    <button 
      className="button is-small is-success"
      onClick={props.onSubscribe}
    >
      Subscribe
    </button>
  );

} 

export default function ProfileBanner(props) {
  return (
    <section className="hero is-dark">
      <div className="hero-body">
        <div className="container has-text-centered">

          <figure 
            style={{margin:'0 auto', marginBottom:'1rem'}}  
            className="image is-128x128"
          >

            <img 
              className="is-rounded" 
              src={(props.account.urlToAvatar) ? props.account.urlToAvatar : defaultAvatarUrl}
            />

          </figure>

          <h1 className="title is-5">{props.account.username}</h1>
          <p className="subtitle is-6 has-text-grey">{props.account.subscribersTotal} subscribers</p>
          <Button {...props} />

        </div>
      </div>
    </section>
  );
}