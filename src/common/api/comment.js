import buildUrl from 'build-url';
import { BASE_URL } from './config';

const comment = {

  get(params) {
    return fetch(buildUrl(`${BASE_URL}/comments`, {
      queryParams: params
    }));
  },

  post(id, params, token) {
    return fetch(`${BASE_URL}/videos/${id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify(params)
    })
  },

  delete(id, token) {
    return fetch(`${BASE_URL}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
  }

}

export default comment;