/**
 * Funções responsáveis por operações de cep
 */

 import { sanitizeCep } from '../utils/validation'
 import { request } from '../utils/request'
 import URL from '../URL'

// const consultarCep = (sanitize: Function, request: Function): Function => ( cep
// : String) : Promise => {
//   R.
// }

const consultarCep = ( cep: String) : Promise => {
  return request(`${URL.BASE}/${cep}`)
}