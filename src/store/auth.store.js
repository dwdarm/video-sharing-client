const AUTHENTICATE = 'AUTHENTICATE';
const UNAUTHENTICATE = 'UNAUTHENTICATE'; 

import jwtDecode from 'jwt-decode';
import token from 'base/common/token';

function defaultState() {
  try {
    const tkn = token.getAccessToken();
    if (!tkn) { throw new Error(); }
    const decoded = jwtDecode(tkn);
    return {
      token: tkn,
      isAuthenticated: true,
      accountId: decoded.id,
      username: decoded.username
    }
  } catch(err) {
    return {
      token: null,
      isAuthenticated: false,
      accountId: null,
      username: null
    }
  }
}

const auth = {

  reducer(state = defaultState(), action) {
    switch(action.type) {
      case AUTHENTICATE:
        token.saveAccessToken(action.token);
        return defaultState();
      case UNAUTHENTICATE:
        token.deleteAccessToken();
        return defaultState()
      default:
        return state;
    }
  },

  actions: {
    authenticate(token) {
      return {
        type: AUTHENTICATE,
        token: token
      }
    },
    unauthenticate() {
      return {
        type: UNAUTHENTICATE
      }
    },
  }

}

export default auth;