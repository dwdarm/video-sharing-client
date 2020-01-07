import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link, useParams } from 'react-router-dom';
import {
  fetchAccount,
  subscribeAccount,
  unsubscribeAccount
} from '../store/actions/accounts';
import Loading from './Loading';
import Notification from './Notification';

const defaultAvatarUrl = 'https://res.cloudinary.com/dayie1lcz/image/upload/v1578373630/profile-placeholder_zelklf.png';

function ProfileBanner(props) {
  const { accountId, auth, account, dispatch, error } = props;

  useEffect(() => {
    if (!account) {
      dispatch(fetchAccount(accountId, auth.token));
    }
  });

  if (error && !account) {
    return <Notification type="error" text={error}/>
  }

  if (!account) {
    return <Loading/>
  }

  return(
    <Profile
      account={account}
      owner={accountId == auth.accountId}
      onSubscribe={() => dispatch(subscribeAccount(accountId, auth.token))}
      onUnsubscribe={() => dispatch(unsubscribeAccount(accountId, auth.token))}
    />
  );
}

function propsIsEqual(prevProps, nextProps) {
  if (prevProps.auth.isAuthenticated !== nextProps.auth.isAuthenticated) {
    return false;
  }

  if (prevProps.accountId != nextProps.accountId) {
    return false;
  }

  if (prevProps.account !== nextProps.account) {
    return false;
  }

  if (prevProps.error !== nextProps.error) {
    return false;
  }

  return true;
}

const MemoizedProfileBanner = React.memo(ProfileBanner, propsIsEqual);

function Button(props) {
  if (props.owner === true) {
    return (
      <Link
        to={`/profile/${props.account.id}/update`}
        className="button is-small is-success">
        Update
      </Link>
    );
  }

  if (props.account.isSubscribed === true) {
    return (
      <button
        className="button is-small is-success"
        onClick={props.onUnsubscribe}>
        Unsubscribe
      </button>
    );
  }

  return (
    <button
      className="button is-small is-success"
      onClick={props.onSubscribe}>
      Subscribe
    </button>
  );

}

function Profile(props) {
  return (
    <section className="hero is-dark">
      <div className="hero-body">
        <div className="container has-text-centered">

          <figure
            style={{margin:'0 auto', marginBottom:'1rem'}}
            className="image is-128x128">

            <img
              className="is-rounded"
              src={props.account.urlToAvatar || defaultAvatarUrl}/>

          </figure>

          <h1 className="title is-5">{props.account.username}</h1>
          <p className="subtitle is-6 has-text-grey">{props.account.subscribersTotal} subscribers</p>
          <Button {...props} />

        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state, props) => {
  const { accounts, auth } = state;
  const { accountId } = props;
  return {
    auth,
    error: accounts.error,
    account: accounts[accountId]
  }
}

export default connect(mapStateToProps)(MemoizedProfileBanner);
