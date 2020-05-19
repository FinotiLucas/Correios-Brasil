const sanitizeCep = ( cep: String ) : String => {
  const regex = new RegExp(/[^0-9]|[/ /]/g, '')
  const sCep = cep.replace(regex)
  return sCep.length === 8 ? sCep : throw console.error(`Cep ${cep} é inválido`);
}

export { sanitizeCep }