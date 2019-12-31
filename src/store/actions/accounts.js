import accountApi from '../../common/api/account';
import uploadApi from '../../common/api/upload';
import videoApi from '../../common/api/video';

const handleError = (err, dispatch) => {
  if (err.response) {
    if (err.response.status === 401) {
      dispatch({type:'UNAUTHENTICATE'});
    } else {
      const error = err.response.data.data.message
      dispatch({type:'SET_ERROR_ACCOUNT',error});
    }
  }
}

export const fetchAccount = (id, token) => {
  return dispatch => {
    dispatch({type:'START_REQUEST_ACCOUNT'});
    accountApi.getOne(id,token)
      .then(res => dispatch({type:'ADD_ACCOUNT_ITEM',account:res.data.data}))
      .catch(err => handleError(err, dispatch))
      .finally(() => dispatch({type:'FINISH_REQUEST_ACCOUNT'}));
  }
}

export const updateAccount = (id, token, params) => {
  return async dispatch => {
    dispatch({type:'START_REQUEST_ACCOUNT'});
    const { avatar, about } = params;
    const update = {}
    try {
      if (avatar) {
        let res = await uploadApi.upload(avatar, token);
        update.urlToAvatar = res.data.secure_url;
      }
      update.about = about;
      let res = await accountApi.update(id, token, update);
      dispatch({type:'ADD_ACCOUNT_ITEM',account:res.data.data});
      return Promise.resolve();
    } catch(err) {
      handleError(err, dispatch);
    } finally {
      dispatch({type:'FINISH_REQUEST_ACCOUNT'});
    }
  }
}

export const fetchAccountLikes = (id, token) => {
  return (dispatch, getState) => {
    const { accounts } = getState();
    dispatch({type:'REQUEST_ACCOUNT_LIKES'});
    accountApi.getLikes(id, token, { page: accounts[id].likes.page })
      .then(res => {
        dispatch({type:'ADD_ACCOUNT_LIKES_ARRAY',id:id,videos:res.data.data})
      })
      .catch(err => handleError(err, dispatch))
  }
}

export const fetchAccountVideos = (id, token) => {
  return (dispatch, getState) => {
    const { accounts } = getState();
    dispatch({type:'REQUEST_ACCOUNT_VIDEOS'});
    videoApi.get({
      accountid: id,
      page: accounts[id].videos.page
    }, token)
      .then(res => {
        dispatch({type:'ADD_ACCOUNT_VIDEOS_ARRAY',id:id,videos:res.data.data});
      })
      .catch(err => handleError(err, dispatch))
  }
}

export const subscribeAccount = (id, token) => {
  return dispatch => {
    dispatch({type:'START_REQUEST_ACCOUNT'});
    accountApi.subscribe(id, token)
      .then(res => dispatch({type:'SUBSCRIBE_ACCOUNT',id:id}))
      .catch(err => handleError(err, dispatch))
      .finally(() => dispatch({type:'FINISH_REQUEST_ACCOUNT'}));
  }
}

export const unsubscribeAccount = (id, token) => {
  return dispatch => {
    dispatch({type:'START_REQUEST_ACCOUNT'});
    accountApi.unsubscribe(id, token)
      .then(res => dispatch({type:'UNSUBSCRIBE_ACCOUNT',id:id}))
      .catch(err => handleError(err, dispatch))
      .finally(() => dispatch({type:'FINISH_REQUEST_ACCOUNT'}));
  }
}
