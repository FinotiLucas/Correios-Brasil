import consultarCep from './features/cep';
import calcularPrazo from './features/precos';
import rastrearEncomendas from './features/rastreio';
declare const Correios: {
  consultarCep: typeof consultarCep;
  calcularPrazo: typeof calcularPrazo;
  rastrearEncomendas: typeof rastrearEncomendas;
};
export default Correios;
