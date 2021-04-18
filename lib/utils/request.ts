import fetch from 'node-fetch';
import http from 'http';
import https from 'https';

interface RequestOptions {
  method: 'GET' | 'POST';
  mode?: string;
  headers: any;
  timeout?: number | 0;
  agent?: http.Agent;
}

function request(url: string, options: RequestOptions): Promise<any> {
  return fetch(url, options)
    .then(res => {
      options.agent = getAgent(url);
      options.timeout = 0;
      if (!res.ok) throw new Error(res.statusText);
      if (res.headers.get('content-type') !== 'application/json; charset=utf-8')
        return res.arrayBuffer();
      else return res.json();
    })
    .catch(err => new Error(`${url} gerou um erro ${err}`));
}

function getAgent(_parsedURL: string): any {
  const httpAgent = new http.Agent({
    keepAlive: true,
  });
  const httpsAgent = new https.Agent({
    keepAlive: true,
  });

  const options = {
    agent: function (_parsedURL) {
      if (_parsedURL.protocol == 'http:') {
        return httpAgent;
      } else {
        return httpsAgent;
      }
    },
  };
  return options.agent;
}

export { request };
