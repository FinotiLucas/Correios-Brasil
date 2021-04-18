interface RequestOptions {
  method: 'GET' | 'POST';
  mode?: string;
  headers: any;
}
declare function request(url: string, options: RequestOptions): Promise<any>;
export { request };
