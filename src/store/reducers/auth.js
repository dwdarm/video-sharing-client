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
      username: decoded.username,
      error: null,
      isLoading: false
    }
  } catch(err) {
    return {
      token: null,
      isAuthenticated: false,
      accountId: null,
      username: null,
      error: null,
      isLoading: false
    }
  }
}

function auth(state = defaultState(), action) {
  switch(action.type) {
    case 'AUTHENTICATE':
      token.saveAccessToken(action.token);
      return defaultState();
    case 'UNAUTHENTICATE':
      token.deleteAccessToken();
      return defaultState()
    case 'REQUEST_AUTH':
      return {
        ...state,
        error: null,
        isLoading: true
      }
    case 'AUTHENTICATE_ERROR':
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state;
  }
}

export default auth;