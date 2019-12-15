const VIDEO_SET_VIDEO = 'VIDEO_SET_VIDEO';
const VIDEO_CLEAR = 'VIDEO_CLEAR';
const VIDEO_APPEND_COMMENTS = 'VIDEO_APPEND_COMMENTS';
const VIDEO_CLEAR_COMMENTS = 'VIDEO_CLEAR_COMMENTS';
const CLEAR = 'CLEAR';

const defaultState = {
  video: null,
  comments: {
    items: [],
    hasMore: true,
    page: 1
  }
}

const video = {

  reducer(state = defaultState, action) {
    switch(action.type) {
      case VIDEO_SET_VIDEO:
        return Object.assign({}, state, { video: action.video });
      case VIDEO_APPEND_COMMENTS:
        return Object.assign({}, state, { 
          comments: {
            items: state.comments.items.concat(action.comments),
            hasMore: (action.comments.lenght > 0) ? true : false,
            page: state.comments.page + 1
          }
        });
      case VIDEO_CLEAR_COMMENTS:
        return Object.assign({}, state, { comments: defaultState.comments })
      case VIDEO_CLEAR:
      case CLEAR:
        return defaultState;
      default:
        return state;
    }
  },

  actions: {
    setVideo(video) {
      return {
        type: VIDEO_SET_VIDEO,
        video: video
      }
    },
    appendComments(comments) {
      return {
        type: VIDEO_APPEND_COMMENTS,
        comments: comments
      }
    },
    clearComments() {
      return {
        type: VIDEO_CLEAR_COMMENTS
      }
    },
    clear() {
      return {
        type: VIDEO_CLEAR
      }
    }
  }

}

export default video;
