const PROFILE_SET_ACCOUNT = 'PROFILE_SET_ACCOUNT';
const PROFILE_APPEND_VIDEOS = 'PROFILE_APPEND_VIDEOS';
const PROFILE_APPEND_LIKES = 'PROFILE_APPEND_LIKES';
const PROFILE_CLEAR = 'PROFILE_CLEAR';
const CLEAR = 'CLEAR';

const defaultState = {
  account: null,
  videos: {
    items: [],
    hasMore: true,
    page: 1
  },
  likes: {
    items: [],
    hasMore: true,
    page: 1
  }
}

const profile = {

  reducer(state = defaultState, action) {
    switch(action.type) {
      case PROFILE_SET_ACCOUNT:
        return Object.assign({}, state, { account: action.account });
      case PROFILE_APPEND_VIDEOS:
        return Object.assign({}, state, {
          videos: {
            items: state.videos.items.concat(action.videos),
            hasMore: (action.videos.length > 0) ? true : false,
            page: state.videos.page + 1
          }
        });
      case PROFILE_APPEND_LIKES:
        return Object.assign({}, state, {
          likes: {
            items: state.likes.items.concat(action.videos),
            hasMore: (action.videos.length > 0) ? true : false,
            page: state.likes.page + 1
          }
        });
      case PROFILE_CLEAR:
      case CLEAR:
        return defaultState;
      default:
        return state;
    }
  },

  actions: {
    setAccount(account) {
      return {
        type: PROFILE_SET_ACCOUNT,
        account: account
      }
    },
    appendVideos(videos) {
      return {
        type: PROFILE_APPEND_VIDEOS,
        videos: videos
      }
    },
    appendLikes(videos) {
      return {
        type: PROFILE_APPEND_LIKES,
        videos: videos
      }
    },
    clear() {
      return {
        type: PROFILE_CLEAR
      }
    }
  }

}

export default profile;