import { CepResponse } from '../interfaces';
/**
 * @param {string} cep
 */
declare function consultarCep(cep: string): Promise<void | CepResponse>;
export default consultarCep;
