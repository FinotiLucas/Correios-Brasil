import { RastreioResponse } from '../Interfaces';
/**
 *
 * @param {string} code
 */
declare function rastrearEncomendas(code: string): Promise<void | RastreioResponse>;
export default rastrearEncomendas;
