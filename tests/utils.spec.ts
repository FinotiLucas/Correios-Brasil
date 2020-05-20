import { expect } from 'chai'

import { sanitizeCep } from '../lib/utils/validation'

describe('Sanitize Cep', () => {
  it('Cep com tamanho inválido', () => {
    const invalidCepLength = '123213'
    expect(sanitizeCep(invalidCepLength)).to.throw()
  })

  it('Cep com máscara', () => {
    const maskedCep = '30140-010'
    expect(sanitizeCep(maskedCep)).to.be.equals('30140010')
  })

  it('Cep sem máscara', () => {
    const notMaskedCep = '30140010'
    expect(sanitizeCep(notMaskedCep)).to.be.equals('30140010')
  })
})

