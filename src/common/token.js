const auth = {

  saveAccessToken(access_token) {
    window.localStorage.setItem('access_token', access_token);
  },

  getAccessToken() {
    return window.localStorage.getItem('access_token');
  },

  deleteAccessToken() {
    window.localStorage.removeItem('access_token');
  }

}

export default auth;