import { RastreioResponse } from '../interfaces';
/**
 *
 * @param {string} code
 */
declare function rastrearEncomendas(
  code: string,
): Promise<void | RastreioResponse>;
export default rastrearEncomendas;
