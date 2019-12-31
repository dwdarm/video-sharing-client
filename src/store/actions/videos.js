import videoApi from '../../common/api/video';
import uploadApi from '../../common/api/upload';
import commentApi from '../../common/api/comment';

const handleError = (err, dispatch) => {
  if (err.response) {
    if (err.response.status === 401) {
      dispatch({type:'UNAUTHENTICATE'});
    } else {
      const error = err.response.data.data.message
      dispatch({type:'SET_ERROR_VIDEO', error});
    }
  }
}

export const fetchHomeVideos = token => {
  return (dispatch, getState) => {
    const { home } = getState();
    dispatch({type:'REQUEST_HOME'});
    videoApi.get({page: home.page}, token)
      .then(res => {
        dispatch({type:'ADD_VIDEO_ARRAY',videos:res.data.data});
        dispatch({type:'ADD_HOME_ARRAY',videos:res.data.data});
        dispatch({type:'CLEAR_ERROR_VIDEO'});
      })
      .catch(err => handleError(err, dispatch));
  }
}

export const fetchVideo = (id, token) => {
  return dispatch => {
    videoApi.getOne(id, token)
      .then(res => {
        dispatch({type:'ADD_VIDEO_ARRAY',videos:[res.data.data]});
        dispatch({type:'CLEAR_ERROR_VIDEO'});
      })
      .catch(err => handleError(err, dispatch));
  }
}

export const postVideo = (token, params, options = {}) => {
  return async dispatch => {
    try {
      dispatch({type:'START_UPLOAD_VIDEO'});

      const { onUploadProgress } = options;
      const data = {}
      data.title = params.title;
      data.caption = params.caption;

      if (params.video !== null) {
        let res = await uploadApi.upload(params.video, token, null, onUploadProgress);
        data.urlToVideo = res.data.secure_url;
      }

      if (params.thumb !== null) {
        let res = await uploadApi.upload(params.video, token, null, null);
        data.urlToThumbnail = res.data.secure_url;
      } else {
        let res = await uploadApi.uploadUrl(data.urlToVideo.replace('.mp4', '.jpg'), token);
        data.urlToThumbnail = res.data.secure_url;
      }

      const res = await videoApi.post(data, token);
      dispatch({type:'ADD_VIDEO_ARRAY',videos:[res.data.data]});
      dispatch({type:'CLEAR_ERROR_VIDEO'});
      return Promise.resolve(res.data.data);
    } catch(err) {
      handleError(err, dispatch);
    } finally {
      dispatch({type:'FINISH_UPLOAD_VIDEO'});
    }
  }
}

export const updateVideo = (id, token, params, options = {}) => {
  return async dispatch => {
    try {
      dispatch({type:'START_UPLOAD_VIDEO'});

      const { onUploadProgress } = options;
      const data = {}
      data.title = params.title;
      data.caption = params.caption;

      if (params.video !== null) {
        let res = await uploadApi.upload(params.video, token, null, onUploadProgress);
        data.urlToVideo = res.data.secure_url;
      }

      if (params.thumb !== null) {
        let res = await uploadApi.upload(params.video, token, null, null);
        data.urlToThumbnail = res.data.secure_url;
      } else {
        if (data.urlToVideo) {
          let res = await uploadApi.uploadUrl(data.urlToVideo.replace('.mp4', '.jpg'), token);
          data.urlToThumbnail = res.data.secure_url;
        }
      }

      const res = await videoApi.update(id, token, data);
      dispatch({type:'ADD_VIDEO_ARRAY',videos:[res.data.data]});
      dispatch({type:'CLEAR_ERROR_VIDEO'});
      return Promise.resolve(res.data.data);
    } catch(err) {
      console.log(err);
      handleError(err, dispatch);
    } finally {
      dispatch({type:'FINISH_UPLOAD_VIDEO'});
    }
  }
}

export const deleteVideo = (id, token) => {
  return dispatch => {
    dispatch({type:'START_REQUEST_VIDEO'});
    videoApi.delete(id, token)
      .then(res => dispatch({type:'CLEAR'}))
      .catch(err => handleError(err, dispatch))
      .finally(() => dispatch({type:'FINISH_REQUEST_VIDEO'}));
  }
}

export const likeVideo = (id, token) => {
  return dispatch => {
    dispatch({type:'START_REQUEST_VIDEO'});
    videoApi.like(id, token)
      .then(res => dispatch({type:'LIKE_VIDEO',id:id}))
      .catch(err => handleError(err, dispatch))
      .finally(() => dispatch({type:'FINISH_REQUEST_VIDEO'}));
  }
}

export const unlikeVideo = (id, token) => {
  return dispatch => {
    dispatch({type:'START_REQUEST_VIDEO'});
    videoApi.unlike(id, token)
      .then(res => dispatch({type:'UNLIKE_VIDEO',id:id}))
      .catch(err => handleError(err, dispatch))
      .finally(() => dispatch({type:'FINISH_REQUEST_VIDEO'}));
  }
}

export const fetchComments = (id, token) => {
  return (dispatch, getState) => {
    const { videos } = getState();
    const comments = videos[id].comments;
    dispatch({type:'REQUEST_COMMENT',id:id});
    commentApi.get({videoid:id, page: comments.page}, token)
      .then(res => dispatch({type:'ADD_COMMENT_ARRAY',id:id,comments:res.data.data}))
      .catch(err => handleError(err, dispatch))
  }
}

export const postComment = (id, token, text) => {
  return dispatch => {
    dispatch({type:'START_REQUEST_COMMENT'});
    commentApi.post(id, { text }, token)
      .then(res => dispatch({type:'ADD_COMMENT_ITEM',id:id,comment:res.data.data}))
      .catch(err => handleError(err, dispatch))
      .finally(() => dispatch({type:'FINISH_REQUEST_COMMENT'}));
  }
}

export const deleteComment = (videoId, commentId, token) => {
  return dispatch => {
    commentApi.delete(commentId, token)
      .then(res => dispatch({type:'DELETE_COMMENT',id:videoId,commentId:commentId}))
      .finally(() => dispatch({type:'FINISH_REQUEST_COMMENT'}));
  }
}
