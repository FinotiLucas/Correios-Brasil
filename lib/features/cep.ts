/**
 * Funções responsáveis por operações de cep
 */
import { sanitization } from '../utils/validation';
import { request } from '../utils/request';
import URL from '../utils/URL';
import { CepResponse } from '../interfaces';

function consultarCep(cep: string): Promise<CepResponse> {
  /**
   * @param {string} cep
   * Função responsável por consultar as informações do CEP informado com
   * base no serviço VIACEP do IBGE
   */

  return new Promise((resolve, reject) =>
    request(`${URL.BASECEP}/${sanitization(cep)}/json`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response: any) => {

        if (response.data.erro === true) {
          throw new Error("Cep não encontrado!")
        }
        
        return resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      }),
  );
}

export default consultarCep;
