import { BASE_URL } from './config';
import axios from 'axios';

const upload = {
  upload(file, token, cancelToken = null, progress = null) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const res = await axios.get(`${BASE_URL}/upload`, {
            headers: {
              'Content-Type' : 'application/json',
              'Authorization' : `Bearer ${token}`
            },
            cancelToken
          });
          const url = res.data.data.url;
          const form = new FormData();
          form.append('file', file, file.name);
          const res2 = await axios.post(url, form, {
            onUploadProgress: progress,
            cancelToken
          });
          resolve(res2);
        } catch(err) {
          reject(err);
        }
      })();
    }); 
  },

  uploadUrl(urlToFile, token, cancelToken = null) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const res = await axios.get(`${BASE_URL}/upload`, {
            headers: {
              'Content-Type' : 'application/json',
              'Authorization' : `Bearer ${token}`
            },
            cancelToken
          });
          const url = res.data.data.url;
          const res2 = await axios.post(url, { file: urlToFile }, { cancelToken });
          resolve(res2);
        } catch(err) {
          reject(err);
        }
      })();
    }); 
  }
}

export default upload;