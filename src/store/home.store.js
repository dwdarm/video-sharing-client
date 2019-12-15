const HOME_APPEND_VIDEOS = 'HOME_APPEND_VIDEOS';
const HOME_CLEAR_VIDEOS = 'HOME_CLEAR_VIDEOS';
const CLEAR = 'CLEAR';

const home = {

  reducer(state = { 
    videos: [],
    page: 1,
    hasMore: true,
  }, action) {
    switch(action.type) {
      case HOME_APPEND_VIDEOS:
        return Object.assign({}, state, {
          videos: state.videos.concat(action.videos),
          hasMore: (action.videos.length > 0) ? true : false,
          page: state.page + 1
        });
      case HOME_CLEAR_VIDEOS:
      case CLEAR:
        return {
          videos: [],
          page: 1,
          hasMore: true
        };
      default:
        return state;
    }
  },

  actions: {
    appendVideos(videos) {
      return {
        type: HOME_APPEND_VIDEOS,
        videos: videos
      }
    },
    clearVideos() {
      return {
        type: HOME_CLEAR_VIDEOS
      }
    }
  }
  
}

export default home;