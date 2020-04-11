import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from "react-router-dom";
import AccountVideos from './AccountVideos';

function ProfileTab(props) {
  const { auth, accounts, accountId, location, match } = props;
  const { pathname } = location;


  const account = accounts[accountId];
  if (!account) { return(null) }

  return(
    <>

      <div className="tabs is-centered">
        <ul>

          <li className={`${pathname === match.url ? 'is-active' : null}`}>
            <Link to={match.url}>Videos</Link>
          </li>

          {(accountId == auth.accountId) ?
          <li className={`${pathname === `${match.url}/likes` ? 'is-active' : null}`}>
            <Link to={`${match.url}/likes`}>Likes</Link>
          </li> : null}

          <li className={`${pathname === `${match.url}/about` ? 'is-active' : null}`}>
            <Link to={`${match.url}/about`}>About</Link>
          </li>

        </ul>
      </div>

      <Switch>
        <Route path={`${match.path}/about`}>
          <ProfileAbout
            date={account.createdAt}
            about={account.about}
          />
        </Route>
        <Route path={`${match.path}/likes`}>
          <AccountVideos accountId={accountId} type="likes"/>
        </Route>
        <Route path={match.path}>
          <AccountVideos accountId={accountId} type="videos"/>
        </Route>
      </Switch>

    </>
  );
}

function propsIsEqual(prevProps, nextProps) {
  if (prevProps.auth.isAuthenticated !== nextProps.auth.isAuthenticated) {
    return false;
  }

  if (prevProps.accountId != nextProps.accountId) {
    return false;
  }

  if (prevProps.accounts[prevProps.accountId] === undefined
    && nextProps.accounts[nextProps.accountId] !== undefined) {
    return false;
  }

  if (prevProps.location.pathname != nextProps.location.pathname) {
    return false;
  }

  return true;
}

const MemoizedProfileTab = React.memo(ProfileTab, propsIsEqual);

function ProfileAbout(props) {
  return (
    <div className="content">
      <p>
        Joined {props.date.split('T')[0]}<br/><br/>
        {
        props.about.split('\n').map(
          (text, key) => <span key={key}>{text}<br/></span>
        )
        }
      </p>
    </div>
  );
}

function mapStateToProps(state) {
  const { auth, accounts } = state;
  return { auth, accounts }
}

export default connect(mapStateToProps)(MemoizedProfileTab);
