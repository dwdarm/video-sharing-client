const defaultIds = {
  ids: [],
  page: 1,
  hasMore: true,
  isLoading: false
}

function transfromVideoArrayToObject(data) {
  return data.reduce((result, item) => {
    result[item.id] = {
      ...item,
      account: item.account.id,
      comments: {
        ids: [],
        page: 1,
        hasMore: true,
        isLoading: false
      }
    }
    return result;
  }, {});
}

function addVideoArray(state, videos) {
  return {
    ...state,
    ...transfromVideoArrayToObject(videos)
  }
}

function updateVideoItem(state, id, data) {
  const video = state[id];
  return {
    ...state,
    [id]: {
      ...video,
      ...data
    }
  }
}

function updateCommentVideoItem(state, id, data) {
  const video = state[id];
  const newComments = {
    ...video.comments,
    ...data
  }

  return updateVideoItem(state, id, { comments: newComments });
}

function addCommentArraytoVideoItem(state, id, comments) {
  const video = state[id];
  const { ids, page } = video.comments;
  const newComments = {
    ids: ids.concat(comments.map(item => item.id)),
    hasMore: comments.length > 0 ? true : false,
    page: page + 1,
    isLoading: false
  }

  return updateVideoItem(state, id, { comments: newComments });
}

function addCommentItemtoVideoItem(state, id, comment) {
  const video = state[id];
  const newComments = {
    ...video.comments,
    ids: Array.prototype.concat(comment.id, video.comments.ids)
  }

  return updateVideoItem(state, id, { comments: newComments });
}

function deleteCommentItem(state, id, commentId) {
  const video = state[id];
  const { ids } = video.comments;
  const newComments = {
    ...video.comments,
    ids: ids.filter(item => item != commentId)
  }

  return updateVideoItem(state, id, { comments: newComments });
}

export function videos(state = {
  isUploading: false,
  isLoading: false,
  error: null
}, action) {
  switch(action.type) {

    case 'ADD_VIDEO_ARRAY':
      return addVideoArray(state, action.videos);

    case 'ADD_ACCOUNT_VIDEOS_ARRAY':
      return addVideoArray(state, action.videos);

    case 'ADD_ACCOUNT_LIKES_ARRAY':
      return addVideoArray(state, action.videos);

    case 'ADD_COMMENT_ARRAY':
      return addCommentArraytoVideoItem(state, action.id, action.comments);

    case 'ADD_COMMENT_ITEM':
      return addCommentItemtoVideoItem(state, action.id, action.comment);

    case 'DELETE_COMMENT':
      return deleteCommentItem(state, action.id, action.commentId);

    case 'REQUEST_COMMENT':
      return updateCommentVideoItem(state, action.id, { isLoading: true });

    case 'LIKE_VIDEO':
      return updateVideoItem(state, action.id, {
        likesTotal: state[action.id].likesTotal + 1,
        isLiked: true
      });

    case 'UNLIKE_VIDEO':
      return updateVideoItem(state, action.id, {
        likesTotal: state[action.id].likesTotal - 1,
        isLiked: false
      });

    case 'START_REQUEST_VIDEO':
      return {
        ...state,
        isLoading: true
      }

    case 'FINISH_REQUEST_VIDEO':
      return {
        ...state,
        isLoading: false
      }

    case 'START_UPLOAD_VIDEO':
      return {
        ...state,
        isUploading: true,
        isLoading: true
      }

    case 'FINISH_UPLOAD_VIDEO':
      return {
        ...state,
        isUploading: false,
        isLoading: false
      }

    case 'SET_ERROR_VIDEO':
      return {
        ...state,
        error: action.error
      }

    case 'CLEAR_ERROR_VIDEO':
      return {
        ...state,
        error: null
      }

    case 'CLEAR':
    case 'CLEAR_VIDEO':
      return {
        isUploading: false,
        isLoading: false,
        error: null
       };

    default:
      return state;
  }
}

export function home(state = defaultIds, action) {
  switch(action.type) {
    case 'ADD_HOME_ARRAY':
      return {
        ids: state.ids.concat(action.videos.map(item => item.id.toString())),
        hasMore: action.videos.length > 0 ? true : false,
        page: state.page + 1,
        isLoading: false
      }
    case 'REQUEST_HOME':
      return {
        ...state,
        isLoading: true
      }
    case 'CLEAR':
    case 'CLEAR_HOME':
      return defaultIds;
    default:
      return state;
  }
}
