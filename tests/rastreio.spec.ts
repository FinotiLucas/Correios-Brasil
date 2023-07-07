import rastrearEncomendas, { gerarTokenApp, fetchTrackingService } from './rastrearEncomendas';
import { request } from '../utils/request';
import URL from '../utils/URL';

jest.mock('../utils/request');

describe('rastrearEncomendas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar os resultados da consulta corretamente', async () => {
    const mockToken = 'mockToken';
    const mockRequestResponse = {
      data: {
        objetos: [
          { /* objeto 1 */ },
          { /* objeto 2 */ },
        ],
      },
    };

    (gerarTokenApp as jest.Mock).mockResolvedValue(mockToken);
    (request as jest.Mock).mockResolvedValue(mockRequestResponse);

    const codes = ['OU341933668BR', 'LB290784401HK'];
    const response = await rastrearEncomendas(codes);

    expect(gerarTokenApp).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledTimes(2);
    expect(request).toHaveBeenCalledWith(`${URL.PROXYAPP_RASTREAR}/OU341933668BR`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'Dart/2.18 (dart:io)',
        'app-check-token': mockToken,
      },
    });
    expect(request).toHaveBeenCalledWith(`${URL.PROXYAPP_RASTREAR}/LB290784401HK`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'Dart/2.18 (dart:io)',
        'app-check-token': mockToken,
      },
    });
    expect(response).toEqual([
      { /* objeto 1 */ },
      { /* objeto 2 */ },
    ]);
  });

  it('deve rejeitar a promessa em caso de erro na requisição', async () => {
    const mockError = new Error('Erro na requisição');

    (gerarTokenApp as jest.Mock).mockRejectedValue(mockError);

    const codes = ['OU341933668BR', 'LB290784401HK'];

    await expect(rastrearEncomendas(codes)).rejects.toThrowError(mockError);
    expect(gerarTokenApp).toHaveBeenCalledTimes(1);
  });
});

describe('gerarTokenApp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar o token corretamente', async () => {
    const mockRequestResponse = {
      data: {
        token: 'mockToken',
      },
    };

    (request as jest.Mock).mockResolvedValue(mockRequestResponse);

    const response = await gerarTokenApp();

    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(URL.PROXYAPP_TOKEN, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'Dart/2.18 (dart:io)',
      },
      data: {
        requestToken: 'YW5kcm9pZDtici5jb20uY29ycmVpb3MucHJlYXRlbmRpbWVudG87RjMyRTI5OTc2NzA5MzU5ODU5RTBCOTdGNkY4QTQ4M0I5Qjk1MzU3ODs1LjEuMTQ=',
        data: '23/06/2023 12:42:58',
        sign: 'a5e2f3a83571c88c40a31c68876f261f',
      },
    });
    expect(response).toEqual('mockToken');
  });

  it('deve rejeitar a promessa em caso de erro na requisição', async () => {
    const mockError = new Error('Erro na requisição');

    (request as jest.Mock).mockRejectedValue(mockError);

    await expect(gerarTokenApp()).rejects.toThrowError(mockError);
    expect(request).toHaveBeenCalledTimes(1);
  });
});

describe('fetchTrackingService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar o resultado da consulta corretamente', async () => {
    const mockToken = 'mockToken';
    const mockRequestResponse = {
      data: {
        objetos: [
          { /* objeto 1 */ },
        ],
      },
    };

    (gerarTokenApp as jest.Mock).mockResolvedValue(mockToken);
    (request as jest.Mock).mockResolvedValue(mockRequestResponse);

    const code = 'OU341933668BR';
    const response = await fetchTrackingService(code);

    expect(gerarTokenApp).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(`${URL.PROXYAPP_RASTREAR}/${code}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'Dart/2.18 (dart:io)',
        'app-check-token': mockToken,
      },
    });
    expect(response).toEqual({ /* objeto 1 */ });
  });

  it('deve rejeitar a promessaem caso de erro na requisição', async () => {
    const mockError = new Error('Erro na requisição');

    (gerarTokenApp as jest.Mock).mockRejectedValue(mockError);

    const code = 'OU341933668BR';

    await expect(fetchTrackingService(code)).rejects.toThrowError(mockError);
    expect(gerarTokenApp).toHaveBeenCalledTimes(1);
  });
});
