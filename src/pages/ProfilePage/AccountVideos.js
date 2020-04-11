import React from 'react';
import { connect } from 'react-redux';
import { fetchAccountVideos, fetchAccountLikes } from '../../store/actions/accounts';
import VideoList from '../../components/VideoList';

function AccountVideos({ dispatch, auth, videos, type, accountId }) {
  if (!videos) {
    return (null);
  }

  const { items, hasMore, isLoading } = videos;
  const onLoadMore = () => {
    if (isLoading === false) {
      if (type === 'videos') {
        dispatch(fetchAccountVideos(accountId, auth.token))
      } else {
        dispatch(fetchAccountLikes(accountId, auth.token))
      }
    }
  }

  return <VideoList data={items} hasMore={hasMore} loadMore={onLoadMore}/>
}

const propsIsEqual = (prevProps, nextProps) => {
  if (prevProps.auth.isAuthenticated !== nextProps.auth.isAuthenticated) {
    return false;
  }

  if (prevProps.type !== nextProps.type) {
    return false;
  }

  if (prevProps.accountId != nextProps.accountId) {
    return false;
  }

  if (prevProps.videos === null && nextProps.videos !== null) {
    return false;
  }

  if (prevProps.videos !== null && nextProps.videos !== null) {
    return (prevProps.videos.items.length === nextProps.videos.items.length)
      && (prevProps.videos.hasMore === nextProps.videos.hasMore)
  }

  return true;
}

const MemoizedAccountVideos = React.memo(AccountVideos, propsIsEqual);

const mapStateToProps = (state, props) => {
  const { accounts, videos, auth } = state;
  const { accountId, type } = props;
  const account = accounts[accountId];

  if (!account) {
    return {
      auth,
      videos: null
    }
  }

  const { ids, hasMore, isLoading } = account[type];
  const items = ids.map(item => ({
    ...videos[item],
    account: accounts[videos[item].account]
  }));

  return {
    auth,
    videos: { items, hasMore, isLoading }
  }
}

export default connect(mapStateToProps)(MemoizedAccountVideos);
