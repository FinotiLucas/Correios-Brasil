import fetch from 'node-fetch';
import http from 'http';
import https from 'https';

interface RequestOptions {
  method: 'GET' | 'POST';
  mode?: string;
  headers: any;
  timeout?: number | 0;
  agent?: http.Agent | https.Agent;
}

function request(url: string, options: RequestOptions): Promise<any> {
  return fetch(url, options)
    .then(async (res: any) => {
      options.agent = await getAgent(url);
      options.timeout = 0;
      if (!res.ok) throw new Error(res.statusText);
      if (res.headers.get('content-type') !== 'application/json; charset=utf-8')
        return res.arrayBuffer();
      else return res.json();
    })
    .catch((err: any) => new Error(`${url} gerou um erro ${err}`));
}

function getAgent(url: string): http.Agent | https.Agent {
  /**
   * Função responsável por configurar o Agent da requisição de acordo com o 
   * protocol
   */
  const _parsedURL = new URL(url);

  const httpAgent = new http.Agent({
    keepAlive: true,
  });
  
  const httpsAgent = new https.Agent({
    keepAlive: true,
  });

  if (_parsedURL.protocol == 'http:') {
    return httpAgent;
  } else {
    return httpsAgent;
  }
}
export { request };
