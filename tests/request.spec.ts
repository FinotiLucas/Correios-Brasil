import { expect } from 'chai'

import { request } from '../lib/utils/request'

describe('Testes no request', () => {
  it('Deve retornar uma promise', () => {
    const req = request('api/test.json', {
      method: 'GET',
      headers: {}
    })
    expect(req).to.be.an('Promise')
  })

  it('Deve retornar uma um erro', (done) => {
    request('https://viacep.com.br/ws/30380531/json', {
      method: 'GET',
      headers: {}
    }).then(res => {
      expect(res.erro).to.be.equals(true)
      done()
    })
  }).timeout(5000)

  it('Deve retornar uma um cep com sucesso', (done) => {
    request('https://viacep.com.br/ws/21770200/json', {
      method: 'GET',
      headers: {}
    }).then(res => {
      expect(res.bairro).to.be.equals('Realengo')
      done()
    })
  }).timeout(5000)

})
