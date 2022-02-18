import fetch from 'node-fetch';
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

async function request(url: string, options: RequestOptions): Promise<any> {
  return axios({ ...options, url: url })
    .then(async (res: any) => {
      if (!res.status) throw new Error(res.statusText);
      return res.data
    })
    .catch(function (error) {
      return new Error(error);
    });
}
export { request };
