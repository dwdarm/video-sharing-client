import buildUrl from 'build-url';
import { BASE_URL } from './config';

const video = {

  get(params) {
    return fetch(buildUrl(`${BASE_URL}/videos`, {
      queryParams: params
    }));
  },

  getOne(id, token = null) {
    return fetch(`${BASE_URL}/videos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    });
  },

  post(params, token) {
    return fetch(`${BASE_URL}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify(params)
    })
  },

  update(id, params, token) {
    return fetch(`${BASE_URL}/videos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify(params)
    })
  },

  delete(id, token) {
    return fetch(`${BASE_URL}/videos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
  },

  like(id, token) {
    return fetch(`${BASE_URL}/videos/${id}/like`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
  },

  unlike(id, token) {
    return fetch(`${BASE_URL}/videos/${id}/like`, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
  }

}

export default video;