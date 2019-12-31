import axios from 'axios';
import { BASE_URL } from './config';

const comment = {

  get(params, token, cancelToken = null) {
    return axios.get(`${BASE_URL}/comments`, { 
      params, 
      cancelToken,
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    });
  },

  post(id, params, token, cancelToken = null) {
    return axios.post(`${BASE_URL}/videos/${id}/comment`, params, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      cancelToken
    })
  },

  delete(id, token, cancelToken = null) {
    return axios.delete(`${BASE_URL}/comments/${id}`, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      cancelToken
    })
  }

}

export default comment;