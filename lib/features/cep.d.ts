import { CepResponse } from '../Interfaces';
/**
 * @param {string} cep
 */
declare function consultarCep(cep: string): Promise<void | CepResponse>;
export default consultarCep;
