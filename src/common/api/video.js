import axios from 'axios';
import { BASE_URL } from './config';

const video = {

  get(params, token = null, cancelToken = null) {
    return axios.get(`${BASE_URL}/videos`, {
      params,
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      cancelToken
    });
  },

  getOne(id, token = null, cancelToken = null) {
    return axios.get(`${BASE_URL}/videos/${id}`, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      cancelToken
    });
  },

  post(params, token, cancelToken = null) {
    return axios.post(`${BASE_URL}/videos`, params, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      cancelToken
    })
  },

  update(id, token, params, cancelToken = null) {
    return axios.put(`${BASE_URL}/videos/${id}`, params, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      cancelToken
    })
  },

  delete(id, token, cancelToken = null) {
    return axios.delete(`${BASE_URL}/videos/${id}`, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      cancelToken
    })
  },

  like(id, token, cancelToken = null) {
    return axios.put(`${BASE_URL}/videos/${id}/like`, null, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      cancelToken
    })
  },

  unlike(id, token, cancelToken = null) {
    return axios.delete(`${BASE_URL}/videos/${id}/like`, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      cancelToken
    })
  }

}

export default video;
