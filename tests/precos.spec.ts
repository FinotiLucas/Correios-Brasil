import calcularPrecoPrazo, { fetchPrecoPrazo, convertJsonToPrazoPrecoResponse } from './calcularPrecoPrazo';
import { request } from '../utils/request';
import URL from '../utils/URL';

jest.mock('../utils/request');

describe('calcularPrecoPrazo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar os valores de entrega corretamente', async () => {
    const mockRequestResponse = {
      data: '<xml>...</xml>',
    };

    const mockConvertedResponse = {
      Codigo: '04014',
      Valor: '53,10',
      PrazoEntrega: '8',
      ValorSemAdicionais: '53,10',
      ValorMaoPropria: '0,00',
      ValorAvisoRecebimento: '0,00',
      ValorDeclarado: '0,00',
      EntregaDomiciliar: 'S',
      EntregaSabado: 'S',
      obsFim: 'O CEP de destino está sujeito a condições especiais...',
      Erro: '011',
      MsgErro: 'O CEP de destino está sujeito a condições especiais...',
    };

    (request as jest.Mock).mockResolvedValue(mockRequestResponse);
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
    }));

    const precoPrazo = {
      sCepOrigem: '81200100',
      sCepDestino: '21770200',
      nVlPeso: '1',
      nCdFormato: '1',
      nVlComprimento: '20',
      nVlAltura: '20',
      nVlLargura: '20',
      nCdServico: ['04014', '04510'],
      nVlDiametro: '0',
    };
    const response = await calcularPrecoPrazo(precoPrazo);

    expect(request).toHaveBeenCalledTimes(2);
    expect(request).toHaveBeenCalledWith(`${URL.BASECORREIOS}?sCepOrigem=81200100&sCepDestino=21770200&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&nCdServico=04014&nCdEmpresa=&sDsSenha=&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nIndicaCalculo=3`, {
      method: 'GET',
      headers: {
        'content-type': 'text/xml',
      },
      responseType: 'arraybuffer',
    });
    expect(response).toEqual([mockConvertedResponse, mockConvertedResponse]);
  });

  it('deve rejeitar a promessa em caso de erro na requisição', async () => {
    const mockError = new Error('Erro na requisição');

    (request as jest.Mock).mockRejectedValue(mockError);

    const precoPrazo = {
      sCepOrigem: '81200100',
      sCepDestino: '21770200',
      nVlPeso: '1',
      nCdFormato: '1',
      nVlComprimento: '20',
      nVlAltura: '20',
      nVlLargura: '20',
      nCdServico: ['04014', '04510'],
      nVlDiametro: '0',
    };

    await expect(calcularPrecoPrazo(precoPrazo)).rejects.toThrowError(mockError);
    expect(request).toHaveBeenCalledTimes(2);
  });
});

describe('convertJsonToPrazoPrecoResponse', () => {
  it('deve converter o objeto JSON para a interface PrecoPrazoResponse', () => {
    const mockJson = {
      Codigo: { _text: '04014' },
      Valor: { _text: '53,10' },
      PrazoEntrega: { _text: '8' },
      ValorSemAdicionais: { _text: '53,10' },
      ValorMaoPropria: { _text: '0,00' },
      ValorAvisoRecebimento: { _text: '0,00' },
      ValorDeclarado: { _text: '0,00' },
      EntregaDomiciliar: { _text: 'S' },
      EntregaSabado: { _text: 'S' },
      obsFim: { _text: 'O CEP de destino está sujeito a condições especiais...' },
      Erro: { _text: '011' },
      MsgErro: { _text: 'O CEP de destino está sujeito a condições especiais...' },
    };

    const expectedResponse = {
      Codigo: '04014',
      Valor: '53,10',
      PrazoEntrega: '8',
      ValorSemAdicionais: '53,10',
      ValorMaoPropria: '0,00',
      ValorAvisoRecebimento: '0,00',
      ValorDeclarado: '0,00',
      EntregaDomiciliar: 'S',
      EntregaSabado: 'S',
      obsFim: 'O CEP de destino está sujeito a condições especiais...',
      Erro: '011',
      MsgErro: 'O CEP de destino está sujeito a condições especiais...',
    };

    expect(convertJsonToPrazoPrecoResponse(mockJson)).toEqual(expectedResponse);
  });
});
