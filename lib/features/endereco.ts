/**
 * Funções responsáveis por operações de endereço
 */
import { request } from '../utils/request';
import URL from '../utils/URL';
import { EnderecoResponse } from '../interfaces';

function consultarEndereco(uf: string, cidade: string, logradouro: string): Promise<void | EnderecoResponse> {
  /**
   * @param {string} uf
   * @param {string} cidade
   * @param {string} logradoudo
   * Função responsável por consultar as informações do endereço informado com
   * base no serviço VIACEP do IBGE
   */

  return new Promise((resolve, reject) => {
    if (cidade.length < 3) {
      reject(Error('Cidade precisa ter no mínimo 3 caracteres'));
    }
    if (logradouro.length < 3) {
      reject(Error('Logradouro precisa ter no mínimo 3 caracteres'));
    }
    request(`${URL.BASECEP}/${uf}/${cidade}/${logradouro}/json`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    }).then(body => {
      if (body.erro) reject(Error(`Requisição inválida`));
      return resolve(body);
    })
  });
}

export default consultarEndereco;
