import consultarCep from './correio-features/cep';
import calcularPrazo from './correio-features/precos';
import rastrearEncomendas from './correio-features/rastreio';
declare const Correios: {
    consultarCep: typeof consultarCep;
    calcularPrazo: typeof calcularPrazo;
    rastrearEncomendas: typeof rastrearEncomendas;
};
export default Correios;
