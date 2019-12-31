import accountApi from '../../common/api/account';

export const login = (username, password) => {
  return dispatch => {
    dispatch({type:'REQUEST_AUTH'});
    accountApi
      .login({username, password})
      .then(res => dispatch({type:'AUTHENTICATE',token:res.data.data.accessToken}))
      .catch(err => {
        if (err.response) {
          dispatch({type:'AUTHENTICATE_ERROR', error:err.response.data.data.message});
        }
      });
  }
}

export const register = (username, email, password) => {
  return dispatch => {
    dispatch({type:'REQUEST_AUTH'});
    accountApi
      .register({username, email, password})
      .then(res => {
        accountApi
          .login({username, password})
          .then(res => dispatch({type:'AUTHENTICATE',token:res.data.data.accessToken}))
          .catch(err => {
            if (err.response) {
              dispatch({type:'AUTHENTICATE_ERROR', error:err.response.data.data.message});
            }
          });
      })
      .catch(err => {
        if (err.response) {
          dispatch({type:'AUTHENTICATE_ERROR', error:err.response.data.data.message});
        }
      });
  }
}
