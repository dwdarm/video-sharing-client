import axios from 'axios';
import { BASE_URL } from './config';

const account = {

  getOne(id, token = null, cancelToken = null) {
    return axios.get(`${BASE_URL}/accounts/${id}`, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      cancelToken
    });
  },

  getSubscriptions(id, token, cancelToken = null) {
    return axios.get(`${BASE_URL}/accounts/${id}/subscriptions`, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      cancelToken
    });
  },

  getLikes(id, token, params, cancelToken = null) {
    return axios.get(`${BASE_URL}/accounts/${id}/likes`, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      params,
      cancelToken
    });
  },

  update(id, token, params, cancelToken = null) {
    return axios.put(`${BASE_URL}/accounts/${id}`, params, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      cancelToken
    })
  },

  subscribe(id, token, cancelToken = null) {
    return axios.put(`${BASE_URL}/accounts/${id}/subscribe`, null, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      cancelToken
    })
  },

  unsubscribe(id, token, cancelToken = null) {
    return axios.delete(`${BASE_URL}/accounts/${id}/subscribe`, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      cancelToken
    })
  },

  login(params, cancelToken = null) {
    return axios.post(`${BASE_URL}/auth`, params, {
      headers: {
        'Content-Type' : 'application/json'
      },
      cancelToken
    });
  },

  register(params, cancelToken = null) {
    return axios.post(`${BASE_URL}/accounts`, params, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      cancelToken
    });
  },

  me(token, cancelToken = null) {
    return axios.get(`${BASE_URL}/accounts/me`, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      cancelToken
    });
  }

}

export default account;