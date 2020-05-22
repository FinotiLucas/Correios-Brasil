export interface Cep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: string;
  gia: string;
}

export interface PrecoPrazoRequest {
  sCepOrigem: string;
  sCepDestino: string;
  nVlPeso: string;
  nCdFormato: string;
  nVlComprimento: string;
  nVlAltura: string;
  nVlLargura: string;
  nCdServico: string;
  nVlDiametro: string;
}

export interface PrecoPrazoResponse {
  Codigo: string;
  Valor: string;
  PrazoEntrega: string;
  ValorSemAdicionais: string;
  ValorMaoPropria: string;
  ValorAvisoRecebimento: string;
  ValorDeclarado: string;
  EntregaDomiciliar: string;
  EntregaSabado: string;
  obsFim: string;
  Erro: string;
  MsgErro: string;
}

export interface RastreioEvent {
  status: string;
  data: string;
  origem?: string;
  destino?: string;
  local?: string;
}

export interface RastreioResponse {
  events: Array<RastreioEvent>;
}