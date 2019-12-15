import { BASE_URL } from './config';

const upload = {
  upload(file, token, progress = null) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {

          const res = await fetch(`${BASE_URL}/upload`, {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json',
              'Authorization' : `Bearer ${token}`
            }
          });
          if (res.status >= 400) throw new Error(res.status);
          const json = await res.json();
          const url = json.data.url;

          const form = new FormData();
          form.append('file', file, file.name);

          const xhr = new XMLHttpRequest();
          xhr.open('POST', url);
          xhr.responseType = 'json';
          xhr.upload.onprogress = progress;
          xhr.onloadend = () => {
            if (res.status >= 400) throw new Error(res.status);
            resolve(xhr.response);
          }
          xhr.send(form);

        } catch(err) {
          reject(err);
        }
      })();
    }); 
    /*
    return fetch(`${BASE_URL}/upload`, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    });*/
  }
}

export default upload;