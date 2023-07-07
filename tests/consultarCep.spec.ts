import consultarCep from './consultarCep';
import { request } from '../utils/request';
import URL from '../utils/URL';

jest.mock('../utils/request');

describe('consultarCep', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar as informações do CEP corretamente', async () => {
    const mockResponse = {
      cep: '12345-678',
      logradouro: 'Rua Exemplo',
      bairro: 'Bairro Exemplo',
      localidade: 'Cidade Exemplo',
      uf: 'UF',
      ibge: '1234567',
      gia: '',
      ddd: '11',
      siafi: '1234',
    };

    (request as jest.Mock).mockResolvedValue({ data: mockResponse });

    const cep = '12345678';
    const response = await consultarCep(cep);

    expect(request).toHaveBeenCalledWith(`${URL.BASECEP}/${cep}/json`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    expect(response).toEqual(mockResponse);
  });

  it('deve rejeitar a promessa em caso de erro na requisição', async () => {
    const mockError = new Error('Erro na requisição');

    (request as jest.Mock).mockRejectedValue(mockError);

    const cep = '12345678';

    await expect(consultarCep(cep)).rejects.toThrowError(mockError);
    expect(request).toHaveBeenCalledWith(`${URL.BASECEP}/${cep}/json`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
  });
});
