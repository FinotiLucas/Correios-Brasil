import http from 'http';
import https from 'https';
import axios from 'axios';

interface RequestOptions {
  method: 'GET' | 'POST';
  mode?: string;
  headers: any;
  timeout?: number | 0;
  agent?: http.Agent | https.Agent;
  responseType?: any;
}

async function request(url: string, options: RequestOptions) {
  try {
    let res = await axios({ ...options, url: url });
    let data = res.data;
    return data;
  } catch (error) {
    return new Error(error.response);
  }
}
export { request };
