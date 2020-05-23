import { Cep } from '../Interfaces';
/**
 *
 * @param {string} cep
 */
declare function consultarCep(cep: string): Promise<void | Cep>;
export default consultarCep;
