import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Link } from "react-router-dom";
import VideoList from './components/VideoList';
import ProfileBanner from './components/ProfileBanner';
import profileStore from './store/profile.store';
import authStore from './store/auth.store';
import videoApi from './common/api/video';
import accountApi from './common/api/account';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVideosLoading: false,
      isLikesLoading: false
    }
    this.refreshState = this.refreshState.bind(this);
    this.fetchAccount = this.fetchAccount.bind(this);
    this.onVideosLoadMore = this.onVideosLoadMore.bind(this);
    this.onLikesLoadMore = this.onLikesLoadMore.bind(this);
    this.onSubscribe = this.onSubscribe.bind(this);
    this.onUnsubscribe = this.onUnsubscribe.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    this.refreshState();
  }

  componentDidUpdate() {
    this.refreshState();
  }

  handleError(err) {
    const { history, dispatch } = this.props;
    switch(err.message) {
      case '401':
        dispatch(authStore.actions.unauthenticate());
        return history.replace('/login');
      case '404':
        return history.replace('/404');
      default:
        return this.setState({
          isVideosLoading: false,
          isLikesLoading: false
        });
    }
  }

  refreshState() {
    const { account, match } = this.props;
    if (account) {
      if (account._id != match.params.id) {
        this.props.dispatch(profileStore.actions.clear());
      } else {
        return;
      }
    }

    this.fetchAccount(match.params.id);
  }

  async fetchAccount(accountId) {
    try {
      const { auth, dispatch } = this.props;
      const res = await accountApi.getOne(accountId, auth.token);
      if (res.status >= 400) throw new Error(res.status);
      const json = await res.json();
      dispatch(profileStore.actions.setAccount(json.data));
    } catch(err) {
      this.handleError(err);
    }
  }

  async onSubscribe(accountId) {
    try {
      const { auth, dispatch, account } = this.props;
      const res = await accountApi.subscribe(accountId, auth.token);
      if (res.status >= 400) throw new Error(res.status);
      dispatch(profileStore.actions.setAccount(
        Object.assign({}, account, { 
          subscribersTotal: account.subscribersTotal + 1,
          isSubscribed: true 
        })
      ));
    } catch (err) {
      this.handleError(err);
    }
  }

  async onUnsubscribe(accountId) {
    try {
      const { auth, dispatch, account } = this.props
      const res = await accountApi.unsubscribe(accountId, auth.token);
      if (res.status >= 400) throw new Error(res.status);
      dispatch(profileStore.actions.setAccount(
        Object.assign({}, account, { 
          subscribersTotal: account.subscribersTotal - 1,
          isSubscribed: false 
        })
      ));
    } catch (err) {
      this.handleError(err);
    }
  }

  async onVideosLoadMore() {
    if (this.state.isVideosLoading) return;
    try {
      const { dispatch, videos, match } = this.props
      this.setState({isVideosLoading: true});
      const res = await videoApi.get({
        accountid: match.params.id,
        page: videos.page
      });
      if (res.status >= 400) throw new Error(res.status);
      const json = await res.json();
      dispatch(profileStore.actions.appendVideos(json.data));
      this.setState({isVideosLoading: false});
    } catch(err) {
      this.handleError(err);
    }
  }

  async onLikesLoadMore() {
    if (this.state.isLikesLoading) return;
    try {
      const { auth, dispatch, account, likes } = this.props
      this.setState({isLikesLoading: true});
      const res = await accountApi.getLikes(account._id, auth.token, { 
        page: likes.page
      });
      if (res.status >= 400) throw new Error(res.status);
      const json = await res.json();
      dispatch(profileStore.actions.appendLikes(json.data.map(like => like.videoId)));
      this.setState({isLikesLoading: false});
    } catch(err) {
      this.handleError(err);
    }
  }

  render() {
    const { auth, account, videos, likes, match, location } = this.props;
    return (
      (account !== null) ?

      <div>
        <ProfileBanner 
          account={account}
          owner={match.params.id == auth.accountId}
          onSubscribe={() => this.onSubscribe(account._id)}
          onUnsubscribe={() => this.onUnsubscribe(account._id)}
        />

        <div className="tabs is-centered">
          <ul>

            <li 
              className={`${location.pathname === match.url ? 'is-active' : null}`}
            >
              <Link to={match.url}>Videos</Link>
            </li>

            {
            (match.params.id == auth.accountId) ? 
            <li
              className={`${location.pathname === `${match.url}/likes` ? 'is-active' : null}`}
            >
              <Link to={`${match.url}/likes`}>Likes</Link>
            </li> : null
            }

            <li
              className={`${location.pathname === `${match.url}/about` ? 'is-active' : null}`}
            >
              <Link to={`${match.url}/about`}>About</Link>
            </li>

          </ul>
        </div>

        <div style={{paddingTop:'1rem'}} className="section">
          <div className="container"> 
            <Switch>
              <Route path={`${match.path}/about`}>
                <ProfileAbout 
                  date={account.createdAt}
                  about={account.about}
                />
              </Route>
              <Route path={`${match.path}/likes`}>
                <VideoList 
                  data={likes.items} 
                  hasMore={likes.hasMore}
                  loadMore={this.onLikesLoadMore}
                />
              </Route>
              <Route path={match.path}>
                <VideoList 
                  data={videos.items} 
                  hasMore={videos.hasMore}
                  loadMore={this.onVideosLoadMore}
                />
              </Route>
            </Switch>
          </div>
        </div>

      </div> :
      <p className="has-text-centered">Loading...</p>
    );
  }

}

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
  return {
    auth: state.auth,
    account: state.profile.account,
    videos: state.profile.videos,
    likes: state.profile.likes
  }
}

export default withRouter(connect(mapStateToProps)(ProfilePage));