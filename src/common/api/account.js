import buildUrl from 'build-url';
import { BASE_URL } from './config';

const account = {

  getOne(id, token = null) {
    return fetch(`${BASE_URL}/accounts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    });
  },

  getSubscriptions(id, token) {
    return fetch(`${BASE_URL}/accounts/${id}/subscriptions`, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    });
  },

  getLikes(id, token, params) {
    return fetch( buildUrl(`${BASE_URL}/accounts/${id}/likes`, {
      queryParams: params
    }), {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    });
  },

  update(id, token, params) {
    return fetch(`${BASE_URL}/accounts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify(params)
    })
  },

  subscribe(id, token) {
    return fetch(`${BASE_URL}/accounts/${id}/subscribe`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
  },

  unsubscribe(id, token) {
    return fetch(`${BASE_URL}/accounts/${id}/subscribe`, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
  },

  login(params) {
    return fetch(`${BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(params)
    });
  },

  register(params) {
    return fetch(`${BASE_URL}/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(params)
    });
  },

  me(token) {
    return fetch(`${BASE_URL}/accounts/me`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    });
  }

}

export default account;