import http from 'http';
import https from 'https';
import axios from 'axios';

interface RequestOptions {
  method: 'GET' | 'POST';
  mode?: string;
  data?: any;
  headers: any;
  timeout?: number | 0;
  agent?: http.Agent | https.Agent;
  responseType?: any;
}

async function request(url: string, options: RequestOptions) {
  return new Promise((resolve, reject) => {
    axios({ ...options, url: url })
      .then(response => {
        return resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export { request };
