import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import videoApi from './common/api/video';
import homeStore from './store/home.store';
import VideoList from './components/VideoList';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.onLoadMore = this.onLoadMore.bind(this);
  }

  async onLoadMore() {
    try {
      const res = await videoApi.get({page: this.props.page});
      const json = await res.json();
      this.props.dispatch(homeStore.actions.appendVideos(json.data));
    } catch(err) {
      
    }
  }

  render() {
    return (
      <div className="section">
        <div className="container"> 
          <VideoList 
            data={this.props.videos} 
            hasMore={this.props.hasMore}
            loadMore={this.onLoadMore}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    videos: state.home.videos,
    hasMore: state.home.hasMore,
    page: state.home.page
  }
}

export default withRouter(connect(mapStateToProps)(HomePage));