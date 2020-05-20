import consultarCep from './lib/correio-features/cep'
import calcularPrecoPrazo from './lib/correio-features/precos'
import rastrearEncomendas from './lib/correio-features/rastreio'

consultarCep('30380531').then(res => console.log(res)).catch(err => console.error(err, 'asd'))

const object = {
  sCepOrigem:  "81200100",
  sCepDestino:  "21770200",
  nVlPeso:  "1",
  nCdFormato:  "1",
  nVlComprimento:  "20",
  nVlAltura:  "20",
  nVlLargura:  "20",
  nCdServico:  "04014",
  nVlDiametro:  "0",
}

calcularPrecoPrazo(object).then(res => console.info(res))

rastrearEncomendas('PW639018542BR').then(res => console.log(res))