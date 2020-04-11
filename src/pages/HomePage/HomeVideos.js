import React from 'react';
import { connect } from 'react-redux';
import { fetchHomeVideos } from '../../store/actions/videos';
import VideoList from '../../components/VideoList';

function HomeVideos({dispatch, auth, videos, hasMore, isLoading}) {
  const onLoadMore = () => {
    if (isLoading === false) {
      dispatch(fetchHomeVideos(auth.token));
    }
  }

  return <VideoList data={videos} hasMore={hasMore} loadMore={onLoadMore}/>
}

const isPropsEqual = (prevProps, nextProps) => {
  if (prevProps.videos.length !== nextProps.videos.length) {
    return false;
  }

  if (prevProps.hasMore !== nextProps.hasMore) {
    return false;
  }

  return true;
}

const MemoizedHomeVideos = React.memo(HomeVideos, isPropsEqual);

const mapStateToProps = state => {
  const { auth, accounts, videos, home } = state;
  const { ids, hasMore, isLoading } = home;
  const items = ids.map(id => ({
    ...videos[id],
    account: accounts[videos[id].account]
  }));

  return { auth, videos: items, hasMore, isLoading  }
}

export default connect(mapStateToProps)(MemoizedHomeVideos);
