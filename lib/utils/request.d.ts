import http from 'http';
import https from 'https';

interface RequestOptions {
  method: 'GET' | 'POST';
  mode?: string;
  headers: any;
  timeout?: number | 0;
  agent?: http.Agent | https.Agent;
}

declare function request(url: string, options: RequestOptions): Promise<any>;
export { request };
